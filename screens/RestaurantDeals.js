import React from 'react'
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { Accordion,ActionSheet } from 'native-base'
import colors from '../assets/colors';
import { SafeAreaView } from 'react-navigation';

const dataArray = [
    { title: "Deal 1", content: {dealDescription:"4 GMC burgers, 1 jumbo fries & 1 litre soft drink",price:450} },
    { title: "Deal 2", content: {dealDescription:"2 Large Pizzas, 1 starter & 1.5 litre soft drink",price:550} },
    { title: "Deal 3", content: {dealDescription:"4 Big Macs, 2 regular fries, 6 chicken nuggets & 1.5 litre soft drink",price:650} },
  ];

const RestaurantDeal = props => {

    const _renderContent = item => {
        return (
            <TouchableOpacity onPress={()=>options(item)}>
                <View style={styles.accordionContent}>
                    <Text
                    style={styles.accordionContentDescription}
                    >
                    {item.content.dealDescription}
                    </Text>
                    <Text
                    style={styles.accordionContentPrice}
                    >Price: {item.content.price}</Text>
                </View>
            </TouchableOpacity>

        );
    }

    const options = item => {
        console.log('item',item)
        ActionSheet.show({
            options:['Edit','Delete','Cancel'],
            destructiveButtonIndex:[2]
        },
        buttonIndex => {
          if(buttonIndex===0){
            Alert.alert('Edit The Deal')
          }
          if(buttonIndex===1){
            Alert.alert('Delete the deal')
          }
        })
    }


    return(
        <SafeAreaView style={styles.main}>
            <Accordion 
                dataArray={dataArray} 
                expanded={0}
                style={{borderWidth:0}}
                headerStyle={styles.accordionHeader}
                renderContent={_renderContent}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main:{
        flex:1,padding:20,backgroundColor:'#fff'
    },
    accordionContentPrice:{
        //backgroundColor: "#fff",
        paddingLeft: 20,
        paddingBottom: 20,
        paddingRight: 20,
        fontStyle: "italic",
    },
    accordionContentDescription:{
        //backgroundColor: "#fff",
        padding: 20,
    },
    accordionHeader:{ backgroundColor: colors.yellow_shade,borderColor:'#fff',borderWidth:1,marginVertical:10 },
    accordionContent:{backgroundColor:'#f6f6f6'}
})

export default RestaurantDeal