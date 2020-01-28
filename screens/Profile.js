import React from 'react'
import { View, Text, StyleSheet,ScrollView } from 'react-native'

const Profile = props => {

    return(
        <ScrollView>
            <View style={styles.body}>
                <Text>Profile</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Profile