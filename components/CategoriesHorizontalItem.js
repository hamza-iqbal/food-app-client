import React from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import colors from '../assets/colors'

const CategoriesHorizontalItem = props => {

    return(
        <TouchableOpacity>
            <View style={styles.main}>
                <Text style={styles.text}>{props.data.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main:{
        padding:10,
        width:100,
        backgroundColor:colors.red_shade,
        borderRadius:5,
        marginHorizontal:3,
        alignItems:'center'

    },
    text:{
        color:'white'
    }

})

export default CategoriesHorizontalItem