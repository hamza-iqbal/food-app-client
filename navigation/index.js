import { Platform } from 'react-native';
import {  createStackNavigator } from 'react-navigation-stack';
import {  createAppContainer } from 'react-navigation';

import SigninScreen from '../screens/SignIn';
// import CategoryMealsScreen from '../screens/CategoryMealsScreen';
// import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../assets/colors';

const Navigator = createStackNavigator(
  {
    SignIn: {
      screen: SigninScreen
    },
    // CategoryMeals: {
    //   screen: CategoryMealsScreen
    // },
    // MealDetail: MealDetailScreen
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.blue_shade : ''
      },
      headerTintColor: 
        Platform.OS === 'android' ? 'white' : Colors.blue_shade,
      headerTitle: 'Sign In'
    }
  }
);

export default createAppContainer(Navigator);
