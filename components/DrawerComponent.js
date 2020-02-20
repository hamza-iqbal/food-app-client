import React from 'react'
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { List, ListItem, Text, Button, Left, Right, Icon, Body } from 'native-base'
import { MaterialIcons,MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import colors from '../assets/colors'

const DrawerComponent = props => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch({ type: 'CLEAR_LOGIN_DETAILS' })
        console.log('hoo hah')
        props.navigation.navigate('AuthLoading')
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                <ListItem icon onPress={() => props.navigation.navigate('Profile')}>
                    <Left>
                        <Button style={{ backgroundColor: colors.red_shade }}>
                            <MaterialIcons name="person" color={"#fff"} size={25} />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: colors.red_shade }}>Profile</Text>
                    </Body>
                </ListItem>
                <ListItem icon onPress={() => props.navigation.navigate('Rewards')}>
                    <Left>
                        <Button style={{ backgroundColor: colors.red_shade }}>
                            <AntDesign name="qrcode" color={"#fff"} size={25} />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: colors.red_shade }}>Rewards</Text>
                    </Body>
                </ListItem>
                <ListItem icon onPress={() => props.navigation.navigate('ChangePassword')}>
                    <Left>
                        <Button style={{ backgroundColor: colors.red_shade }}>
                            <MaterialCommunityIcons name="key" color={"#fff"} size={25} />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: colors.red_shade }}>Change Password</Text>
                    </Body>
                </ListItem>
                <ListItem icon onPress={handleLogout}>
                    <Left>
                        <Button style={{ backgroundColor: colors.red_shade }}>
                            <MaterialCommunityIcons name="logout-variant" color={"#fff"} size={25} />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: colors.red_shade }}>Logout</Text>
                    </Body>
                    {/* <Right>
            <Text>on</Text>
            </Right> */}
                </ListItem>
                <ListItem itemDivider><Text>{' '}</Text></ListItem>
                <ListItem>
                    <Text>FAQs</Text>
                </ListItem>
                <ListItem>
                    <Text>Privacy Policy</Text>
                </ListItem>
                <ListItem>
                    <Text>Terms and conditions</Text>
                </ListItem>
                {/* <Button
                    color='red'
                    title='Profile'
                    onPress={() => props.navigation.navigate('Profile')}
                />
                <Button
                    color='red'
                    title='Logout'
                    onPress={handleLogout}
                /> */}
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    listItem: {
        color: colors.red_shade
    }
})

export default withNavigation(DrawerComponent)