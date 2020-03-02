import React from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Platform, View, TouchableOpacity, Alert, Text, StyleSheet, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native'
import { withNavigation } from 'react-navigation'
import * as yup from 'yup'
import { Formik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../assets/colors'
import Modal from "react-native-modal";
import { Toast, Button,Spinner } from 'native-base'
import LoadingLottie from '../components/BurgerLoadingLottie'
import SuccessLottie from '../components/SuccessLottie'
import FailureLottie from '../components/FailureLottie'
import { end_point } from '../assets/config'
//import { MaterialIcons } from '@expo/vector-icons'

const AddButton = props => {

    const [modalVisible, setModalVisible] = React.useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.Auth.user)
    const token = useSelector(state => state.Auth.token)
    const [loading,setLoading] = React.useState(false)
    const [APIcalled,setAPIcalled] = React.useState(false)
    const [success,setSuccess] = React.useState(false)
    //const [state, setState] = React.useState({})

    const handleAddDeal = values => {
        console.log('addding deal ---------> ',values)//values.dealName,values.dealDescription,values.dealPrice
        setModalVisible(true)
        setAPIcalled(true)
        setLoading(true)
        setTimeout(()=>{
            // setSuccess(true)
            setLoading(false)
        },2000)
        
        try {
            fetch(end_point + '/api/restaurant/add-new-deal/'+user._id, {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
              },
              body: JSON.stringify(values)
            }).then(response => response.json()).then(response => {
              console.log(`response ------------> `, response)
              setLoading(false)
              if (response.error === true) {
                console.log('here')
                Toast.show({
                  text: response.message ? response.message : 'Something went wrong!',
                  type: "danger",
                })
            } else {
                Toast.show({
                    text: response.message ? response.message : 'Deal Added Successfully!',
                    //type: "danger",
                })
                setSuccess(true)
                dispatch({ type: 'UPDATE_USER_DETAILS', payload: response.Restaurant })
              }
            }).catch(() => {
                setLoading(false)
              Toast.show({
                text: 'Something went wrong!',
                type: "danger"
              })
            })
          } catch (error) {
            console.log(`error ------------> `, error)
            setLoading(false)
            Toast.show({
              text: 'Something went wrong!',
              type: "danger"
            })
          }
    }

    const handleModalClose = () => {
        setModalVisible(false)
        setLoading(false)
        setSuccess(false)
        setAPIcalled(false)
    }

    return (
        <>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={{ padding: 10 }}>
                    {
                        Platform.OS === 'android' ?
                            <MaterialIcons name="add" style={{ fontSize: 26, color: '#fff' }} />
                            : <Ionicons name="ios-add" style={{ fontSize: 26, color: Colors.yellow_shade }} />
                    }
                </View>
            </TouchableOpacity>

            <Modal
                isVisible={modalVisible}
                animationOut={'zoomOut'}
                animationIn={'zoomIn'}
            // onSwipeComplete={() => setModalVisible(false)}
            // swipeDirection={['down']}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={80}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20 }} onPress={handleModalClose}>
                                <MaterialIcons color={'#C2C2C2'} name='cancel' size={28} />
                            </TouchableOpacity>

                            <Text style={styles.modalHeading}>Add Deal</Text>
                            <View style={{ width: '100%', marginTop: 20 }}>
                                {
                                    APIcalled === true?
                                        <View style={{height:200,marginTop:20}}>
                                            {
                                                loading===true?
                                                <LoadingLottie/>
                                                :
                                                success===true?
                                                <SuccessLottie successText={`Deal Added!`}/>
                                                :
                                                <FailureLottie height={200} text={`Something went wrong!`}/>
                                            }
                                        </View>
                                    :
                                    <Formik
                                    initialValues={{ dealName: '', dealDescription: '', dealPrice: '' }}
                                    onSubmit={values => handleAddDeal(values)}
                                    validationSchema={yup.object().shape({
                                        dealName: yup
                                            .string()
                                            .required('Enter Deal Name!'),
                                        dealDescription: yup
                                            .string()
                                            .min(3)
                                            .max(200, 'cannot exceed 200 characters')
                                            .required('Enter Deal Description!!'),
                                        dealPrice: yup
                                            .number()
                                            .required('Enter Deal Price!'),
                                    })}
                                >
                                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                                        <React.Fragment>
                                            <Text style={styles.textFieldLabel}>Deal Name</Text>
                                            <TextInput
                                                value={values.dealName}
                                                onChangeText={handleChange('dealName')}
                                                //placeholderTextColor={'red'}
                                                keyboardType='default'
                                                onBlur={() => setFieldTouched('dealName')}
                                                //placeholder="E-mail"
                                                style={styles.textInput}
                                            />
                                            {touched.dealName && errors.dealName &&
                                                <Text style={{ fontSize: 10, color: 'red', width: '100%' }}>{errors.dealName}</Text>
                                            }
                                            <Text style={styles.textFieldLabel}>Deal Description</Text>
                                            <TextInput
                                                value={values.dealDescription}
                                                onChangeText={handleChange('dealDescription')}
                                                //placeholderTextColor={'red'}
                                                multiline
                                                keyboardType='default'
                                                onBlur={() => setFieldTouched('dealDescription')}
                                                //placeholder="E-mail"
                                                style={{ ...styles.textInput, height: 70 }}
                                            />
                                            {touched.dealDescription && errors.dealDescription &&
                                                <Text style={{ fontSize: 10, color: 'red', width: '100%' }}>{errors.dealDescription}</Text>
                                            }
                                            <Text style={styles.textFieldLabel}>Deal Price</Text>
                                            <TextInput
                                                value={values.dealPrice}
                                                onChangeText={handleChange('dealPrice')}
                                                //placeholderTextColor={'red'}
                                                keyboardType='numeric'
                                                onBlur={() => setFieldTouched('dealPrice')}
                                                //placeholder="E-mail"
                                                style={styles.textInput}
                                            />
                                            {touched.dealPrice && errors.dealPrice &&
                                                <Text style={{ fontSize: 10, color: 'red', width: '100%' }}>{errors.dealPrice}</Text>
                                            }
                                            <Button
                                                style={styles.button}
                                                disabled={loading === true ? true : false}
                                                //onPress={handleSignIn}
                                                onPress={handleSubmit}
                                            >
                                                {
                                                    loading === true ?
                                                        <Spinner color={'white'} size={15} />
                                                        :
                                                        <Text style={{ color: Colors.black_shade }}>Add Deal</Text>
                                                }
                                            </Button>
                                        </React.Fragment>
                                    )}
                                </Formik>
                                }
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>

            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    modalView: { backgroundColor: '#fff', borderRadius: 5, padding: 30, alignItems: 'center',minHeight:300 },
    modalHeading: { fontSize: 25, color: Colors.yellow_shade, fontFamily: 'open-sans-bold' },
    textFieldLabel: { padding: 0, color: '#212121', fontFamily: 'open-sans-bold',marginTop:10 },
    textField: { borderColor: Colors.grey_shade, height: 40, borderRadius: 5, marginBottom: 10 },
    textInput: { borderColor: '#BDBDBD',borderWidth: 1,borderRadius: 5,marginVertical: 3,height: 45,color: 'black',paddingLeft:10,width: '100%'},
    button:{width: '100%', justifyContent:'center',marginBottom:20,backgroundColor: Colors.red_shade, marginVertical: 10 }
})

export default withNavigation(AddButton)
