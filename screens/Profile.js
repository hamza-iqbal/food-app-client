import React from 'react'
import { View, Text, StyleSheet,ScrollView,Image } from 'react-native'
import Avatar from '../assets/images/avatar.png'
import { useSelector } from 'react-redux'
import { List,ListItem,Left,Right } from 'native-base'
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
                <View style={{alignItems:'center',marginBottom:30}}>
                    <MaterialCommunityIcons name="star-face" style={{color:Colors.red_shade,fontSize:50,marginTop:20}}/>
                    <Text style={{fontSize:30,fontFamily:'open-sans-bold',color:Colors.blue_shade}}>{user.points} Points</Text>
                </View>
                {
                    user.role === 'admin'?
                    <Text style={styles.role}>ADMIN</Text>
                    :null
                }
                <List style={{width:'100%'}}>
                    <ListItem noIndent style={{ backgroundColor: "#f6f6f6",width:'100%' ,display:'flex',justifyContent:'space-between',flexDirection:'row' }}>
                        <View><Text>First Name</Text></View>
                        <View><Text>{user.firstName}</Text></View>
                    </ListItem>
                    <ListItem noIndent style={{ backgroundColor: "#f6f6f6",width:'100%' ,display:'flex',justifyContent:'space-between',flexDirection:'row' }}>
                        <View><Text>Last Name</Text></View>
                        <View><Text>{user.lastName}</Text></View>
                    </ListItem>
                    <ListItem noIndent style={{ backgroundColor: "#f6f6f6",width:'100%',display:'flex',justifyContent:'space-between',flexDirection:'row' }}>
                        <View><Text>Contact</Text></View>
                        <View><Text>{user.contact}</Text></View>
                    </ListItem>
                    <ListItem noIndent style={{ backgroundColor: "#f6f6f6",width:'100%',display:'flex',justifyContent:'space-between',flexDirection:'row' }}>
                        <View><Text>Email</Text></View>
                        <View><Text>{user.email}</Text></View>
                    </ListItem>
                    <ListItem noIndent style={{ backgroundColor: "#f6f6f6",width:'100%',display:'flex',justifyContent:'space-between',flexDirection:'row' }}>
                        <View><Text>City</Text></View>
                        <View><Text>Lahore</Text></View>
                    </ListItem>
                </List>
                {/* <Text style={styles.email}>{user.email}</Text> */}
                {/* <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{...styles.name,color:Colors.grey_shade}}>First Name</Text>
                    <Text style={{...styles.name,fontFamily:'open-sans-bold'}}>{user.firstName}</Text>
                </View> */}
                
                
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        paddingLeft:20,
        paddingRight:20
    },
    name:{
        color:Colors.black_shade,
        fontSize:20,
        //fontWeight:'700'
    },
    email:{
        fontFamily:'open-sans',
        color:Colors.grey_shade,
        marginBottom:30
    },
    role:{
        marginVertical:20,
        color:Colors.red_shade,
        // fontSize:20,
        // fontWeight:'800'
    }
})

export default Profile