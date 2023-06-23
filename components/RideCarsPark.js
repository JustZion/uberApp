import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'


const data = [{
  id: '1',
  title: 'Regular',
  multiplier: 1,
  image: require('../images/regular.png'),
},
{
  id: '1',
  title: 'Premium',
  multiplier: 1.25,
  image: require('../images/premium.png'),
},
{
  id: '1',
  title: 'Special',
  multiplier: 1.75,
  image: require('../images/special.png'),
}]


const RideCarsPack = () => {

  const Navigate  =  useNavigation()
  return (
    <SafeAreaView style={tw`bg-white`}>
       <View style={tw` bg-white flex-row p-3`}>
        <TouchableOpacity style={tw``} 
          onPress={() => Navigate.navigate('NavigateCard')}>
          <Icon name='chevron-left' type='font-awesome' />
        </TouchableOpacity>
        <Text style={tw`text-xl ml-auto mr-auto`}>Select a Ride</Text>
        </View>

        
    </SafeAreaView>
   
  )
}

export default RideCarsPack