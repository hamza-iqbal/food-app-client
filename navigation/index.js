import React from 'react'
import { Platform, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { useSelector } from 'react-redux'
import { Spinner } from 'native-base'
import Menu from '../components/HeaderMenuButton'
import SigninScreen from '../screens/SignIn';
import SignupScreen from '../screens/SignUp';
import HomeScreen from '../screens/Home';
import RestaurantDetailsScreen from '../screens/RestaurantDetails';
import WelcomeScreen from '../screens/Welcome';
import ProfileScreen from '../screens/Profile';
import DrawerComponent from '../components/DrawerComponent'
import Colors from '../assets/colors';

const HomeWithDrawer = createDrawerNavigator({
  Home: HomeScreen
}, {
  contentComponent: () =>(<DrawerComponent />),
  drawerWidth: '80%',
})
const AuthStack = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions:{
      header:()=>null
    }
  },
  SignIn: SigninScreen,
  SignUp: SignupScreen,
},{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.red_shade : 'white'
    },
    headerTintColor:
      Platform.OS === 'android' ? 'white' : Colors.red_shade,
  }
})
const AppStack = createStackNavigator({
  Home: {
    screen: HomeWithDrawer,
    navigationOptions: {
      title: 'Home',
      headerLeft:()=>(<Menu/>)
    }
  },
  Profile: ProfileScreen,
  RestaurantDetails: {
    screen: RestaurantDetailsScreen,
    navigationOptions: {
      title: 'Details',
    }
  },
},{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.red_shade : ''
    },
    headerTintColor:
      Platform.OS === 'android' ? 'white' : Colors.red_shade,
  }
})
// 
const AuthLoadingScreen = props => {

  const token = useSelector(state => state.Auth.token)
  React.useEffect(() => {
    props.navigation.navigate(token ? 'App' : 'Auth');
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Spinner color={Colors.red_shade} />
    </View>
  );
}


// const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading'
  }
));

//const Navigator = createStackNavigator(
  //   {
  //     //Test:TestScreen,
  //     Welcome: {
  //       screen: WelcomeScreen,
  //       navigationOptions: {
  //         headerShown: false,
  //       }
  //     },
  //     SignIn: {
  //       screen: SigninScreen
  //     },
  //     Profile: {
  //       screen: ProfileScreen
  //     },
  //     SignUp: SignupScreen,
  //     Home: {
  //       screen: HomeWithDrawer,
  //       navigationOptions: {
  //         title: 'Home',
  //         headerLeft: () => null,
  //         gestureEnabled: false,
  //       }
  //     },
  //     RestaurantDetails: {
  //       screen: RestaurantDetailsScreen,
  //       navigationOptions: {
  //         title: 'Details',
  //       }
  //     },
  //   },
  //   {
  //     defaultNavigationOptions: {
  //       headerStyle: {
  //         backgroundColor: Platform.OS === 'android' ? Colors.red_shade : ''
  //       },
  //       headerTintColor:
  //         Platform.OS === 'android' ? 'white' : Colors.red_shade,
  //     }
  //   }
  // );
  
  //export default createAppContainer(Navigator);
  