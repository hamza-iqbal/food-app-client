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

  const [star,setStar] = React.useState(false)
  console.log('star___________________________________________________________________________________________________________________________________________________________',star)

  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        {
          star === false?
          <Text style={styles.text}>Congratulations!</Text>
          :
          <Text style={styles.text}>{props.successText}</Text>
        }
        <StatusBar barStyle="dark-content" />
        <View style={styles.body}>
          {
            star === false?
            <LottieView source={require('../assets/lottie/success.json')} autoPlay loop={false} onAnimationFinish={()=>setStar(true)} style={{height: 200}}/>
            :
            <LottieView source={require('../assets/lottie/star.json')} autoPlay loop={false} style={{height: 300}}/>
          }
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