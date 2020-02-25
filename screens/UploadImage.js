// import * as React from 'react';
// import { Image, View, Text, TouchableOpacity, Alert } from 'react-native';
// import { Button } from 'native-base'
// import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';
// import * as Permissions from 'expo-permissions';
// import Colors from '../assets/colors';
// import { end_point } from '../assets/config'
// import { connect } from 'react-redux'
// import { updateUserDetails } from '../store/actions/Auth'

// //const { updateUserDetails } = authActions


// class ImagePickerComponent extends React.Component {
//     state = {
//         image: null,
//         loading: false
//     };

//     render() {
//         let { image } = this.state;

//         return (
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                 <TouchableOpacity onPress={this._pickImage}>
//                     <Text style={{ marginVertical: 20, color: 'red' }}>Upload Display Picture</Text>
//                 </TouchableOpacity>
//                 {/* <Button
//           title="Pick an image from camera roll"
//           onPress={this._pickImage}
//         /> */}
//                 {
//                     image &&
//                     <View style={{ width: '100%', alignItems: "center" }}>
//                         <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
//                         <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
//                             <Button
//                                 onPress={this.uploadImage}
//                                 style={{
//                                     backgroundColor: Colors.yellow_shade,
//                                     padding: 15,
//                                     width: 90,
//                                     marginHorizontal: 5,
//                                     justifyContent: 'center'
//                                 }}
//                             >
//                                 <Text style={{ color: '#fff' }}>
//                                     Upload
//                         </Text>
//                             </Button>
//                             <Button
//                                 //onPress={()=>setEditMode(false)}
//                                 onPress={this.clearImage}
//                                 style={{
//                                     borderWidth: 1,
//                                     borderColor: Colors.yellow_shade,
//                                     width: 90,
//                                     backgroundColor: '#fff',
//                                     padding: 15,
//                                     marginHorizontal: 5,
//                                     justifyContent: 'center'
//                                 }}>
//                                 <Text style={{ color: Colors.yellow_shade }}>Cancel</Text>
//                             </Button>
//                         </View>
//                     </View>
//                 }

//             </View>
//         );
//     }

//     clearImage = () => {
//         this.setState({ image: null })
//     }

//     setLoading = (val) => {
//         this.setState({ loading: val })
//     }

//     uploadImage = () => {
//         let filename = this.state.image.split('/').pop();
//         let match = /\.(\w+)$/.exec(filename);
//         let type = match ? `image/${match[1]}` : `image`;

//         let formData = new FormData();
//         formData.append('picture', { uri: this.state.image, name: filename, type });

//         if (match[1] === 'png' || match[1] === 'jpg' || match[1] === 'jpeg') {
//             console.log('filename: ', filename, ', match: ', match, ', type: ', type)
//             try {
//                 this.setLoading(false)
//                 fetch(end_point + `/api/restaurant/update-dp/${this.props.user._id}`, {
//                     method: 'post',
//                     headers: {
//                         'Authorization': `Bearer ${this.props.token}`,
//                         'Content-Type':'multipart/form-data'
//                     },
//                     body: formData
//                 })
//                     .then(res => res.json())
//                     .then(res => {
//                         this.setLoading(false)
//                         console.log('resssssssssssssss', res)
//                         const { updateUserDetails } = this.props;
//                         updateUserDetails(res.Restaurant)
                        
//                         // setQrCode(res.code)
//                     })
//                     .catch(err => {
//                         console.log('error while uploading picture', err)
//                         this.setLoading(false)
//                     })
//             } catch (err) {
//                 console.log('err in try catch while uploading picture', err)
//                 this.setLoading(false)
//             }
//         } else {
//             Alert.alert('Only png and jpg type allowed')
//         }
//     }

//     componentDidMount() {
//         this.getPermissionAsync();
//         console.log('hi');
//     }

//     getPermissionAsync = async () => {
//         if (Constants.platform.ios) {
//             const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//             if (status !== 'granted') {
//                 alert('Sorry, we need camera roll permissions to make this work!');
//             }
//         }
//     }

//     _pickImage = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.All,
//             allowsEditing: true,
//             aspect: [8, 3],
//             quality: 1
//         });

//         console.log(result);

//         if (!result.cancelled) {
//             this.setState({ image: result.uri, file: result });
//         }
//     };
// }

// export default connect(
//     state => ({
//         user: state.Auth.user,
//         token: state.Auth.token
//     }),
//     { updateUserDetails }
// )(ImagePickerComponent)