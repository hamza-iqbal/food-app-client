import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Item, Input, Text, Icon, Toast, Spinner } from 'native-base'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import Colors from '../assets/colors'
import { end_point } from '../assets/config'
import { useDispatch } from 'react-redux'

const SignIn = props => {

  // const [text, setText] = React.useState("")
  const [state, setState] = React.useState({ username: '', password: '', loading: false })

  const dispatch = useDispatch()


  const handleSignIn = () => {
    
    setState({ ...state, loading: true })
    try {
      fetch(end_point + '/api/user/login', {
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
          dispatch({type:'SAVE_LOGIN_DETAILS',payload:response.User})
          dispatch({type:'SAVE_TOKEN',payload:response.token})
          props.navigation.navigate('Home')
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
      <View style={styles.outerView}>
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
        <View>
          <Text style={{ color: 'grey', fontWeight: '500', marginVertical: 10 }}>Forgot Password?</Text>
        </View>
      </View>
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
  }
})

export default SignIn