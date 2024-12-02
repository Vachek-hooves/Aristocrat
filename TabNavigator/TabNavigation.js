import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabProfileScreen,TabHobbiesScreen,TabRulesScreen,TabEventsScreen} from '../AppScreen/TabScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
       <Tab.Screen name="TabProfileScreen" component={TabProfileScreen} />
       <Tab.Screen name="TabHobbiesScreen" component={TabHobbiesScreen} />
       <Tab.Screen name="TabRulesScreen" component={TabRulesScreen} />
       <Tab.Screen name="TabEventsScreen" component={TabEventsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
