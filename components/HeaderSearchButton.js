import React from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { View } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'
import Colors from '../assets/colors'
import { useSelector } from 'react-redux'

const HeaderCameraButton = props => {

    const [isVisible, setIsVisible] = React.useState(false)
    let user = useSelector(state => state.Auth.user)

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };

    return (
        <TouchableOpacity onPress={()=>props.navigation.navigate('SearchRestaurant')}>
            <View style={{ padding: 10 }}>
                <AntDesign name="search1" style={{ fontSize: 23, color: Platform.OS === 'android' ? '#fff' : Colors.red_shade }} />
            </View>
        </TouchableOpacity>

    )
}

export default withNavigation(HeaderCameraButton)