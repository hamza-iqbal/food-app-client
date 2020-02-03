import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { image_end_point,end_point } from '../assets/config'
import { Button, Spinner } from 'native-base'
import Colors from '../assets/colors'
import QRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux'

const RestaurantHome = props => {

    const [modalVisible, setModalVisible] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [qrCode,setQrCode] = React.useState('')
    console.log('props in Details------------------------------------------------------------------------', props)
    let user = useSelector(state => state.Auth.user)
    let token = useSelector(state => state.Auth.token)

    const fetchQRCode = () => {
        console.log('fetching...',user,token)
        console.log(user)
        console.log(token)
        setLoading(true)
        try{
            fetch(end_point+`/api/restaurant/generate-qr-code/${user._id}`,{
                method: 'get',
                headers: {
                    'Authorization':`Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(res => {
                setLoading(false)
                console.log('generate qrcode response',res)
                setQrCode(res.code)
            })
            .catch(err => {
                console.log('error while fetching code',err)
                setLoading(false)
            })
        }catch(err){
            console.log('err in try catch while fetching qr code',err)
            setLoading(false)
        }

    }

    React.useEffect(() => {
        console.log(user, token)
    }, [])


    return (
        <View style={styles.main}>
            <Modal
                isVisible={modalVisible}
                style={{ backgroundColor: '#fff' }}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection={['down']}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Text style={{ fontSize: 20, fontFamily: 'open-sans-bold', color: Colors.blue_shade }}>Dine at {props.restaurant.title}</Text> */}
                    {/* <AntDesign name="qrcode" size={150} /> */}
                    <View style={{ padding: 20 }}>
                        {
                            loading === true ?
                                <Spinner color={Colors.blue_shade} />
                                :
                                qrCode===''?
                                <Text>Failed to generate qrcode</Text>
                                :
                                <QRCode
                                    value={qrCode}
                                    size={200}
                                />
                        }
                    </View>
                    <Button rounded style={{ backgroundColor: Colors.red_shade, width: '60%', justifyContent: 'center' }} onPress={() => setModalVisible(false)}>
                        <Text style={{ color: '#fff' }}>Close</Text>
                    </Button>
                </View>
            </Modal>
            <View style={styles.imageContainer}>
                <Image style={{ width: '100%', height: '100%' }} source={{ uri: image_end_point + user.profile_picture }} />
            </View>
            <View style={{ marginVertical: 30 }}>
                <Button onPress={() => {
                    setModalVisible(true)
                    fetchQRCode()
                }} style={{ padding: 20, backgroundColor: Colors.blue_shade }}><Text style={{ color: '#fff' }}>Generate QR code</Text></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    imageContainer: {
        width: '100%',
        height: 200
    }
})

export default RestaurantHome