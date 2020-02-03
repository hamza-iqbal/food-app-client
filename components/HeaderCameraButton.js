import React from 'react'
import { Platform,TouchableOpacity } from 'react-native'
import { View,Toast } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../assets/colors'

const HeaderCameraButton = props => {

    return(
        <TouchableOpacity onPress={()=>Toast.show({text:'Camera will be opened on this click!'})}>
            <View style={{padding:10}}>
                <Ionicons name="md-qr-scanner" style={{ fontSize: 23, color: Platform.OS==='android'?'#fff':Colors.red_shade }} />
            </View>
        </TouchableOpacity>
            
    )
}

export default HeaderCameraButton