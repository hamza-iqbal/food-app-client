import React from 'react'
import { MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons'
import { Platform,View,TouchableOpacity, Alert } from 'react-native'
import { withNavigation } from 'react-navigation'
import Colors from '../assets/colors'

const EditButton = props => {
    return (
        <TouchableOpacity onPress={()=>props.navigation.navigate('EditProfile')}>
            <View style={{padding:10}}>
            {
                Platform.OS === 'android'?
                <MaterialIcons name="edit" style={{ fontSize:26, color: '#fff' }} />
                :<MaterialCommunityIcons name="circle-edit-outline" style={{ fontSize:26, color: Colors.red_shade }}/>
            }
            </View>
        </TouchableOpacity>
    );
}

export default withNavigation(EditButton)