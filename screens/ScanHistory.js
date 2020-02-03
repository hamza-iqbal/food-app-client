import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import {  } from 'native-base'
import ScanItem from '../components/ScanItem'


const ScanHistory = props => {


    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.main}>
            <ScanItem name={`Mcdonalds`} points={30} dateTime={`12 Jan 2020 - 4:30 PM`}/>
            <ScanItem name={`Jade`} points={25} dateTime={`10 Jan 2020 - 6:52 PM`}/>
            <ScanItem name={`Pizza Hut`} points={20} dateTime={`08 Jan 2020 - 2:37 PM`}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        padding:7
    },
    scrollView:{
        backgroundColor:'#fff'
    }
})

export default ScanHistory