import React from 'react'
import { Platform, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { useSelector } from 'react-redux'
import { Spinner } from 'native-base'
import Menu from '../components/HeaderMenuButton'
import SearchButton from '../components/HeaderSearchButton'
import LogoutButton from '../components/LogoutButton'
import SigninScreen from '../screens/SignIn';
import SignupScreen from '../screens/SignUp';
import HomeScreen from '../screens/Home';
import RestaurantDetailsScreen from '../screens/RestaurantDetails';
import SearchRestaurantsScreen from '../screens/SearchRestaurants';
import WelcomeScreen from '../screens/Welcome';
import ProfileScreen from '../screens/Profile';
import RestaurantProfileScreen from '../screens/RestaurantProfile';
import RestaurantHome from '../screens/RestaurantHome'
import DrawerComponent from '../components/DrawerComponent'
import Colors from '../assets/colors';
import ScanScreen from '../screens/Scan'
import RedeemScreen from '../screens/Redeem'
import RestaurantSigninScreen from '../screens/SignInRestaurant'
import RewardsScreen from '../screens/Rewards'
import EditProfileScreen from '../screens/EditProfile'
import RestaurantDealsScreen from '../screens/RestaurantDeals'

import ChangePasswordScreen from '../screens/ChangePassword'
import AddButton from '../components/AddButton';
import EditButton from '../components/EditButton';
//import UploadImageScreen from '../screens/UploadImage'

const HomeWithDrawer = createDrawerNavigator({
  Home: HomeScreen
}, {
  contentComponent: () => (<DrawerComponent />),
  drawerWidth: '80%',
})
const AuthStack = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: () => null
    }
  },
  SignIn: SigninScreen,
  RestaurantSignIn: {
    screen: RestaurantSigninScreen,
    navigationOptions: {
      title: 'Restaurant'
    }
  },
  SignUp: SignupScreen,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.red_shade : 'white',
      // alignItems:'center'
    },
    headerTitleStyle: {
      color: 'black'
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
      headerLeft: () => (<Menu />),
      headerRight: () => (<SearchButton />)
    }
  },
  Scan: ScanScreen,
  Redeem: RedeemScreen,
  ChangePassword: {
    screen: ChangePasswordScreen,
    navigationOptions: {
      title: 'Change Password',
    }
  },
  EditProfile: {
    screen: EditProfileScreen,
    navigationOptions: {
      title: 'Edit Profile',
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions:{
      title:'Profile',
      headerRight: () => (<EditButton />)
    }
  },
  SearchRestaurant: {
    screen: SearchRestaurantsScreen,
    navigationOptions: {
      title: 'Search Restaurants',
    }
  },
  RestaurantDetails: {
    screen: RestaurantDetailsScreen,
    navigationOptions: {
      title: 'Details',
    }
  },
  Rewards: {
    screen: RewardsScreen,
    navigationOptions: {
      title: 'Rewards',
    }
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.red_shade : '#fff'
    },
    headerTitleStyle: {
      color: 'black'
    },
    headerTintColor:
      Platform.OS === 'android' ? 'white' : Colors.red_shade,
  }
})
const RestaurantStack = createStackNavigator({
  Home: {
    screen: RestaurantHome,
    navigationOptions: {
      title: 'Home',
      headerLeft: () => (null),
      headerRight: () => (<LogoutButton />)
    }
  },
  Profile: ProfileScreen,
  ChangePassword: {
    screen: ChangePasswordScreen,
    navigationOptions: {
      title: 'Change Password',
    }
  },
  RestaurantProfile: {
    screen: RestaurantProfileScreen,
    navigationOptions: {
      title: 'Profile',
    }
  },
  EditProfile: {
    screen: EditProfileScreen,
    navigationOptions: {
      title: 'Edit Profile',
    }
  },
  RestaurantDeals: {
    screen: RestaurantDealsScreen,
    navigationOptions: {
      title: 'Deals',
      headerRight: () => (<AddButton />)
    },
  },
  //UploadImage: UploadImageScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.red_shade : '#fff'
    },
    headerTitleStyle: {
      color: 'black'
    },
    headerTintColor:
      Platform.OS === 'android' ? 'white' : Colors.red_shade,
  }
})
// 
const AuthLoadingScreen = props => {

  const token = useSelector(state => state.Auth.token)
  const user = useSelector(state => state.Auth.user)
  React.useEffect(() => {
    props.navigation.navigate(token ? user.role === 'restaurant' ? 'Rest' : 'App' : 'Auth');
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Spinner color={Colors.red_shade} />
    </View>
  );
}


export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    Rest: RestaurantStack,
  },
  {
    initialRouteName: 'AuthLoading'
  }
));
