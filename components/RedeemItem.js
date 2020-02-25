import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../assets/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import moment from 'moment'


const RedeemItem = props => {

    return(
        <View style={styles.main}>
            <View style={styles.left}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.date}>{moment().format('DD-MM-YYYY HH:mm')}</Text>
                <Text style={styles.points}>Spent {props.points} Points</Text>
            </View>
            <View style={styles.right}>
                <MaterialCommunityIcons name="coin" size={100} color={colors.red_shade}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:'#fff',
        height:150,
        width:'100%',
        padding:25,
        borderWidth:1,
        borderColor:'#fff',
        // marginHorizontal:5,
        marginVertical:5,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    name:{
        color: colors.blue_shade,
        fontWeight:'700',
        fontSize:23
    },
    date:{
        color: 'rgba(144,164,174 ,1)',
        fontWeight:'500',
        fontSize:15,marginVertical:10
    },
    points:{
        color: 'rgba(174,234,0 ,1)',
        fontWeight:'700',
        fontSize:23
    },
    left:{

    },
    right:{

    }
})

export default RedeemItem