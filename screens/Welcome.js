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
                <Text style={styles.infoText}>Lorem ipsum dolore set ameit lorem ipsum dolore set ameit lorem ipsum dolore set ameit</Text>
            </View>
        </View>
        <Button style={{...styles.button,backgroundColor:Colors.red_shade}} onPress={()=>{
            console.log(props.navigation)
            props.navigation.navigate('SignIn')
        }}>
            <Text style={{color:'black'}}>Sign In</Text>
        </Button>
        <Button style={{...styles.button,backgroundColor:'black'}} onPress={()=>{
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
        height:'100%',
        width:'100%',
        flex:1
    },
    imageContainer:{
        paddingLeft:30,
        paddingRight:30,
        paddingTop:30,
        paddingBottom:10,
        width:'100%',
        height:250
    },
    welcomeInfoContainer:{
        
    },
    welcomeText:{
        fontSize:25,
        fontWeight:'700',
        color:Colors.grey_shade,
        marginVertical:10,
        fontFamily:'open-sans-bold'
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