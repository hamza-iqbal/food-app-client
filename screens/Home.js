import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Fab } from 'native-base'
import RestaurantCard from '../components/RestaurantCard'
//import SignIn from '../screens/SignIn'
//import Welcome from '../screens/Welcome'
import { useSelector,useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import Mcdonalds from '../assets/images/mcdonalds.jpg'
import Jade from '../assets/images/jade.jpg'
import Pizza from '../assets/images/pizza.jpg'
import Colors from '../assets/colors'
import Butlers from '../assets/images/butlers.jpg'
import { end_point } from '../assets/config'


const Home = props => {
    const user = useSelector(state => state.Auth.user)
    const token = useSelector(state => state.Auth.token)
    const restaurants = useSelector(state => state.User.restaurants)
    const [loading,setLoading] = React.useState(false)
    //const [restaurants,setRestaurants] = React.useState([])

    React.useEffect(() => {
        console.log('user', user)
        console.log('token', token)
        console.log('rest', restaurants)
    }, [user,token])

    const dispatch = useDispatch()

    React.useEffect(()=>{
        setLoading(true)
        try {
            fetch(end_point + '/api/restaurant/list', {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
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
                    dispatch({type:'SAVE_RESTAURANTS',payload:response.Restaurants})
                    // props.navigation.navigate('Home')
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
    },[])
    return (<>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.outerView}>
                {
                    restaurants && restaurants.map(r => (<RestaurantCard key={r._id} restaurant={{ title: r.name, tags: 'fast food, pizza' }} image={r.profile_picture} />))
                }
                {/* <RestaurantCard restaurant={{ title: 'Mcdonalds', tags: 'fast food, burgers, desserts' }} image={Mcdonalds} />
                <RestaurantCard restaurant={{ title: 'Butlers', tags: 'cafe, burgers, desserts' }} image={Butlers} />
                <RestaurantCard restaurant={{ title: 'Jade Cafe', tags: 'continental,chinese, desserts' }} image={Jade} /> */}
            </View>
        </ScrollView>
        <Fab
                //active={this.state.active}
                //direction="up"
                containerStyle={{ bottom: 35, right: 35 }}
                style={styles.fab}
                position="bottomRight"
                onPress={() => props.navigation.navigate('Drawer')}>
                <Ionicons name="md-qr-scanner" style={{ fontSize:20, color: '#fff' }} />
            </Fab>
    </>)
}

const styles = StyleSheet.create({
    outerView: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        padding: 10,
//        backgroundColor:'#fff'
    },
    fab:{ 
        backgroundColor: Colors.blue_shade, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
})

export default Home