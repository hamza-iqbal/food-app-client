import React from 'react'
import { TextInput } from 'react-native'

const CustomTextInput = props => {

    return(<TextInput
        value={props.value}
        onChangeText={()=>props.onChangeText(props.value)}
        style={props.style}
        placeholder={props.placeholder}
        onBlur={() => props.onBlur(props.value)}
        secureTextEntry={props.secureTextEntry?props.secureTextEntry:false}
      />)
}

export default CustomTextInput