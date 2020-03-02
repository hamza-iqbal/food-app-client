import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import colors from '../assets/colors'
const FoodItem = props => {

    return(
        <View style={styles.main}>
            <Text style={styles.name}>{props.name}</Text>
            <View style={styles.buttonsContainer}>
                <View style={styles.button}><AntDesign size={20} name='like1' /><Text>{props.likes}.k</Text></View>
                <View style={styles.button}><AntDesign size={20} name='dislike1' /><Text>{props.dislikes}</Text></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:'#f6f6f6',
        marginVertical:5,padding:15,
        flexDirection:'row',justifyContent:'space-between',alignItems:'center'
    },
    name:{
        fontSize:18,
        fontFamily:'open-sans-bold',
        color:colors.yellow_shade
    },
    buttonsContainer:{
        flexDirection:'row'
    },
    button:{
        marginHorizontal:5
    }

})

export default FoodItem