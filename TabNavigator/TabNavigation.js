import {StyleSheet, TouchableOpacity, View} from 'react-native';
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
import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';

const Tab = createBottomTabNavigator();

const AddButton = ({focused, navigation, currentTab}) => {
  const handlePress = () => {
    switch (currentTab) {
      case 'TabHobbiesScreen':
        navigation.navigate('StackCreateHobbie');
        break;
      case 'TabEventsScreen':
        navigation.navigate('StackCreateEvent');
        break;
      default:
        // Optional: handle default case or show alert
        break;
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.addButtonContainer}>
        <Icon name="add" size={55} color="#FFFFFF" style={styles.addButton} />
      </View>
    </TouchableOpacity>
  );
};

const TabNavigation = () => {
  const [currentTab, setCurrentTab] = useState('TabHobbiesScreen');
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen
        name="TabProfileScreen"
        component={TabProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="user" color={color} size={26} />
          ),
        }}
        listeners={{
          tabPress: () => setCurrentTab('TabProfileScreen'),
        }}
      />
      <Tab.Screen
        name="TabHobbiesScreen"
        component={TabHobbiesScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="attractions" color={color} size={26} />
          ),
        }}
        listeners={{
          tabPress: () => setCurrentTab('TabHobbiesScreen'),
        }}
      />
      <Tab.Screen
        name=" "
        component={EmptyComponent} // You can create an empty component
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.createBtnContainer}>
              <AddButton
                focused={focused}
                navigation={navigation}
                currentTab={currentTab}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TabRulesScreen"
        component={TabRulesScreen}
        options={{
          tabBarIcon: ({color}) => <Icon name="book" color={color} size={26} />,
        }}
        listeners={{
          tabPress: () => setCurrentTab('TabRulesScreen'),
        }}
      />
      <Tab.Screen
        name="TabEventsScreen"
        component={TabEventsScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="calendar" color={color} size={26} />
          ),
        }}
        listeners={{
          tabPress: () => setCurrentTab('TabEventsScreen'),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    height: 90,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  addButtonContainer: {
    position: 'absolute',
    // bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#FF9F0A',
    width: 82,
    height: 82,
    borderRadius: 41,
    textAlign: 'center',
    lineHeight: 82,
    shadowColor: '#FF9F0A',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  
});

// Empty component for the Add tab
const EmptyComponent = () => null;
