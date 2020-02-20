import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Platform,View,TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import Colors from '../assets/colors'
import { useDispatch } from 'react-redux'

const LogoutButton = props => {

    const dispatch = useDispatch();

    return (
        <TouchableOpacity onPress={()=>{
            dispatch({ type: 'CLEAR_LOGIN_DETAILS' })
            props.navigation.navigate('AuthLoading')
        }}>
            <View style={{padding:10}}>
            {
                Platform.OS === 'android'?
                <AntDesign name="logout" style={{ fontSize:23, color: '#fff' }} />
                :
                <AntDesign name="logout" style={{ fontSize:23, color: Colors.red_shade }} />
            }
            </View>
        </TouchableOpacity>
    );
}

export default withNavigation(LogoutButton)
