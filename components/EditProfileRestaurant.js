import React from 'react'
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { TextInput, Text } from 'react-native';
import { Button, Toast, Spinner } from 'native-base'
import { end_point } from '../assets/config'
import * as yup from 'yup'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { withNavigation } from 'react-navigation';
import Colors from '../assets/colors'


const EditProfileRestaurant = props => {

    const [state, setState] = React.useState({ user: null, loading: false })
    const dispatch = useDispatch()
    const user = useSelector(state => state.Auth.user)
    const token = useSelector(state => state.Auth.token)
    

    const handleUpdateProfile = (values) => {
        console.log('values',values)
    
          setState({ ...state, loading: true })
          try {
            fetch(end_point + '/api/restaurant/update/'+user._id, {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify({ name: values.name, contact: values.contact, pointPercentage:values.pointPercentage })
            }).then(response => response.json()).then(response => {
                console.log(`response ------------> `, response)
                setState({ ...state, loading: false })
                if (response.error === true) {
                  console.log('here')
                  Toast.show({
                    text: response.message ? response.message : 'Something went wrong!',
                    type: "danger",
                    textStyle:{color:'#fff'},
                      position:'top',
                      style:{backgroundColor:Colors.color2,color:'black',marginTop:20}
                  })
                } else {
                  Toast.show({
                      text: 'User Details Updated Successfully',
                      textStyle:{color:'#fff'},
                      position:'top',
                      style:{backgroundColor:Colors.color1,color:'black',marginTop:20}
                  })
                  dispatch({ type: 'UPDATE_USER_DETAILS', payload: response.Restaurant })    
                  props.navigation.goBack()
                }
              }).catch(error => {
                  console.log(`error ------------> `, error)
                setState({ ...state, loading: false })
                Toast.show({
                  text: 'Error While Updating!',
                  type: "danger",
                  position:'top',
                  style:{backgroundColor:Colors.color2,color:'black',marginTop:20}
                })
              })
            } catch (error) {
              console.log(`error ------------> `, error)
              setState({ ...state, loading: false })
              Toast.show({
                text: 'Something went wrong3!',
                type: "danger"
              })
            }
      }


    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{width:'100%'}}>
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column', justifyContent: 'center',width:'100%' }} behavior="padding" enabled keyboardVerticalOffset={80}>
          <ScrollView style={{ flex: 1, backgroundColor: '#fff',width:'100%' }} showsVerticalScrollIndicator={false}>
          <View style={styles.outerView}>
      <Formik
              initialValues={{ name: user.name, contact: user.contact, city:user.city, pointPercentage:user.pointPercentage.toString() }}
              onSubmit={values => handleUpdateProfile(values)}
              validationSchema={yup.object().shape({
                name: yup
                  .string()
                  .max(20,'Name cannot exceed 20 Characters')
                  .required('Name is required'),
                  pointPercentage: yup
                    .number('Percentage should be in numbers')
                  //.number(20,'Name cannot exceed 20 Characters')
                  .required('Percentage is required'),
                contact: yup
                  .string()
                  .max(15,'Contact number cannot exceed 15 characters')
                  .required('Contact is required!'),
                city: yup
                  .string()
                  .required('City is required!'),
              })}
            >
              {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <React.Fragment>
                  <View style={{ width: '100%' }}>
                    <Text style={styles.labelText}>Points Pertentage:</Text>
                  </View>
                  <TextInput
                    value={values.pointPercentage}
                    onChangeText={handleChange('pointPercentage')}
                    //placeholderTextColor={'red'}
                    keyboardType='numeric'
                    onBlur={() => setFieldTouched('pointPercentage')}
                    placeholder="Points Pertentage"
                    style={styles.textInput}
                  />
                  {touched.pointPercentage && errors.pointPercentage &&
                    <Text style={{ fontSize: 10, color: 'red', width: '100%' }}>{errors.pointPercentage}</Text>
                  }
                  <View style={{ width: '100%' }}>
                    <Text style={styles.labelText}>Name:</Text>
                  </View>
                  <TextInput
                    value={values.name}
                    onChangeText={handleChange('name')}
                    //placeholderTextColor={'red'}
                    keyboardType='default'
                    onBlur={() => setFieldTouched('name')}
                    placeholder="Name"
                    style={styles.textInput}
                  />
                  {touched.name && errors.name &&
                    <Text style={{ fontSize: 10, color: 'red', width: '100%' }}>{errors.name}</Text>
                  }
                  <View style={{ width: '100%' }}>
                    <Text style={styles.labelText}>Contact:</Text>
                  </View>
                  <TextInput
                    value={values.contact}
                    onChangeText={handleChange('contact')}
                    //placeholderTextColor={'red'}
                    keyboardType='number-pad'
                    onBlur={() => setFieldTouched('contact')}
                    placeholder="Contact"
                    style={styles.textInput}
                  />
                  {touched.contact && errors.contact &&
                    <Text style={{ fontSize: 10, color: 'red', width: '100%' }}>{errors.contact}</Text>
                  }
                  <View style={{ width: '100%' }}>
                    <Text style={styles.labelText}>City:</Text>
                  </View>
                  <TextInput
                    value={values.city}
                    onChangeText={handleChange('city')}
                    //placeholderTextColor={'red'}
                    keyboardType='default'
                    onBlur={() => setFieldTouched('city')}
                    placeholder="City"
                    style={styles.textInput}
                  />
                  {touched.city && errors.city &&
                    <Text style={{ fontSize: 10, color: 'red', width: '100%' }}>{errors.city}</Text>
                  }
                  <View style={{ width: '100%' }}>
                    <Text style={styles.labelText}>Tags:</Text>
                  </View>
                  <TextInput
                    value={values.tags}
                    onChangeText={handleChange('tags')}
                    //placeholderTextColor={'red'}
                    keyboardType='number-pad'
                    onBlur={() => setFieldTouched('tags')}
                    placeholder="Tags"
                    style={styles.textInput}
                  />
                  {touched.tags && errors.tags &&
                    <Text style={{ fontSize: 10, color: 'red', width: '100%' }}>{errors.tags}</Text>
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
                        <Text style={{ color: '#fff' }}>Update</Text>
                    }
                  </Button>
                  <Button
                    style={{ ...styles.button, backgroundColor: Colors.black_shade }}
                    //disabled={state.loading === true ? true : false}
                    //onPress={handleSignIn}
                    onPress={()=>props.navigation.goBack()}
                  >
                    <Text style={{ color: '#fff' }}>Cancel</Text>
                  </Button>
                </React.Fragment>
              )}
            </Formik>
            </View>
            </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    )
    
}

const styles = StyleSheet.create({
    outerView: {
      justifyContent: 'center',
      alignItems: 'center',
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
      marginHorizontal: 10,
      //placeholderStyle:{{ borderColor: 'red' }},
      width: '100%'
    },
    username: {
      width: '100%'
    },
    button: {
      width: '100%', marginVertical: 10, justifyContent: 'center'
    },
    thumbnail: {
      height: '100%',
      width: '100%',
      flex: 1,
      // marginHorizontal:100,
      // marginVertical:20,
    },
    labelText: { color: Colors.grey_shade, fontFamily: 'open-sans-bold', paddingLeft: 5 },
    imageContainer: {
      paddingLeft: 60,
      paddingRight: 60,
      paddingTop: 60,
      paddingBottom: 10,
      width: '100%',
      height: 300
    },
  })

export default withNavigation(EditProfileRestaurant)