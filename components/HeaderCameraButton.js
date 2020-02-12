import React from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { View, Toast, Text, Button } from 'native-base'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../assets/colors'
import Modal from "react-native-modal";
import { useSelector } from 'react-redux'
import colors from '../assets/colors'
import Lottie from '../components/Lottie'

const HeaderCameraButton = props => {

    const [isVisible, setIsVisible] = React.useState(false)
    let user = useSelector(state => state.Auth.user)

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };

    return (
        <TouchableOpacity onPress={toggleModal}>
            <View style={{ padding: 10 }}>
                <Ionicons name="md-star-outline" style={{ fontSize: 23, color: Platform.OS === 'android' ? '#fff' : Colors.red_shade }} />
                    <Modal isVisible={isVisible} animationIn={'slideInLeft'}
                    animationOut={'slideOutRight'} style={{flex:1}}>
                    <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', height: 250,borderRadius:5 }}>
                        <Text>
                            <MaterialCommunityIcons name="star-face" size={50} color={colors.red_shade}/>
                        </Text>
                        {/* <Lottie/> */}
                        <Text style={{fontSize:35,fontWeight:'700',color:Colors.blue_shade}}>{user.points?`${user.points} Points`:`Points not loaded`}</Text>
                        <Button onPress={toggleModal} style={{ marginTop: 20,backgroundColor:Colors.red_shade }}>
                            <Text style={{color:'#fff'}}>
                                Great
                            </Text>
                        </Button>
                    </View>
                </Modal>
            </View>
        </TouchableOpacity>

    )
}

export default HeaderCameraButton