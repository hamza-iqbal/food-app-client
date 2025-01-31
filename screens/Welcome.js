import React from 'react'
import { StyleSheet,Image } from 'react-native'
import { View, Button,Text,Thumbnail } from 'native-base'
import Colors from '../assets/colors'
import Logo from '../assets/images/logo.png'
//import { useSelector } from 'react-redux'


const Welcome = props => {

    // const user = useSelector(state => state.Auth.valid)

    // React.useEffect(()=>{
    //     console.log('a',user)
    // },[])


    return(<View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
            <Image source={Logo} style={styles.thumbnail} />
        </View>
        <View style={{padding:20}}>
            <View style={{alignItems:'center'}}>
                <Text style={styles.welcomeText}>WELCOME</Text>
            </View>
            <View style={{alignItems:'center'}}>
                <Text style={styles.infoText}>We will add some crazy line here. I haven't thought of any tho :P</Text>
            </View>
        </View>
        <Button style={{...styles.button,backgroundColor:Colors.blue_shade}} onPress={()=>{
            console.log(props.navigation)
            props.navigation.navigate('SignIn')
        }}>
            <Text>Sign In</Text>
        </Button>
        <Button style={{...styles.button,backgroundColor:Colors.red_shade}} onPress={()=>{
            console.log(props.navigation)
            props.navigation.navigate('SignUp')
        }}>
            <Text>Sign Up</Text>
        </Button>
    </View>)
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:15,
        backgroundColor:'#fff'
    },
    button:{
        width:'100%',
        marginVertical:5,
        justifyContent:'center'
    },
    thumbnail:{
        height:undefined,
        width:undefined,
        flex:1
    },
    imageContainer:{
        padding:0,
        width:'100%',
        height:300
    },
    welcomeInfoContainer:{
        
    },
    welcomeText:{
        fontSize:25,
        fontWeight:'700',
        color:Colors.grey_shade,
        marginVertical:10
    },
    infoText:{
        fontSize:15,
        fontWeight:'400',
        color:Colors.grey_shade,
        textAlign:'center',
        marginVertical:10,
        marginBottom:50
    }
})

export default Welcome