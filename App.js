import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './TabNavigator/TabNavigation';
import {
  // StackAddEvent,
  StackCreateEvent,
  StackCreatHobbie,
  WelcomeScreen,
  StackAddEvent,
  StackCreateRule,
  StackAddHobbie,
} from './AppScreen/StackScreen';
import {Provider} from './appStore/context';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {/* <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} /> */}
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="StackCreateHobbie" component={StackCreatHobbie} />
          <Stack.Screen name="StackCreateEvent" component={StackCreateEvent} />
          <Stack.Screen name="StackAddEvent" component={StackAddEvent} />
          <Stack.Screen name="StackCreateRule" component={StackCreateRule} />
          <Stack.Screen name='StackAddHobbie' component={StackAddHobbie}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
