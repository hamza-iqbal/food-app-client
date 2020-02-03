import React from 'react'
import { View, Text, StyleSheet,ScrollView,Image } from 'react-native'
import Avatar from '../assets/images/avatar.png'
import { useSelector } from 'react-redux'
import Colors from '../assets/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'


const Profile = props => {

    let user = useSelector(state => state.Auth.user)
    console.log('user -> ',user)

    return(
        <ScrollView style={{backgroundColor:'#fff',flex:1}}>
            <View style={{alignItems:'center',marginVertical:30}}>
                <View style={{width: 150, height:150,overflow:'hidden' }}>
                    <Image source={Avatar} style={{flex:1 , width: undefined, height: undefined}}/>
                </View>
            </View>
            <View style={styles.body}>
                <Text style={styles.name}>{user.firstName}</Text>
                <Text style={styles.email}>{user.email}</Text>
                {
                    user.role === 'admin'?
                    <Text style={styles.role}>ADMIN</Text>
                    :null
                }
                <View style={{alignItems:'center'}}>
                    <MaterialCommunityIcons name="star-face" style={{color:Colors.red_shade,fontSize:50,marginTop:20}}/>
                    <Text style={{fontSize:30,fontFamily:'open-sans-bold',color:Colors.blue_shade}}>{user.points} Points</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    name:{
        color:Colors.blue_shade,
        fontFamily:'open-sans-bold',
        fontSize:25,
        //fontWeight:'700'
    },
    email:{
        fontFamily:'open-sans',
        color:Colors.grey_shade

    },
    role:{
        marginVertical:20,
        color:Colors.red_shade,
        // fontSize:20,
        // fontWeight:'800'
    }
})

export default Profile