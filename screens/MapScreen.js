import { View, Text } from 'react-native'
import React from 'react'
import Maps from '../components/Maps'
import tw, { create } from 'tailwind-react-native-classnames'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard';
import RideCarsPark from '../components/RideCarsPark';

const MapScreen = () => {

    const Stack = createNativeStackNavigator()
  return (
    <View>
        <Text>Welcome to map screen</Text>
        <View style={tw`h-1/2 bg-red-200`}>
            <Maps />
        </View>
        <View style={tw`h-1/2`}>
            <Stack.Navigator>
                <Stack.Screen 
                    name='NavigateCard'
                    component={NavigateCard}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name='RideCarsPark'
                    component={RideCarsPark}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </View>
      
    </View>
  )
}

export default MapScreen