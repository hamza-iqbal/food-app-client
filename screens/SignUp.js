import React from 'react'
import { View, StyleSheet, ScrollView,Image,KeyboardAvoidingView } from 'react-native'
import { Button, Item, Input, Text, Toast,Spinner} from 'native-base'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import Colors from '../assets/colors'
import { end_point } from '../assets/config'
import Logo from '../assets/images/logo.png'


const SignUp = props => {

    const [state, setState] = React.useState({ email: '', firstName: '',lastName:'', password: '', rePassword: '' })
    const [loading, setLoading] = React.useState(false)

    const handleSignUp = () => {

        setLoading(true)
        try {
            fetch(end_point + '/api/user/add', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName: state.firstName,lastName: state.lastName,email: state.email, password: state.password,verified:false,role:'user' })
            }).then(response => response.json()).then(response => {
                console.log(`response ------------> `, response)
                setLoading(false)
                if (response.error === true) {
                    console.log('here')
                    Toast.show({
                        text: response.message ? response.message : 'Something went wrong!',
                        type: "danger"
                    })
                } else {
                    props.navigation.navigate('SignIn')
                    Toast.show({
                        text:response.message,
                        type:'success'
                    })
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

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{ flex: 1,backgroundColor:'#fff', flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
            <ScrollView style={{flex:1,backgroundColor:'#fff'}} showsVerticalScrollIndicator={false}>
            <View style={styles.outerView}>
            <View style={styles.imageContainer}>
            <Image source={Logo} style={styles.thumbnail} />
          </View>
                <View>
                    <Item block style={{ ...styles.input }}>
                        <Input placeholder='First Name' onChange={event => setState({ ...state, firstName: event.nativeEvent.text })} value={state.firstName} keyboardType="email-address" />
                    </Item>
                </View>
                <View>
                    <Item block style={{ ...styles.input }}>
                        <Input placeholder='Last Name' onChange={event => setState({ ...state, lastName: event.nativeEvent.text })} value={state.lastName} keyboardType="email-address" />
                    </Item>
                </View>
                <View>
                    <Item block style={{ ...styles.input }}>
                        <Input placeholder='Email' onChange={event => setState({ ...state, email: event.nativeEvent.text })} value={state.email} keyboardType="email-address" />
                    </Item>
                </View>
                <View>
                    <Item block style={styles.input}>
                        <Input placeholder='Password' secureTextEntry={true} value={state.password} onChange={event => setState({ ...state, password: event.nativeEvent.text })} keyboardType="email-address" />
                    </Item>
                </View>
                <View>
                    <Item block style={styles.input}>
                        <Input placeholder='Confirm Password' secureTextEntry={true} value={state.rePasswordpassword} onChange={event => setState({ ...state, rePassword: event.nativeEvent.text })} keyboardType="email-address" />
                    </Item>
                </View>
                <Button 
                    style={{ ...styles.button, backgroundColor: Colors.red_shade }} 
                    onPress={handleSignUp}
                    disabled={loading === true ? true : false}
                >
                    {
                        loading === true ?
                        <Spinner color={'black'} size={15} />
                        :
                        <Text style={{ color: Colors.black_shade }}>Sign Up</Text>
                    }
                </Button>

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
    input: {
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
        paddingBottom: 10,
        width: '100%',
        height: 250
      },
})

export default SignUp