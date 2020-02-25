import React from 'react'
import { StyleSheet, Image, ScrollView,Alert } from 'react-native'
import { View, Text ,TabHeading,Tab,Tabs} from 'native-base'
// import McDonalds from '../assets/images/mcdonalds.jpg'
// import Butlers from '../assets/images/butlers.jpg'
// import Pizza from '../assets/images/pizza.jpg'
// import Jade from '../assets/images/jade.jpg'
import { image_end_point } from '../assets/config'
import colors from '../assets/colors'
import {  AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'


const RestaurantDetails = props => {
    console.log('props in details: ',props)
   

    return (
        <ScrollView style={{backgroundColor:'#fff'}}>

                <View style={styles.imageContainer}>
                    <Image source={{uri:image_end_point+props.navigation.state.params.restaurant.profile_picture}} style={styles.image} />
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{props.navigation.state.params.restaurant.name}</Text>
                </View>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('Scan')} style={styles.iconButton}>
                        <View style={{alignItems:'center'}}>
                            <AntDesign name='scan1' style={styles.scanIcon} size={30}/>
                            <Text style={{marginTop:5,fontFamily:'open-sans'}}>Get Points</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('Redeem')} style={styles.iconButton}>
                        <View style={{alignItems:'center'}}>
                            <AntDesign name='shoppingcart' style={styles.scanIcon} size={30}/>
                            <Text style={{marginTop:5,fontFamily:'open-sans'}}>Redeem Points</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: '#f6f6f6'}}>
                <Tabs tabBarUnderlineStyle={{ backgroundColor: colors.yellow_shade }} style={{ backgroundColor: '#fff' }}>
                    <Tab heading={<TabHeading><Text style={{color:colors.yellow_shade}}>Deals</Text></TabHeading>}>
                        <ScrollView>
                            <Text>12345</Text>
                        </ScrollView>
                    </Tab>
                    <Tab heading={<TabHeading><Text style={{color:colors.yellow_shade}}>Food Items</Text></TabHeading>}>
                    <ScrollView>
                        <Text>67890</Text>
                    </ScrollView>
                    </Tab>
                </Tabs>              
                </View>
                {/* <Text style={styles.detail}>Scan Now To Win {props.navigation.state.params.restaurant.pointsToGive} Points</Text> */}
                {/* <Button style={styles.scanButton} onPress={() => props.navigation.navigate('Scan')}>
                    <AntDesign name="qrcode" color="#fff" size={67}/>
                </Button> */}
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
    nameContainer:{
        backgroundColor:colors.yellow_shade,
        width:'100%',
        alignItems:'center',
    },
    name:{
        marginVertical:10,
        fontWeight:'600',
        fontSize:25,
        fontFamily:'open-sans-bold',
        color:'#fff'
    },
    iconButton:{
        marginHorizontal:15,
        padding:5
    },
    optionsContainer:{
        backgroundColor:'#fff',
        padding:20,
        flexDirection:'row',
        justifyContent:'center'
    },
    scanIcon:{
        color:'#212121'
    }
    // scanButton:{
    //     backgroundColor:colors.red_shade,
    //     height:80,
    //     width:80,
    //     marginTop:20,
    //     justifyContent:'center',
    //     alignItems:'center',
    //     display:'flex',
    //     //padding:
    // }
})

export default RestaurantDetails