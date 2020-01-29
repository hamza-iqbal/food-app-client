import React from 'react'
import { Ionicons,MaterialIcons} from '@expo/vector-icons'
import { Platform,View,TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import Colors from '../assets/colors'

const HeaderMenuButton = props => {
    return (
        <TouchableOpacity onPress={()=>props.navigation.toggleDrawer()}>
            <View style={{padding:10}} onPress>
            {
                Platform.OS === 'android'?
                <MaterialIcons name="menu" style={{ fontSize:23, color: '#fff' }} />
                :<Ionicons name="ios-menu" style={{ fontSize:23, color: Colors.red_shade }}/>
            }
            </View>
        </TouchableOpacity>
    );
}

export default withNavigation(HeaderMenuButton)
