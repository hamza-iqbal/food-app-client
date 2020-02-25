import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Toast, Spinner, Tabs, Tab, TabHeading, Icon } from 'native-base'
import ScanItem from '../components/ScanItem'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../assets/colors';
import { end_point } from '../assets/config'
import RedeemItem from '../components/RedeemItem'

const Rewards = props => {

    const dispatch = useDispatch()

    const [loading, setLoading] = React.useState(false)
    const [rewardsArr, setRewardsArr] = React.useState(null)
    let user = useSelector(state => state.Auth.user)
    let token = useSelector(state => state.Auth.token)


    React.useEffect(() => {
        setLoading(true)
        try {
            console.log(user)
            fetch(end_point + '/api/reward/' + user._id, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => response.json()).then(response => {
                console.log(`response --------3----> `, response)
                setLoading(false)
                if (response.error === true) {
                    console.log('here')
                    Toast.show({
                        text: response.message ? response.message : 'Something went wrong!',
                        type: "danger"
                    })
                } else {
                    setRewardsArr(response.Rewards)
                    //   dispatch({ type: 'SAVE_RESTAURANTS', payload: response.Restaurants })
                }
            }).catch(() => {
                setLoading(false)
                Toast.show({
                    text: 'Something went wrong!3',
                    type: "danger"
                })
            })
        } catch (error) {
            setLoading(false)
            console.log(`error ------------> `, error)
            Toast.show({
                text: 'Something went wrong!2',
                type: "danger"
            })
        }
    }, [])


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>

            {
                user ?
                    <View style={{ ...styles.rewards, backgroundColor: colors.yellow_shade }}>
                        <Text style={{ 'fontSize': 40, fontFamily: 'open-sans-bold' }}>Points:</Text>
                        <Text style={{ 'fontSize': 40, fontFamily: 'open-sans-bold', color: '#fff' }}>&nbsp;{user.points}</Text>
                    </View>
                    : null
            }

            <View style={styles.main}>
                <Tabs tabBarUnderlineStyle={{ backgroundColor: colors.yellow_shade }} style={{ backgroundColor: '#fff' }}>
                    <Tab heading={<TabHeading><Text>Scan History</Text></TabHeading>}>
                        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                            {
                                rewardsArr === null ?
                                    <Spinner color={colors.yellow_shade} size={30} />
                                    :
                                    rewardsArr.map(r => (<ScanItem name={r.restaurant.name} key={r._id} points={r.points} dateTime={r.createdAt} />))
                            }
                            {/* <Tab2 /> */}
                        </ScrollView>
                    </Tab>
                    <Tab heading={<TabHeading><Text>Redeem History</Text></TabHeading>}>
                        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                            <RedeemItem name='Bundu Khan' points={350} />
                            <RedeemItem name='Dunkin Donuts' points={200} />
                            <RedeemItem name='Sweet Tooth' points={450} />
                        </ScrollView>
                    </Tab>
                    {/* <Tab heading={ <TabHeading><Icon name="apps" /></TabHeading>}>
                    <View>
                        <Text style={{paddingBottom:20,fontSize:30,fontFamily:'open-sans-bold'}}>All Transactions</Text>
                    </View>
                </Tab> */}
                </Tabs>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f6f6f6'
    },
    rewards: {
        height: 100,
        backgroundColor: '#fff',
        //width:'100%',
        padding: 25,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    scrollView: {
        backgroundColor: '#f6f6f6',
    }
})

export default Rewards