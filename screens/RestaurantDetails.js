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
import DealItem from '../components/DealItem'
import FoodItem from '../components/FoodItem'

const RestaurantDetails = props => {
    console.log('props in details: ',props)
   

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'#fff'}}>

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
                    <Tab style={{paddingBottom:30,paddingTop:6}} heading={<TabHeading><Text style={{color:colors.yellow_shade}}>Deals</Text></TabHeading>}>
                        {
                            props.navigation.state.params.restaurant.deals.length === 0?
                            <View style={{padding:20,alignItems:'center'}}>
                                <Text style={{color:'#c6c6c6'}}>No deals found!</Text>
                            </View>
                            :null
                        }
                        {
                            props.navigation.state.params.restaurant.deals.map(d => <DealItem key={d._id} name={d.dealName} description={d.dealDescription} price={d.dealPrice}/>)
                        }
                            {/* <DealItem name="PSL Deal" description="2 Large Pizzas, 2 sides, 1.5 Litre Cold Drink" price={2250}/>
                            <DealItem name="Whacky Wednesday" description="Buy 2 Medium Pizzas and Get 2 Medium Pizzas free, 1.5 Litre Cold Drink" price={1250}/>
                            <DealItem name="Premium Share box" description="2 Chicken Big Macs, 2 McChickens, 2 Regular Fries, 1.5 Litre Cold Drink" price={2250}/> */}
                            {/* <DealItem name="Whacky Wednesday" description="Buy 2 Medium Pizzas and Get 2 Medium Pizzas free, 1.5 Litre Cold Drink" price={1250}/> */}
                        {/* <ScrollView style={{paddingBottom:30,paddingTop:3}}>
                        </ScrollView> */}
                    </Tab>
                    <Tab heading={<TabHeading><Text style={{color:colors.yellow_shade}}>Food Items</Text></TabHeading>}>
                    <ScrollView style={{paddingTop:4}}>
                        <FoodItem name={'Chicken Big Mac'} likes={51} dislikes={3} />
                        <FoodItem name={'Chicken McCrispy'} likes={40} dislikes={5} />
                        <FoodItem name={'Chicken Fillet-o-Fish'} likes={20} dislikes={1} />
                        <FoodItem name={'McFlurry Oreo'} likes={10} dislikes={6} />
                        <FoodItem name={'Spicy McCrispy'} likes={8} dislikes={9} />
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