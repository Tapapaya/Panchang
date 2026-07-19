import { StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/design';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

// Icon-only tab bar (reference style): thin outline icons, active = ink + dot.
function TabIcon({ name, focused }: { name: IconName; focused: boolean }) {
  return (
    <View style={styles.iconWrap}>
      <Ionicons name={name} size={23} color={focused ? Colors.ink : Colors.inkFaint} />
      <View style={[styles.indicator, { opacity: focused ? 1 : 0 }]} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 0,
          elevation: 0,
          height: 62,
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ focused }) => <TabIcon name="grid-outline" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="stotras"
        options={{
          title: 'Stotras',
          tabBarIcon: ({ focused }) => <TabIcon name="book-outline" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="vastu"
        options={{
          title: 'Vastu',
          tabBarIcon: ({ focused }) => <TabIcon name="compass-outline" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon name="person-outline" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.accent,
  },
});
