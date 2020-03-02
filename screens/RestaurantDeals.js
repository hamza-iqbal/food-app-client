import React from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { Accordion,ActionSheet } from 'native-base'
import colors from '../assets/colors';
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-navigation';

// const dataArray = [
//     { title: "Deal 1", content: {dealDescription:"4 GMC burgers, 1 jumbo fries & 1 litre soft drink",price:450} },
//     { title: "Deal 2", content: {dealDescription:"2 Large Pizzas, 1 starter & 1.5 litre soft drink",price:550} },
//     { title: "Deal 3", content: {dealDescription:"4 Big Macs, 2 regular fries, 6 chicken nuggets & 1.5 litre soft drink",price:650} },
//   ];

const RestaurantDeal = props => {

    const user = useSelector(state => state.Auth.user)
    const [dataArray,setDataArray] = React.useState([])
    //console.log('user in deals:',user)

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

    const formatDeals = async () => {
        let newArr = await Promise.all(user.deals.map(d => ({title:d.dealName,content:{dealDescription:d.dealDescription,price:d.dealPrice}})))
        setDataArray(newArr)
    }

    React.useEffect(()=>{
        formatDeals()
    },[user])

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
            {
                dataArray.length === 0?
                <View style={{width:'100%',alignItems:'center'}}>
                    <Text>{`No Deals Added!`}</Text>
                    <Text style={{color:'#c6c6c6',marginTop:10}}>{`Add new deal from top right corner Add Button!`}</Text>
                </View>
                :null
            }
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