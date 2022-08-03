import 'react-native-gesture-handler';
 
import * as React from 'react';
import { Button, View, Text } from 'react-native';
 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
import HomeScreen from './Nav/Home';
import AddScreen from './Nav/Add';
// test
const Stack = createStackNavigator();

const Nav = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              // title: 'Home', //Set Header Title
              // headerStyle: {
              //   backgroundColor: '#f4511e', //Set Header color
              // },
              // headerTintColor: '#fff', //Set Header text color
              // headerTitleStyle: {
              //   fontWeight: 'bold', //Set Header text style
              // },
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
          </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Nav;