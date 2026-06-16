import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rpcUpsertUser, isSupabaseConfigured } from './supabase';

const USER_ID_KEY = 'panchang:userId';

// Configure how notifications appear when the app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function getOrCreateUserId(): Promise<string> {
  const stored = await AsyncStorage.getItem(USER_ID_KEY);
  if (stored) return stored;
  // Generate a UUID client-side using crypto.randomUUID (available in RN 0.73+)
  const id = crypto.randomUUID();
  await AsyncStorage.setItem(USER_ID_KEY, id);
  return id;
}

async function requestPushPermission(): Promise<string | null> {
  // Push notifications only work on physical devices
  if (!Device.isDevice) return null;

  // Android 13+ requires explicit permission
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('panchang', {
      name: 'Panchang Reminders',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') {
    const token = await Notifications.getExpoPushTokenAsync();
    return token.data;
  }

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return null;

  const token = await Notifications.getExpoPushTokenAsync();
  return token.data;
}

/**
 * Called on app launch (after city is set).
 * Registers the device with Supabase so the notification pipeline can reach it.
 * Silently no-ops if Supabase isn't configured or permissions are denied.
 */
export async function registerForPushNotifications(cityId: string): Promise<void> {
  if (!isSupabaseConfigured()) return;

  try {
    const [userId, pushToken] = await Promise.all([
      getOrCreateUserId(),
      requestPushPermission(),
    ]);

    await rpcUpsertUser({ p_id: userId, p_city_id: cityId, p_expo_push_token: pushToken });
  } catch (err) {
    // Non-fatal — app works without push
    if (__DEV__) console.warn('[Push] Registration failed:', err);
  }
}

/**
 * Call when the user changes their city.
 * Updates city_id (and refreshes push token) in Supabase.
 */
export async function updateUserCity(cityId: string): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    const [userId, pushToken] = await Promise.all([
      getOrCreateUserId(),
      requestPushPermission(),
    ]);
    await rpcUpsertUser({ p_id: userId, p_city_id: cityId, p_expo_push_token: pushToken });
  } catch (err) {
    if (__DEV__) console.warn('[Push] City update failed:', err);
  }
}
