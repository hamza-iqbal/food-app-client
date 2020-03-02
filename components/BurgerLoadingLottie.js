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
      <View style={styles.container}>
          {
            props.text ?
            <Text style={styles.text}>{props.text}</Text>
            :null
          }
        <StatusBar barStyle="dark-content" />
        <View style={styles.body}>
          <LottieView source={require('../assets/lottie/loading-burger.json')} autoPlay loop style={{height: 200}}/>
        </View>
       </View>
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
    fontFamily:'open-sans-bold',
    textAlign:'center'
  }
  
});

export default App;