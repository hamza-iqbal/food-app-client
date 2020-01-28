import React from 'react'
import { Platform,View,Text,Button,SafeAreaView } from 'react-native';
import {  createStackNavigator } from 'react-navigation-stack';
import {  createAppContainer } from 'react-navigation';
import {  createDrawerNavigator } from 'react-navigation-drawer';

import SigninScreen from '../screens/SignIn';
import SignupScreen from '../screens/SignUp';
import HomeScreen from '../screens/Home';
import RestaurantDetailsScreen from '../screens/RestaurantDetails';
import WelcomeScreen from '../screens/Welcome';
import ProfileScreen from '../screens/Profile';

//import TestScreen from '../screens/Test';
// import CategoryMealsScreen from '../screens/CategoryMealsScreen';
// import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../assets/colors';
//import { Text } from 'native-base';
/*
const tabScreenConfig = {
  Camera: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
        ) : (
          'Meals'
        )
    }
  },
}

*/


const HomeWithDrawer = createDrawerNavigator(
  {
    Home: { screen: HomeScreen }
  }, {
  contentComponent: (props) => (
    <View style={{ flex: 1 }}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <Button
          color='red'
          title='Profile'
          onPress={() => { console.log('hahaProfile') }}
        />
        <Button
          color='red'
          title='Logout'
          onPress={() => { console.log('haha') }}
        />
      </SafeAreaView>
    </View>
  ),
  drawerWidth: '80%',
})
const Navigator = createStackNavigator(
  {
    //Test:TestScreen,
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: {
        headerShown: false,
      }
    },
    SignIn: {
      screen: SigninScreen
    },
    SignUp: SignupScreen,
    Home: {
      screen: HomeWithDrawer,
      navigationOptions: {
        title: 'Home',
        headerLeft:()=> null,
        gestureEnabled: false,
      }
    },
    RestaurantDetails:{
      screen: RestaurantDetailsScreen,
      navigationOptions: {
        title: 'Details',
      }
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.red_shade : ''
      },
      headerTintColor: 
        Platform.OS === 'android' ? 'white' : Colors.red_shade,
    }
  }
);

export default createAppContainer(Navigator);
