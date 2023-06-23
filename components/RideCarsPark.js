import { View, Text, SafeAreaView, TouchableOpacity, FlatList , Image} from 'react-native'
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
  id: '2',
  title: 'Premium',
  multiplier: 1.25,
  image: require('../images/premium.png'),
},
{
  id: '3',
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
        <Text style={tw`text-xl ml-auto mr-auto font-semibold`}>Select a Ride</Text>
        </View>

        <FlatList style={tw`mt-2`} data={data} keyExtractor={(item) => item.id}
        renderItem={({item : {id, title, multiplier, image}}) => (
          <TouchableOpacity style={tw`flex-row text-center justify-between px-5 pl-2`}>
            <Image 
             source= {image}
             style= {{ width: 100, height: 100 , resizeMode: 'contain' }}
            />
            <View style={tw`mt-7 -ml-2`}>
              <Text>{title}</Text>
              <Text>Multiplier of ...</Text>
            </View>
            <Text style={tw`font-semibold text-xl mt-7`}>£99</Text>
          </TouchableOpacity>
        )}
        />
    </SafeAreaView>
   
  )
}

export default RideCarsPack