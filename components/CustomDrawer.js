import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'


const CustomDrawer = (props) => {

    const Navigate = useNavigation()
  return (
    <DrawerContentScrollView 
    {...props}
    contentContainerStyle={tw`bg-white `}
    >
        <TouchableOpacity  
        onPress={() => Navigate.navigate('Settings')}
        style={tw`flex-col pb-5 pl-5`}>
            <View  style={tw`flex-row`}>
                <View style={tw`bg-gray-200 p-3 rounded-full`}>
                    <Image 
                    source={require('../images/premium.png')} 
                    style= {{width: 50, height: 50,resizeMode: 'contain'}}
                    />
                </View>
                <View style={tw`mt-3 ml-3`}>
                    <Text style={tw`font-bold text-lg`}>Zion</Text>
                    <Text style={tw`text-green-600 text-xs`}>Edit Profile</Text>
                </View>
            </View>
            <View style={tw`mr-auto flex-row mt-4`}>
                <Icon name='star' color='green' size={20}/>
                <Text style={tw`font-bold text-sm`}> 4.94&nbsp; <Text style={tw`text-gray-400`}>Rating</Text></Text>
            </View>
        </TouchableOpacity>
        <View style={tw`w-full h-2 bg-gray-100`}></View>
        <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}

export default CustomDrawer