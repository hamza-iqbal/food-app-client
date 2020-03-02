import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useSelector,useDispatch } from 'react-redux'
import { end_point } from '../assets/config'
import { Toast } from 'native-base'
import SuccessLottie from '../components/SuccessStarLottie'
import FailureLottie from '../components/FailureLottie'
import Modal from 'react-native-modal';

const Redeem = props => {
  const [hasPermission, setHasPermission] = useState(null);
  const [failureLottieText, setFailureLottieText] = useState('Invalid QR Code');
  const [scanned, setScanned] = useState(false);
  const [modalOpen,setModalOpen] = useState(false)
  const user = useSelector(state => state.Auth.user)
  const [loading,setLoading] = React.useState(false)
  const dispatch = useDispatch()
  const [success,setSuccess] = React.useState(false)


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const fetchPointsAPI = (code) => {
    setLoading(true)
    try {
      fetch(end_point+'/api/user/decode-qr-code-redeeming/' +user._id, {
          method: 'post',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code })
      }).then(response => response.json()).then(response => {
          console.log(`response ------------> `, response)
          setLoading(false)
          if (response.error === true) {
              console.log('here')
              if(response.message==='Not Enough Points!'){
                setFailureLottieText('Not Enough Points!')
              }
              Toast.show({
                  text: response.message ? response.message : 'Something went wrong!',
                  type: "danger"
              })
              setModalOpen(true)
          } else {
              
            dispatch({type:'UPDATE_USER_DETAILS',payload:response.User})
              Toast.show({
                  text:response.message?response.message:"Successfully Redeemed Points",
                  type:'success',
                  duration:4000
              })
              setModalOpen(true)
              setSuccess(true)
          }
      }).catch((err) => {
        console.log('errrrrr',err)
          setLoading(false)
          Toast.show({
              text: 'Something went wrong2!',
              type: "danger"
          })
          setModalOpen(true)
      })
  } catch (error) {
      console.log(`error ------------> `, error)
      setLoading(false)
      Toast.show({
          text: 'Something went wrong!3',
          type: "danger"
      })
      setModalOpen(true)
  }
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(type,data)
    // alert(data);
    fetchPointsAPI(data)
  };
  // React.useEffect(()=>{
    
  // },[])

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleModalClose = () => {
    setModalOpen(false)
    props.navigation.goBack()
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {/* {
        success === true?
        <View style={{alignItems:'center',padding:20}}>
          <LottieView options={defaultOptions} height={400} width={400} />
        </View>
        :
        null
      }
      <View style={{alignItems:'center',padding:20,flex:1}}>
          <LottieView options={defaultOptions} height={400} width={400} />
        </View> */}
      {/* <LottieView
          ref={animation => {
              scanningAnimationRef = animation;
          }}
          style={{
              width: 200,
              height: 200,
              //backgroundColor: '#fafafa',
          }}
          source={require('../assets/lottie/qr_animation.json')}
        /> */}
    <Modal
        testID={'modal'}
        isVisible={modalOpen}
        onSwipeComplete={handleModalClose}
        onBackdropPress={handleModalClose}
        swipeDirection={['down']}
        style={styles.view}>
          <View style={styles.modal}>
            {
              success===true?
              <SuccessLottie successText={'Transaction Successful!'} />
              :
              <FailureLottie text={failureLottieText} />
            }
          </View>
      </Modal>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modal:{
    backgroundColor:'#fff',
    width:'100%',
    height:'50%',padding:60,alignItems:'center'
  }
});

export default Redeem