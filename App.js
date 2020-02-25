import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { useScreens } from 'react-native-screens';
import AuthReducer from './store/reducers/Auth'
import UserReducer from './store/reducers/User'
import { Provider } from 'react-redux'
import { Root,StyleProvider } from 'native-base'
import Navigator from './navigation';
import { createStore, combineReducers } from 'redux'
import colors from './assets/colors';

const rootReducer = combineReducers({
  Auth: AuthReducer,
  User: UserReducer
})

const store = createStore(rootReducer)

useScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
  });
};

const customTheme = {
  'brandPrimary': {
    color:colors.yellow_shade
  }
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return <Provider store={store}><Root><Navigator /></Root></Provider>
}
