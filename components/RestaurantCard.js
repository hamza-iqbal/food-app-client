import React from 'react'
import { StyleSheet, Image, TouchableOpacity,Platform } from 'react-native'
import { Text, View, Container, Icon, Button, Fab } from 'native-base'
// import PizzaImage from '../assets/images/pizza.jpg'
import Colors from '../assets/colors'
import { AntDesign } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { withNavigation } from 'react-navigation';
import { image_end_point } from '../assets/config'
// import QRCode from 'react-native-qrcode-svg';

const RestaurantCard = props => {

    const [modalVisible, setModalVisible] = React.useState(false)
    //console.log('propas',props)


    return (
        <TouchableOpacity style={{ width: '100%' }} onPress={()=>props.navigation.navigate('RestaurantDetails',{
            restaurant:props.restaurant,
            image:props.image
        })}>

            <Modal 
                isVisible={modalVisible} 
                style={{ backgroundColor: '#fff' }} 
                onSwipeComplete={()=>setModalVisible(false)}
                swipeDirection={['down']}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{fontSize:20,fontFamily:'open-sans-bold',color:Colors.blue_shade}}>Dine at {props.restaurant.title}</Text>
                    <AntDesign name="qrcode" size={150} />
                    <Button rounded style={{ backgroundColor: Colors.red_shade, width: '80%', justifyContent: 'center' }} onPress={() => setModalVisible(false)}>
                        <Text>Okay</Text>
                    </Button>
                </View>
            </Modal>

            <View style={styles.boxMain}>
                <View style={styles.imageContainer}>
                    <Image source={{uri:image_end_point+props.image}} style={styles.image} />
                </View>
                <View style={styles.infoContent}>
                    <Text style={styles.restaurantTitle}>{props.restaurant.title}</Text>
                    <Text style={styles.restaurantDescription}>{props.restaurant.tags}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    boxMain: {
        backgroundColor: '#fff',
        //margin: 5,
        marginVertical: 5,
        width: '100%',
        borderRadius: 5,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOpacity: 0.86,
        shadowOffset: { width: 4, height: 2 },
        shadowRadius: 10,
    elevation: 5
    },
    image: {
        //    textAlign: 'center',
        height: '100%',
        width: '100%'
    }
    , imageContainer: {
        textAlign: 'center',
        height: 130
    },
    infoContent: {
        padding: 10
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
        color: Colors.grey_shade
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10
    }
})

export default withNavigation(RestaurantCard)