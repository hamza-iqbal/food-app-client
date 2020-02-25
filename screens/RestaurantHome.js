import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView,Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { image_end_point,end_point } from '../assets/config'
import { Button, Spinner, ActionSheet } from 'native-base'
import Colors from '../assets/colors'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { useDispatch } from 'react-redux'
import QRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'
//import UploadImage from '../screens/UploadImage'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';

const RestaurantHome = props => {

    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = React.useState(false)
    const [state, setState] = React.useState({ image: null, loading: false})
    const [editMode,setEditMode] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [qrCode,setQrCode] = React.useState('')
    let user = useSelector(state => state.Auth.user)
    let token = useSelector(state => state.Auth.token)
    console.log('props in Details------------------------------------------------------------------------', props,user,token)

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

    const uploadImage = (image) => {
        let filename = image.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        setLoading(true)

        let formData = new FormData();
        formData.append('picture', { uri: image, name: filename, type });

        if (match[1] === 'png' || match[1] === 'jpg' || match[1] === 'jpeg') {
            console.log('filename: ', filename, ', match: ', match, ', type: ', type)
            try {
                setLoading(false)
                fetch(end_point + `/api/restaurant/update-dp/${user._id}`, {
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type':'multipart/form-data'
                    },
                    body: formData
                })
                    .then(res => res.json())
                    .then(res => {
                        setLoading(false)
                        console.log('resssssssssssssss', res)
                        dispatch({type:'UPDATE_USER_DETAILS',payload:res.Restaurant})
                    })
                    .catch(err => {
                        console.log('error while uploading picture', err)
                        setLoading(false)
                    })
            } catch (err) {
                console.log('err in try catch while uploading picture', err)
                setLoading(false)
            }
        } else {
            Alert.alert('Only png and jpg type allowed')
        }
    }

    React.useEffect(()=>{
        getPermissionAsync()
    },[])

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    const handleUpload = () => {
        ActionSheet.show({
            options:['Update Profile Picture','Cancel'],
            destructiveButtonIndex:[1]
        },
        buttonIndex => {
          if(buttonIndex===0){
            _pickImage()
          }
        })
    }

    const _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [8, 3],
            quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            setState({...state, image: result.uri, file: result });
            uploadImage(result.uri)
        }
    };


    return (<ScrollView showsVerticalScrollIndicator={false} style={{flex:1,backgroundColor:'#fff'}}>

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
            {
                loading===true?
                <View style={{width:'100%',alignItems:'center'}}>
                    <Spinner color={Colors.yellow_shade}/>
                </View>
                :
                user.profile_picture?
                    <View style={styles.imageContainer}>
                        <TouchableOpacity onPress={handleUpload}>
                        <Image style={{ width: '100%', height: '100%' }} source={{ uri: image_end_point + user.profile_picture }} />
                </TouchableOpacity>
                    </View>
                :<TouchableOpacity onPress={handleUpload}>
                    <View style={{marginTop:20}}><Text style={{color:'red'}}>Add Picture</Text></View>
                </TouchableOpacity>
                // :<View style={{width:'100%',alignItems:'center'}}><Button onPress={()=>props.navigation.navigate('UploadImage')}><Text>Upload Picture</Text></Button></View>
            }
            <View style={{...styles.buttonContainer,alignItems:'center'}}>
                <Text style={{fontSize:35,fontFamily:'open-sans-bold'}}>{user.name}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button full={true} onPress={() => {
                    setModalVisible(true)
                    fetchQRCode()
                }} style={styles.button}><Text style={styles.buttonText}>Give Points</Text></Button>
            </View>
            <View style={styles.buttonContainer}>
                <Button full={true} onPress={() => {
                    // setModalVisible(true)
                    // fetchQRCode()
                }} style={styles.button}><Text style={styles.buttonText}>Use Points</Text></Button>
            </View>
            <View style={styles.buttonContainer}>
                <Button full={true} onPress={() => {
                    props.navigation.navigate('RestaurantDeals')
                }} style={styles.button}><Text style={styles.buttonText}>Deals</Text></Button>
            </View>
            <View style={styles.buttonContainer}>
                <Button full={true} onPress={() => {
                    //props.navigation.navigate('ChangePassword')
                }} style={styles.button}><Text style={styles.buttonText}>View Transactions</Text></Button>
            </View>
            <View style={styles.buttonContainer}>
                <Button full={true} onPress={() => {
                    //props.navigation.navigate('Profile')
                }} style={styles.button}><Text style={styles.buttonText}>Profile</Text></Button>
            </View>
            <View style={styles.buttonContainer}>
                <Button full={true} onPress={() => {
                    props.navigation.navigate('EditProfile')
                }} style={styles.button}><Text style={styles.buttonText}>Edit Profile</Text></Button>
            </View>
            <View style={styles.buttonContainer}>
                <Button full={true} onPress={() => {
                    props.navigation.navigate('ChangePassword')
                }} style={styles.button}><Text style={styles.buttonText}>Change Password</Text></Button>
            </View>
            <View style={styles.buttonContainer}>
                <Button full={true} onPress={() => {
                    //props.navigation.navigate('ChangePassword')
                }} style={styles.button}><Text style={styles.buttonText}>Settings</Text></Button>
            </View>
            {/* <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Text style={{fontSize:20,fontFamily:'open-sans-bold'}}>Account Details</Text>
                <TouchableOpacity onPress={()=>setEditMode(true)}><MaterialIcons name="edit" size={20} style={{marginHorizontal:5}} color={Colors.yellow_shade}/></TouchableOpacity>
            </View> */}
            {/* {
                editMode === false?
                <View style={{width:'100%',padding:20,alignItems:'center'}}>
                    <Text style={styles.textRow}>Name: {user.name}</Text>
                    <Text style={styles.textRow}>Points To Offer Per Transaction: {user.pointsToGive}</Text>
                    <Text style={styles.textRow}>Contact: {user.contact}</Text>
                    <Text style={styles.textRow}>City: {user.city}</Text>
                </View>
                :
                <View style={{width:'100%',padding:20,alignItems:'center'}}>
                    <Text style={styles.textRow}>Name: {user.name}</Text>
                    <Text style={styles.textRow}>Points To Offer Per Transaction: {user.pointsToGive}</Text>
                    <Text style={styles.textRow}>Contact: {user.contact}</Text>
                    <Text style={styles.textRow}>City: {user.city}</Text>
                    <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
                        <Button style={{backgroundColor:Colors.yellow_shade,padding:15,width:90,marginHorizontal:5,justifyContent:'center'}}><Text style={{color:'#fff'}}>Update</Text></Button>
                        <Button 
                        onPress={()=>setEditMode(false)}
                        style={{
                            borderWidth:1,
                            borderColor:Colors.yellow_shade,
                            width:90,
                            backgroundColor:'#fff',
                            padding:15,
                            marginHorizontal:5,
                            justifyContent:'center'
                        }}>
                            <Text style={{color:Colors.yellow_shade}}>Cancel</Text>
                        </Button>
                    </View>
                </View>
            } */}
            <View></View>
        </View>
                </ScrollView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom:50
    },
    buttonContainer:{
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop:15,
        width:'100%'
    },
    button:{ 
        padding: 20, 
        backgroundColor: Colors.yellow_shade,
        borderRadius:5
    },
    buttonText:{ 
        color: '#fff',
        fontFamily:'open-sans-bold' 
    },
    textRow:{
        fontSize:18,
        marginVertical:10
    },
    imageContainer: {
        width: '100%',
        height: 200
    }
})

export default withNavigation(RestaurantHome)