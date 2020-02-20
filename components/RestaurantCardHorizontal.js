import React from 'react'
import { StyleSheet, Image, TouchableOpacity,TouchableNativeFeedback, Platform } from 'react-native'
import { Text, View, Button } from 'native-base'
// import PizzaImage from '../assets/images/pizza.jpg'
import Colors from '../assets/colors'
import { AntDesign } from '@expo/vector-icons';
//import Modal from "react-native-modal";
import { withNavigation } from 'react-navigation';
import { image_end_point } from '../assets/config'
// import QRCode from 'react-native-qrcode-svg';

const RestaurantCard = props => {

    //const [modalVisible, setModalVisible] = React.useState(false)
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <TouchableCmp style={{ ...styles.touchable, width: '100%' }} onPress={() => props.navigation.navigate('RestaurantDetails', {
            restaurant: props.restaurant
        })}>
            <View style={styles.boxMain}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: image_end_point + props.restaurant.profile_picture }} style={styles.image} />
                </View>
                <View style={{flexDirection:'row',padding:10}}>
                    <View style={{...styles.infoContent,width:150}}>
                        <Text style={styles.restaurantTitle}>{props.restaurant.name}</Text>
                        <Text style={styles.restaurantDescription}>{props.restaurant.tags||'fast food, pizza'}</Text>
                        <Text style={styles.restaurantTimings}>11:00 AM - 9:00 PM</Text>
                        <Text style={{fontSize:12,color:Colors.grey_shade,marginTop:7}}><AntDesign name="star" size={15} color={Colors.red_shade} />&nbsp;&nbsp;{`4.9 (123)`}</Text>
                    </View>
                    {/* <View style={{marginTop:10}}>
                        
                    </View> */}
                </View>
            </View>
        </TouchableCmp>
    )
}

const styles = StyleSheet.create({
    boxMain: {
        backgroundColor: '#fff',
        marginVertical: 5,
        flexDirection:'row',
        width: '100%',
        borderRadius: 5,
        overflow: 'hidden',
        elevation: 5
    },
    image: {
        height: '100%',
        width: '100%'
    }
    , imageContainer: {
        textAlign: 'center',
        height: 130,
        width:140,
    },
    infoContent: {
        //padding: 10
        paddingHorizontal:10,
        justifyContent:'space-between'
    },
    restaurantTitle: {
        fontSize: 20,
        fontWeight: '300',
        color: Colors.red_shade,
        fontFamily: 'open-sans-bold'
    },
    restaurantDescription: {
        fontSize: 15,
        fontFamily: 'open-sans',
        color: Colors.black_shade
    },
    restaurantTimings: {
        fontSize: 15,
        marginVertical:3,
        fontFamily: 'open-sans',
        // fontWeight:'bold',
        color: '#A5A3A3'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10
    },
    touchable: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        overflow:
            Platform.OS === 'android' && Platform.Version >= 21
                ? 'hidden'
                : 'visible',
        elevation: 5
    }
})

export default withNavigation(RestaurantCard)