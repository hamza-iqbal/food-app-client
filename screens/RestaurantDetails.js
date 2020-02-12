import React from 'react'
import { StyleSheet, Image, ScrollView } from 'react-native'
import { View, Text, Button } from 'native-base'
// import McDonalds from '../assets/images/mcdonalds.jpg'
// import Butlers from '../assets/images/butlers.jpg'
// import Pizza from '../assets/images/pizza.jpg'
// import Jade from '../assets/images/jade.jpg'
import { image_end_point } from '../assets/config'
import colors from '../assets/colors'
import { AntDesign } from '@expo/vector-icons'


const RestaurantDetails = props => {
    console.log('props in details: ',props)
   

    return (
        <ScrollView style={{backgroundColor:'#fff',flex:1}}>

            <View style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{uri:image_end_point+props.navigation.state.params.restaurant.profile_picture}} style={styles.image} />
                </View>
                <Text style={styles.name}>{props.navigation.state.params.restaurant.name}</Text>
                <Text style={styles.detail}>Scan Now To Win {props.navigation.state.params.restaurant.pointsToGive} Points</Text>
                <Button style={styles.scanButton} onPress={() => props.navigation.navigate('Scan')}>
                    <AntDesign name="qrcode" color="#fff" size={67}/>
                </Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff'
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
    name:{
        marginVertical:10,
        fontWeight:'600',
        fontSize:25,
        fontFamily:'open-sans-bold',
        color:colors.blue_shade
    },
    detail:{
        fontSize:18,
        fontWeight:'bold',
        color:'grey',
        marginVertical:5
        //font
    },
    scanButton:{
        backgroundColor:colors.red_shade,
        height:80,
        width:80,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
        //padding:
    }
})

export default RestaurantDetails