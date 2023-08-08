import { View, Text } from 'react-native'
import React from 'react'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { OTPInput } from 'react-native-otp-entry';

const Otp = () => {
  return (
    <View>
      <Text>Otp</Text>
      <OTPInputView
            style={{width: '80%', height: 40}}
    pinCount={4} 
    />

    </View>
  )
}

export default Otp