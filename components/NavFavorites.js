import { View, Text } from 'react-native'
import React from 'react'

const data = [{
    id: '123',
    code: 'Home',
    location: 'Home',
    destination: 'Akure, Nigeria'

    },
    {
    id: '234',
    code: 'Work',
    location: 'Work',
    destination: 'Lagos, Nigeria'
    }
    ]

const NavFavorites = () => {
  return (
    <View>
      <Text>NavFavorites</Text>
    </View>
  )
}

export default NavFavorites