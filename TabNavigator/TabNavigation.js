import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  TabProfileScreen,
  TabHobbiesScreen,
  TabRulesScreen,
  TabEventsScreen,
} from '../AppScreen/TabScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../constants/color';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="TabProfileScreen"
        component={TabProfileScreen}
        options={{
          tabBarIcon: ({color}) => <Entypo name="user" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="TabHobbiesScreen"
        component={TabHobbiesScreen}
        options={{
          tabBarIcon: ({color}) => <MaterialIcons name="attractions" color={color} size={26} />,
        }}
      />
      {/* <Tab.Screen
        name="Add"
        component={TabNewTaskScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.addButtonContainer}>
              <Icon
                name="add"
                size={55}
                color="#FFFFFF"
                style={{
                  backgroundColor: '#FF9F0A',
                  width: 82,
                  height: 82,
                  borderRadius: 41,
                  textAlign: 'center',
                  lineHeight: 82,
                }}
              />
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="TabRulesScreen"
        component={TabRulesScreen}
        options={{
          tabBarIcon: ({color}) => <Icon name="book" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="TabEventsScreen"
        component={TabEventsScreen}
        options={{
          tabBarIcon: ({color}) => <Icon name="calendar" color={color} size={26} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
