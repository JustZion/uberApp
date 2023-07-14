import { View, Text, FlatList,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux/';

const data = [{
    id: '234',
    title: 'Get a ride',
    image: require('../images/uberCar.jpg'),
    screen: 'MapScreen'
},
{
    id: '235',
    title: 'Eat some food',
    image: require('../images/uberFood.jpg'),
    screen: 'EatScreen'
}]

const NavOptions = () => {
    const navigation = useNavigation()
    const origin = useSelector(state=> state.nav.origin)

  return (
    <FlatList
     data = {data}
     keyExtractor={(item)=> item.id}
     horizontal
     renderItem={({item})  => (
        <TouchableOpacity style={tw`bg-gray-200 p-2 px-6 py-6 pb-16 mr-4 mt-2 w-44`}
            onPress={() => navigation.navigate(item.screen)}
            disabled={!origin}
        >
            <View style={tw`${!origin && "opacity-20"}`}>
                <Image 
                style= {{width: 120, height: 120,resizeMode: 'contain'}}
                source= {item.image}
                />
                <Text style={tw`font-semibold text-lg ml-0`}>{item.title}</Text>
                <Icon style=
                {tw`bg-black p-2 mt-4 rounded-full w-10`} 
                name='arrowright' color='white' type='antdesign'/>
            </View>
        </TouchableOpacity>
     )}
    />
  )
}

export default NavOptions