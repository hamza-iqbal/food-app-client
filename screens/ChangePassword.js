import React from 'react'
import { Formik } from 'formik'
import { TextInput, StyleSheet,ScrollView,SafeAreaView } from 'react-native'
import { Button, Spinner, Text,Toast } from 'native-base'
import * as yup from 'yup'
import Colors from '../assets/colors'
import { useSelector } from 'react-redux'
import { end_point } from '../assets/config'

const ChangePassword = props => {

    const [state, setState] = React.useState({ oldPassword: '', newPassword: '', reNewPassword: '', loading: false })
    //const dispatch = useDispatch()
    const user = useSelector(state => state.Auth.user)
    const token = useSelector(state => state.Auth.token)


  const handlePasswordChange = (values) => {

    setState({ ...state, loading: true })
    console.log('values',values,user)
    try {
        let url = end_point + (user.role === 'restaurant'? '/api/restaurant/change-password/':'/api/user/change-password/') +user._id;
        console.log('url: ',url)
      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword: values.oldPassword, newPassword: values.newPassword })
      }).then(response => response.json()).then(response => {
        console.log(`response ------------> `, response)
        setState({ ...state, loading: false })
        if (response.error === true) {
          console.log('here')
          Toast.show({
            text: response.message ? response.message : 'Something went wrong!',
            textStyle:{color:'#fff'},
            position:'top',
            style:{backgroundColor:'#e53935',color:'black',marginTop:20}
          })
        } else {
            Toast.show({
                text: 'Password Changed Successfully',
                textStyle:{color:'#fff'},
                position:'top',
                style:{backgroundColor:Colors.color1,color:'black',marginTop:20}
            })
            props.navigation.goBack()
        }
      }).catch(err => {
          console.log(err)
        setState({ ...state, loading: false })
        Toast.show({
          text: 'Something went wrong!',
          textStyle:{color:'#fff'},
          position:'top',
          style:{backgroundColor:'#e53935',color:'black',marginTop:20}
        })
      })
    } catch (error) {
      console.log(`error ------------> `, error)
      setState({ ...state, loading: false })
      Toast.show({
        text: 'Something went wrong!',
        textStyle:{color:'#fff'},
        position:'top',
        style:{backgroundColor:'#e53935',color:'black',marginTop:20}
      })
    }
  }


    return (
        <SafeAreaView style={styles.outerView}>

        <ScrollView style={styles.outerView}>
            <Formik
                initialValues={{ oldPassword: '',newPassword:'', reNewPassword: '' }}
                onSubmit={values => handlePasswordChange(values)}
                validationSchema={yup.object().shape({
                    oldPassword: yup
                        .string()
                        .min(7,'Min 7 characters')
                        .max(15,'Max 15 characters')
                        .required('Enter your old Password!'),
                    newPassword: yup
                        .string()
                        .min(7,'Min 7 characters')
                        .max(15,'Max 15 characters')
                        .required('Enter your new password!'),
                    reNewPassword: yup
                        .string()
                        .min(7,'Min 7 characters')
                        .max(15,'Max 15 characters')
                        .test('passwords-match', 'Passwords do not match!', function(value) {
                            return this.parent.newPassword === value;
                          })
                        .required('Enter your new password again!'),

                })}
            >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                    <React.Fragment>
                        <TextInput
                            value={values.oldPassword}
                            onChangeText={handleChange('oldPassword')}
                            //placeholderTextColor={'red'}
                            secureTextEntry={true}
                            type="pa"
                            onBlur={() => setFieldTouched('oldPassword')}
                            placeholder="Old Password"
                            style={styles.textInput}
                        />
                        {touched.oldPassword && errors.oldPassword &&
                            <Text style={{ fontSize: 10, color: 'red', width: '100%' }}>{errors.oldPassword}</Text>
                        }
                        <TextInput
                            value={values.newPassword}
                            onChangeText={handleChange('newPassword')}
                            //placeholderTextColor={'red'}
                            secureTextEntry={true}
                            keyboardType='email-address'
                            onBlur={() => setFieldTouched('newPassword')}
                            placeholder="New Password"
                            style={styles.textInput}
                        />
                        {touched.newPassword && errors.newPassword &&
                            <Text style={{ fontSize: 10, color: 'red', width: '100%' }}>{errors.newPassword}</Text>
                        }
                        <TextInput
                            value={values.reNewPassword}
                            onChangeText={handleChange('reNewPassword')}
                            //placeholderTextColor={'red'}
                            secureTextEntry={true}
                            keyboardType='email-address'
                            onBlur={() => setFieldTouched('reNewPassword')}
                            placeholder="Re-enter Password"
                            style={styles.textInput}
                        />
                        {touched.reNewPassword && errors.reNewPassword &&
                            <Text style={{ fontSize: 10, color: 'red', width: '100%' }}>{errors.reNewPassword}</Text>
                        }
                        <Button
                            style={{ ...styles.button, backgroundColor: Colors.red_shade }}
                            disabled={state.loading === true ? true : false}
                            //onPress={handleSignIn}
                            onPress={handleSubmit}
                        >
                            {
                                state.loading === true ?
                                    <Spinner color={'white'} size={15} />
                                    :
                                    <Text style={{ color: Colors.black_shade }}>Change Password</Text>
                            }
                        </Button>
                    </React.Fragment>
                )}
            </Formik>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    outerView: {
        // justifyContent: 'center',
        // alignItems: 'center',
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    textInput: {
        borderColor: '#BDBDBD',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
        height: 45,
        paddingLeft: 10,
        // marginHorizontal: 10,
        //placeholderStyle:{{ borderColor: 'red' }},
        width: '100%'
    },
    
    button: {
        width: '100%', marginVertical: 10, justifyContent: 'center'
    },
    // thumbnail: {
    //     height: '100%',
    //     width: '100%',
    //     flex: 1,
    //     // marginHorizontal:100,
    //     // marginVertical:20,
    // },
    // imageContainer: {
    //     paddingLeft: 60,
    //     paddingRight: 60,
    //     paddingTop: 60,
    //     paddingBottom: 10,
    //     width: '100%',
    //     height: 300
    // },
})

export default ChangePassword