import React from 'react'
import { View, StyleSheet, Image, ScrollView,KeyboardAvoidingView } from 'react-native'
import { Button, Item, Input, Text, Icon, Toast, Spinner } from 'native-base'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import Colors from '../assets/colors'
import { end_point } from '../assets/config'
import { useDispatch } from 'react-redux'
import Logo from '../assets/images/logo.png'
import { TouchableOpacity } from 'react-native-gesture-handler'


const SignIn = props => {

  // const [text, setText] = React.useState("")
  const [state, setState] = React.useState({ username: '', password: '', loading: false })

  const dispatch = useDispatch()


  const handleSignIn = () => {

    setState({ ...state, loading: true })
    try {
      fetch(end_point + '/api/restaurant/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: state.username, password: state.password })
      }).then(response => response.json()).then(response => {
        console.log(`response ------------> `, response)
        setState({ ...state, loading: false })
        if (response.error === true) {
          console.log('here')
          Toast.show({
            text: response.message ? response.message : 'Something went wrong!',
            type: "danger"
          })
        } else {
          dispatch({ type: 'SAVE_LOGIN_DETAILS', payload: response.Restaurant })
          dispatch({ type: 'SAVE_TOKEN', payload: response.token })

          props.navigation.navigate('Rest')
        }
      }).catch(() => {
        setState({ ...state, loading: false })
        Toast.show({
          text: 'Something went wrong!',
          type: "danger"
        })
      })
    } catch (error) {
      console.log(`error ------------> `, error)
      setState({ ...state, loading: false })
      Toast.show({
        text: 'Something went wrong!',
        type: "danger"
      })
    }
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ flex: 1,backgroundColor:'#fff', flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={80}>

      <ScrollView style={{flex:1,backgroundColor:'#fff'}} showsVerticalScrollIndicator={false}>

        <View style={styles.outerView}>
          <View style={styles.imageContainer}>
            <Image source={Logo} style={styles.thumbnail} />
          </View>
          <View>
            <Item block style={{ ...styles.username }}>
              <Icon active name='person' />
              <Input placeholder='Username' onChange={event => setState({ ...state, username: event.nativeEvent.text })} value={state.username} keyboardType="email-address" />
            </Item>
          </View>
          <View>
            <Item block style={styles.username}>
              <Icon active name='lock' />
              <Input placeholder='Password' secureTextEntry={true} value={state.password} onChange={event => setState({ ...state, password: event.nativeEvent.text })} keyboardType="email-address" />
            </Item>
          </View>
          <Button
            style={{ ...styles.button, backgroundColor: Colors.blue_shade }}
            disabled={state.loading === true ? true : false}
            onPress={handleSignIn}
          >
            {
              state.loading === true ?
                <Spinner color={Colors.red_shade} size={15} />
                :
                <Text style={{ color: '#fff' }}>Sign In</Text>
            }
          </Button>
          <TouchableOpacity onPress={()=>Toast.show({text:'Working on it.'})}>

          <View>
            <Text style={{ color: 'grey', fontWeight: '500', marginVertical: 10 }}>Forgot Password?</Text>
          </View>
          </TouchableOpacity>
          {/* <View>
            <Text style={{ color: 'grey', fontWeight: '500', marginVertical: 10 }}>or</Text>
          </View> */}
          {/* <TouchableOpacity onPress={()=>props.navigate('RestaurantSignIn')}>

            <View>
              <Text style={{ color: Colors.red_shade, fontWeight: '500', marginVertical: 10 }}>Sign In as Restaurant</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>)
}

const styles = StyleSheet.create({
  outerView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  username: {
    width: '100%'
  },
  button: {
    width: '100%', marginVertical: 20, justifyContent: 'center'
  },
  thumbnail: {
    height: '100%',
    width: '100%',
    flex: 1,
    // marginHorizontal:100,
    // marginVertical:20,
  },
  imageContainer: {
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 60,
    paddingBottom: 60,
    width: '100%',
    height: 350
  },
})

export default SignIn