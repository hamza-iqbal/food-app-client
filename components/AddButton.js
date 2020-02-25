import React from 'react'
import { Ionicons,MaterialIcons} from '@expo/vector-icons'
import { Platform,View,TouchableOpacity, Alert } from 'react-native'
import { withNavigation } from 'react-navigation'
import Colors from '../assets/colors'

const AddButton = props => {
    return (
        <TouchableOpacity onPress={()=>Alert.alert('deal with this!')}>
            <View style={{padding:10}}>
            {
                Platform.OS === 'android'?
                <MaterialIcons name="add" style={{ fontSize:26, color: '#fff' }} />
                :<Ionicons name="ios-add" style={{ fontSize:26, color: Colors.red_shade }}/>
            }
            </View>
        </TouchableOpacity>
    );
}

export default withNavigation(AddButton)
