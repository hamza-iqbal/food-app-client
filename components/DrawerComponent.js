import React from 'react'
import { ScrollView, SafeAreaView, Button } from 'react-native'
import { useDispatch } from 'react-redux'
import { withNavigation } from 'react-navigation'

const DrawerComponent = props => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch({ type: 'CLEAR_LOGIN_DETAILS' })
        console.log('hoo hah')
        //props.navigation.navigate('AuthLoading')
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                <Button
                    color='red'
                    title='Profile'
                    onPress={() => props.navigation.navigate('Profile')}
                />
                <Button
                    color='red'
                    title='Logout'
                    onPress={handleLogout}
                />
            </SafeAreaView>
        </ScrollView>
    )
}

export default withNavigation(DrawerComponent)