import React from 'react'
import { View, StyleSheet, Image, ScrollView, KeyboardAvoidingView } from 'react-native'
import { TextInput, Text } from 'react-native';
import { Button, Toast, Spinner } from 'native-base'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import Colors from '../assets/colors'
import { end_point } from '../assets/config'
import { useDispatch } from 'react-redux'
import Logo from '../assets/images/logo.png'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as yup from 'yup'
import { Formik } from 'formik'


const SignIn = props => {

  // const [text, setText] = React.useState("")
  const [state, setState] = React.useState({ username: '', password: '', loading: false })

  const dispatch = useDispatch()


  const handleSignIn = (values) => {

    setState({ ...state, loading: true })
    try {
      fetch(end_point + '/api/restaurant/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: values.email, password: values.password })
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
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column', justifyContent: 'center', }} behavior="padding" enabled keyboardVerticalOffset={80}>

        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>

          <View style={styles.outerView}>
            <View style={styles.imageContainer}>
              <Image source={Logo} style={styles.thumbnail} />
            </View>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={values => handleSignIn(values)}
              validationSchema={yup.object().shape({
                email: yup
                  .string()
                  .email()
                  .required('Enter email address!'),
                password: yup
                  .string()
                  .min(7)
                  .max(15)
                  .required('Enter password!'),
              })}
            >
              {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <React.Fragment>
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange('email')}
                    //placeholderTextColor={'red'}
                    keyboardType='email-address'
                    onBlur={() => setFieldTouched('email')}
                    placeholder="E-mail"
                    style={styles.textInput}
                  />
                  {touched.email && errors.email &&
                    <Text style={{ fontSize: 10, color: 'red', width: '100%' }}>{errors.email}</Text>
                  }
                  <TextInput
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="Password"
                    onBlur={() => setFieldTouched('password')}
                    secureTextEntry={true}
                    style={styles.textInput}
                  />
                  {touched.password && errors.password &&
                    <Text style={{ fontSize: 10, color: 'red', width: '100%' }}>{errors.password}</Text>
                  }
                  <Button
                    style={{ ...styles.button, backgroundColor: Colors.red_shade }}
                    disabled={state.loading === true ? true : false}
                    //onPress={handleSignIn}
                    onPress={handleSubmit}
                  >
                    {
                      state.loading === true ?
                        <Spinner color={'#fff'} size={15} />
                        :
                        <Text style={{ color: Colors.black_shade }}>Sign In</Text>
                    }
                  </Button>
                  {/* <Button
                disabled={!isValid}
                onPress={handleSubmit}
                style={styles.button}
              ><Text>Sign In</Text></Button> */}
                </React.Fragment>
              )}
            </Formik>
            <TouchableOpacity onPress={() => Toast.show({ text: 'Working on it.' })}>

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
    width: '100%', marginVertical: 10, justifyContent: 'center'
  },
  textInput:{
    borderColor:'#BDBDBD',
    borderWidth:1,
    borderRadius:5,
    marginVertical:10,
    height:45,
    paddingLeft:10,
    marginHorizontal:10,
    //placeholderStyle:{{ borderColor: 'red' }},
    width:'100%'},
  thumbnail: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  imageContainer: {
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 60,
    paddingBottom: 10,
    width: '100%',
    height: 300
  },
})

export default SignIn