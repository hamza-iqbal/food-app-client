import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useSelector,useDispatch } from 'react-redux'
import { end_point } from '../assets/config'
import { Toast } from 'native-base'

const Scan = props => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const user = useSelector(state => state.Auth.user)
  const [loading,setLoading] = React.useState(false)
  const dispatch = useDispatch()


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const fetchPointsAPI = (code) => {
    setLoading(true)
    try {
      fetch(end_point + '/api/user/decode-qr-code/'+user._id, {
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
              Toast.show({
                  text: response.message ? response.message : 'Something went wrong!',
                  type: "danger"
              })
          } else {
              props.navigation.goBack()
              dispatch({type:'UPDATE_USER_DETAILS',payload:response.User})
              Toast.show({
                  text:response.message?response.message:"Successfully added points",
                  type:'success'
              })
          }
      }).catch((err) => {
        console.log('errrrrr',err)
          setLoading(false)
          Toast.show({
              text: 'Something went wrong2!',
              type: "danger"
          })
      })
  } catch (error) {
      console.log(`error ------------> `, error)
      setLoading(false)
      Toast.show({
          text: 'Something went wrong!3',
          type: "danger"
      })
  }
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(type,data)
    // alert(data);
    fetchPointsAPI(data)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
    
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

export default Scan
/*import React, { Component } from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'

export default class App extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
    }
  };

  render() {
    return (
      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />}

        {this._maybeRenderUrl()}

        <StatusBar hidden />
      </View>
    );
  }

  _handlePressUrl = () => {
    Alert.alert(
      'Open this URL?',
      this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL(this.state.lastScannedUrl),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});
*/
// import React, { Component, Fragment } from 'react';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// //stylesimport styles from './scanStyle'
// import {
//     TouchableOpacity,
//     Text,
//     StatusBar,
//     Linking,
//     View
// } from 'react-native';

// import {
//     Header,
//     Colors,
// } from 'react-native/Libraries/NewAppScreen';

// const styles = StyleSheet.create({
//     scrollViewStyle:{},
//     textTitle:{},
//     descText:{},
//     buttonTouchable:{},
//     textTitle1:{},
//     scanCardView:{},
//     cardView:{},
//     buttonTextStyle:{},
//     centerText:{},
//     textBold:{}


// })

// class Scan extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             scan: false,
//             ScanResult: false,
//             result: null
//         };
//     }

//     onSuccess = (e) => {
//         const check = e.data.substring(0, 4);
//         console.log('scanned data' + check);
//         this.setState({
//             result: e,
//             scan: false,
//             ScanResult: true
//         })
//         if (check === 'http') {
//             Linking
//                 .openURL(e.data)
//                 .catch(err => console.error('An error occured', err));


//         } else {
//             this.setState({
//                 result: e,
//                 scan: false,
//                 ScanResult: true
//             })
//         }

//     }

//     activeQR = () => {
//         this.setState({
//             scan: true
//         })
//     }
//     scanAgain = () => {
//         this.setState({
//             scan: true,
//             ScanResult: false
//         })
//     }
//     render() {
//         const { scan, ScanResult, result } = this.state
//         const desccription = 'QR code (abbreviated from Quick Response Code) is the trademark for a type of matrix barcode (or two-dimensional barcode) first designed in 1994 for the automotive industry in Japan. A barcode is a machine-readable optical label that contains information about the item to which it is attached. In practice, QR codes often contain data for a locator, identifier, or tracker that points to a website or application. A QR code uses four standardized encoding modes (numeric, alphanumeric, byte/binary, and kanji) to store data efficiently; extensions may also be used.'
//         return (
//             <View style={styles.scrollViewStyle}>
//                 <Fragment>
//                     <StatusBar barStyle="dark-content" />
//                     <Text style={styles.textTitle}>Welcome To React-Native QR Code Tutorial !</Text>
//                     {!scan && !ScanResult &&
//                         <View style={styles.cardView} >
//                             <Text numberOfLines={8} style={styles.descText}>{desccription}</Text>

//                             <TouchableOpacity onPress={this.activeQR} style={styles.buttonTouchable}>
//                                 <Text style={styles.buttonTextStyle}>Click to Scan !</Text>
//                             </TouchableOpacity>
//                         </View>
//                     }

//                     {ScanResult &&
//                         <Fragment>
//                             <Text style={styles.textTitle1}>Result !</Text>
//                             <View style={ScanResult ? styles.scanCardView : styles.cardView}>
//                                 <Text>Type : {result.type}</Text>
//                                 <Text>Result : {result.data}</Text>
//                                 <Text numberOfLines={1}>RawData: {result.rawData}</Text>
//                                 <TouchableOpacity onPress={this.scanAgain} style={styles.buttonTouchable}>
//                                     <Text style={styles.buttonTextStyle}>Click to Scan again!</Text>
//                                 </TouchableOpacity>

//                             </View>
//                         </Fragment>
//                     }


//                     {scan &&
//                         <QRCodeScanner
//                             reactivate={true}
//                             showMarker={true}
//                             ref={(node) => { this.scanner = node }}
//                             onRead={this.onSuccess}
//                             topContent={
//                                 <Text style={styles.centerText}>
//                                     Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code to test.</Text>
//                             }
//                             bottomContent={
//                                 <View>
//                                     <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.scanner.reactivate()}>
//                                         <Text style={styles.buttonTextStyle}>OK. Got it!</Text>
//                                     </TouchableOpacity>

//                                     <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.setState({ scan: false })}>
//                                         <Text style={styles.buttonTextStyle}>Stop Scan</Text>
//                                     </TouchableOpacity>
//                                 </View>

//                             }
//                         />
//                     }
//                 </Fragment>
//             </View>

//         );
//     }
// }



// export default Scan;