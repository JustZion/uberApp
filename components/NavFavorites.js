import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'

const data = [{
    id: '123',
    icon: 'home',
    location: 'Home',
    destination: 'Akure, Nigeria'

    },
    {
    id: '234',
    icon: 'briefcase',
    location: 'Work',
    destination: 'Lagos, Nigeria'
    }
    ]

const NavFavorites = () => {
  return (
    <FlatList style={tw`bg-white`} data={data} keyExtractor={(item) => item.id} 
        ItemSeparatorComponent={()=> (
            <View style={[tw`bg-gray-500 `, style={height: 0.5}]}></View>
        )}
    
        renderItem={({item}) => (
        <TouchableOpacity style={tw`flex-row my-0 items-center p-5`}>
            <Icon 
             style={tw`bg-gray-400 rounded-full w-12 h-12 p-2 mr-3`}
             name={item.icon}
             type='ionicon'
             color='white'
            />
            <View>
                <Text style={tw`font-semibold text-xl`}>{item.location}</Text>
                <Text style={tw`text-gray-500`}>{item.destination}</Text>
            </View>
        </TouchableOpacity>

    )}  />
  )
}

export default NavFavorites
