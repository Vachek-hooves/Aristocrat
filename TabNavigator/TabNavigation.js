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
    <View style={styles.addBtnBox}>
      <TouchableOpacity onPress={handlePress} style={styles.addBtnContainer}>
        <Icon
          name="add"
          size={35} // Smaller icon size
          color="#FFFFFF"
          style={styles.addButton}
        />
      </TouchableOpacity>
    </View>
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
        tabBarActiveTintColor: '#FFFFFF', // White color for active icons
        tabBarInactiveTintColor: '#8E8E93', // Gray color for inactive icons
        tabBarShowLabel: false, // Hide labels
        tabBarItemStyle: {
          // padding: 4,
          marginTop: 20,
        },
      }}>
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
      <Tab.Screen
        name=" "
        component={EmptyComponent}
        options={{
          tabBarIcon: ({focused}) => (
            <AddButton
              focused={focused}
              navigation={navigation}
              currentTab={currentTab}
            />
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
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    // bottom: 34,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: colors.gray,
    borderRadius: 25,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    paddingBottom: 8,
    borderTopWidth: 0,
  },
  addBtnBox: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#0A84FF',
    width: 50,
    height: 50,
    borderRadius: 25,
    textAlign: 'center',
    lineHeight: 50,
    shadowColor: '#0A84FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 5,
  },

  addBtnContainer: {
    backgroundColor: colors.main,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    // height: 30,
    padding: 10,
    borderRadius: '80%',
  },
});

// Empty component for the Add tab
const EmptyComponent = () => null;
