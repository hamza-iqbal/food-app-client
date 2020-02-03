import React from 'react'
import { StyleSheet, Image, ScrollView } from 'react-native'
import { View, Text } from 'native-base'
// import McDonalds from '../assets/images/mcdonalds.jpg'
// import Butlers from '../assets/images/butlers.jpg'
// import Pizza from '../assets/images/pizza.jpg'
// import Jade from '../assets/images/jade.jpg'
import { image_end_point } from '../assets/config'


const RestaurantDetails = props => {
   

    return (
        <ScrollView>

            <View style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{uri:image_end_point+props.navigation.state.params.image}} style={styles.image} />
                    {/* <Image source={McDonalds} style={styles.image} /> */}
                    {/* <Text>{props.navigation.state.params.restaurant.title} Details</Text> */}
                </View>
                <Text>{props.navigation.state.params.restaurant.title} Details</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        //    textAlign: 'center',
        height: '100%',
        width: '100%'
    }
    , imageContainer: {
        textAlign: 'center',
        height: 180,
        width:'100%',
    },
})

export default RestaurantDetails