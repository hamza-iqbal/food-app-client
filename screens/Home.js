import React from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import { Fab, Toast } from 'native-base'
import RestaurantCard from '../components/RestaurantCard'
import RestaurantCardSquare from '../components/RestaurantCardSquare'
import RestaurantCardHorizontal from '../components/RestaurantCardHorizontal'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../assets/colors'
import { end_point } from '../assets/config'
//import { RNCamera } from 'react-native-camera';
import CategoryHorizontalItem from '../components/CategoriesHorizontalItem'
//import { TouchableOpacity } from 'react-native-gesture-handler'

const categories = [{name:'Chinese',id:1},{name:'Pizza',id:2},{name:'Burgers',id:3},{name:'Arabian',id:4},{name:'Turkish',id:5}]

const Home = props => {
  const user = useSelector(state => state.Auth.user)
  const token = useSelector(state => state.Auth.token)
  const restaurants = useSelector(state => state.User.restaurants)
  const [loading, setLoading] = React.useState(false)
  //const [restaurants,setRestaurants] = React.useState([])

  React.useEffect(() => {
    console.log('user', user)
    console.log('token', token)
    console.log('rest', restaurants)
  }, [user, token])

  const dispatch = useDispatch()

  React.useEffect(() => {
    setLoading(true)
    try {
      fetch(end_point + '/api/restaurant/list', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(response => response.json()).then(response => {
        console.log(`response ------------> `, response)
        setLoading(false)
        if (response.error === true) {
          console.log('here')
          Toast.show({
            text: response.message ? response.message : 'Something went wrong!',
            type: "danger"
          })
        } else {
          dispatch({ type: 'SAVE_RESTAURANTS', payload: response.Restaurants })
        }
      }).catch(() => {
        setLoading(false)
        Toast.show({
          text: 'Something went wrong!',
          type: "danger"
        })
      })
    } catch (error) {
      setLoading(false)
      console.log(`error ------------> `, error)
      Toast.show({
        text: 'Something went wrong!',
        type: "danger"
      })
    }
  }, [])
  return (<>
  {/* <SafeAreaView style={{flex:1}}> */}
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'#FAFAFA'}}>
      <Text style={{padding:10,fontSize: 18,fontWeight:'600',color:Colors.black_shade}}>Categories</Text>
      <ScrollView horizontal={true} style={styles.categoriesContainer} showsHorizontalScrollIndicator={false}>
        {
          categories.map(c => <CategoryHorizontalItem key={c.id} data={c}/>)
        }
      </ScrollView>
      <Text style={{padding:10,fontSize: 18,fontWeight:'600',color:Colors.black_shade}}>Featured Restaurants</Text>
      <ScrollView style={{padding: 4,backgroundColor: '#FAFAFA'}} showsHorizontalScrollIndicator={false} horizontal={true}>
        {
          restaurants && restaurants.map(r => {
            if(r.featured===true){
              return(<RestaurantCardSquare key={r._id} restaurant={r} />)
            }
          })
        }
      </ScrollView>
      <Text style={{padding:10,fontSize: 18,fontWeight:'600',color:Colors.black_shade}}>All Restaurants</Text>
      <View style={styles.outerView}>
        {
          restaurants && restaurants.map(r => (<RestaurantCardHorizontal key={r._id} restaurant={r} />))
        }
      </View>
    </ScrollView>
    <Fab
      containerStyle={{ bottom: 35, right: 35, height: 60, width: 60 }}
      style={styles.fab}
      position="bottomRight"
      onPress={() => props.navigation.navigate('Scan')}
    >
      <Ionicons name="ios-qr-scanner" style={{ fontSize: 30, color: 'white',marginTop:5 }} />
    </Fab>
    {/* </SafeAreaView> */}
  </>)
}

const styles = StyleSheet.create({
  outerView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    backgroundColor: '#FAFAFA'
  },
  fab: {
    backgroundColor: Colors.red_shade,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer:{
    padding:8,
  }
})

export default Home