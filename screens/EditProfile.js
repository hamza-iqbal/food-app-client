import React from 'react'
import { View, StyleSheet } from 'react-native'
// import { TextInput, Text, Alert } from 'react-native';
// import { Button, Toast, Spinner } from 'native-base'
import EditProfileRestaurant from '../components/EditProfileRestaurant'
import EditProfileUser from '../components/EditProfileUser'
import { useSelector } from 'react-redux'


const EditProfile = props => {

  const user = useSelector(state => state.Auth.user)
  console.log('user: ', user)

  return (

    <View style={styles.outerView}>
      {
        user.role === 'restaurant' ?
          <EditProfileRestaurant />
          : <EditProfileUser />
      }
    </View>
  )
        
}

const styles = StyleSheet.create({
  outerView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width:'100%',
    backgroundColor: '#fff'
  }
})

export default EditProfile