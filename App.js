import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './TabNavigator/TabNavigation';
import {WelcomeScreen} from './AppScreen/StackScreen';
import {Provider} from './appStore/context';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider>
      <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} /> */}
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
