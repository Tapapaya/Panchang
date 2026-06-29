import { StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Type } from '../../constants/design';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

function TabIcon({ name, color, focused }: { name: IconName; color: string; focused: boolean }) {
  return (
    <View style={focused ? styles.activeIconWrap : styles.iconWrap}>
      <Ionicons name={name} size={22} color={color} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.inkSoft,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.hairline,
          borderTopWidth: 1,
          paddingBottom: 6,
          height: 64,
        },
        tabBarLabelStyle: {
          ...Type.caption,
          marginBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="sunny-outline" color={focused ? Colors.inverseInk : color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="stotras"
        options={{
          title: 'Stotras',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="book-outline" color={focused ? Colors.inverseInk : color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="vastu"
        options={{
          title: 'Vastu',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home-outline" color={focused ? Colors.inverseInk : color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="person-outline" color={focused ? Colors.inverseInk : color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 44,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconWrap: {
    width: 44,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
    borderRadius: 16,
  },
});
