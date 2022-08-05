import 'react-native-gesture-handler';
 
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
import HomeScreen from './Nav/Home';
import AddScreen from './Nav/Add';
import EditScreen from './Nav/Edit';




const Stack = createStackNavigator();

const Nav = () => {
  
  
    return (
      

      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ 
              headerShown: false
            }}
          />

          <Stack.Screen
            name="AddScreen"
            component={AddScreen}
            options={{
              headerShown: false
            }}
          />
          
           <Stack.Screen
            name="EditScreen"
            component={EditScreen}
            options={{
              headerShown: false
            }}
          />
          </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Nav;