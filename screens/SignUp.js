import React from 'react'
import { View, StyleSheet, Alert, TextInput } from 'react-native'
import { Container, Header, Button, Content, Item, Input, Text, Icon ,Toast,Spinner} from 'native-base'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import Colors from '../assets/colors'
import { end_point } from '../assets/config'

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
                body: JSON.stringify({ firstName: state.firstName,lastName: state.lastName,email: state.email, password: state.password })
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
            <View style={styles.outerView}>
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
                    style={{ ...styles.button, backgroundColor: Colors.blue_shade }} 
                    onPress={handleSignUp}
                    disabled={loading === true ? true : false}
                >
                    {
                        loading === true ?
                        <Spinner color={Colors.red_shade} size={15} />
                        :
                        <Text style={{ color: '#fff' }}>Sign Up</Text>
                    }
                </Button>

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
    input: {
        width: '100%'
    },
    button: {
        width: '100%', marginVertical: 20, justifyContent: 'center'
    }
})

export default SignUp