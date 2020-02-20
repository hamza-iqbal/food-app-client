import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import LottieView from 'lottie-react-native';
import colors from '../assets/colors/index.js';

const App = props => {
  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
          <Text style={styles.text}>{props.text}</Text>
        <StatusBar barStyle="dark-content" />
        <View style={styles.body}>
          <LottieView source={require('../assets/lottie/failure.json')} autoPlay loop={false} style={{height: 200}}/>
        </View>
       </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    width:'100%'
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  text:{
    padding:5,
    color:colors.yellow_shade,
    fontSize:30,
    fontFamily:'open-sans-bold'
  }
  
});

export default App;