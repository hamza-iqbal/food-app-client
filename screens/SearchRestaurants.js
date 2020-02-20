import React from 'react';
import { View, Text, ScrollView,Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Item, Input } from 'native-base';
import { Feather, AntDesign } from '@expo/vector-icons'
import colors from '../assets/colors';
import { useSelector } from 'react-redux'
import RestaurantCard from '../components/RestaurantCard'
import LottieView from "lottie-react-native";
import animationData from "../assets/lottie/empty_list.json";


const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const SearchRestaurants = props => {

    let animationRef = React.useRef()
    const [searchText, setSearchText] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const restaurants = useSelector(state => state.User.restaurants)


    React.useEffect(()=>{
        animationRef.play()
    },[])



    return (
        <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
            <View style={{ paddingTop: 15, paddingBottom: 15, paddingLeft: 10, paddingRight: 10, position: 'relative', top: 5 }}>
                <Item regular style={{ borderColor: 'grey', height: 40, borderRadius: 5 }}>
                    <Input autoFocus placeholder="search" onChange={event => setSearchText(event.nativeEvent.text)} value={searchText} />
                    {
                        searchText === '' ?
                            null :
                            <TouchableOpacity onPress={() => setSearchText('')}><Feather name="x" size={20} color={colors.red_shade} style={{ marginRight: 5 }} /></TouchableOpacity>
                    }
                    <TouchableOpacity onPress={() => { Alert.alert('you clicked search') }}><AntDesign name="search1" size={20} color={colors.red_shade} style={{ marginRight: 15 }} /></TouchableOpacity>
                </Item>
                {
                    searchText === ''?
                    <View style={{alignItems:'center',padding:20}}>
                        <LottieView
                            ref={animation => {
                                animationRef = animation;
                            }}
                            style={{
                                width: 200,
                                height: 200,
                                backgroundColor: '#fafafa',
                            }}
                            source={require('../assets/lottie/empty_list.json')}
                            // OR find more Lottie files @ https://lottiefiles.com/featured
                            // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                        />
                        <View style={{alignItems:'center',padding:20,flex:1,height:200,width:'100%'}}>
          <LottieView options={defaultOptions} height={400} width={400} />
        </View>
                        <Text style={{color:'#212121'}}></Text>
                    </View>
                    :
                    <View style={{paddingVertical:10}}>
                        <View style={{alignItems:'center',paddingVertical:14}}>
                            <Text style={{color:colors.black_shade,fontWeight:'700',fontSize:30}}>Search Results</Text>
                        </View>
                        {
                            restaurants && restaurants.map(r => (<RestaurantCard key={r._id} restaurant={r} />))
                        }
                    </View>
                }
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,backgroundColor:'#FAFAFA'
    }
})

export default SearchRestaurants