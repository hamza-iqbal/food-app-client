import React from 'react'
import { View, StyleSheet, ScrollView,SafeAreaView } from 'react-native'
import { Fab, Toast } from 'native-base'
import RestaurantCard from '../components/RestaurantCard'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../assets/colors'
import { end_point } from '../assets/config'
import { RNCamera } from 'react-native-camera';

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
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'#fff'}}>
      <View style={styles.outerView}>
        {
          restaurants && restaurants.map(r => (<RestaurantCard key={r._id} restaurant={{ title: r.name, tags: 'fast food, pizza' }} image={r.profile_picture} />))
        }
      </View>
    </ScrollView>
    <Fab
      containerStyle={{ bottom: 35, right: 35, height: 60, width: 60 }}
      style={styles.fab}
      position="bottomRight"
      onPress={() => props.navigation.navigate('Scan')
      //   Toast.show({
      //   text: 'This will open Camera for scanning qrcode!',
      //   type: 'warning',
      //   style: { backgroundColor: Colors.blue_shade }
      // })
    }
    >
      <Ionicons name="md-qr-scanner" style={{ fontSize: 20, color: '#fff' }} />
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
    backgroundColor: '#fff'
  },
  fab: {
    backgroundColor: Colors.red_shade,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Home