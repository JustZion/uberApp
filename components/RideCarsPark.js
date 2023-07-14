import { View, Text, SafeAreaView, TouchableOpacity, FlatList , Image} from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'


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

const SURGE_RATE_CHARGE = 1.5

const RideCarsPack = () => {

  const distance = useSelector(state => state.nav.timeTravelInformation)

  const [selected, setSelected] = useState(null)

  const Navigate  =  useNavigation()
  return (
    <SafeAreaView style={tw`bg-white`}>
       <View style={tw` bg-white flex-row p-3`}>
        <TouchableOpacity style={tw``} 
          onPress={() => Navigate.navigate('NavigateCard')}>
          <Icon name='chevron-left' type='font-awesome' />
        </TouchableOpacity>
        <Text style={tw`text-xl ml-auto mr-auto font-semibold`}>Select a Ride - {distance && distance.distance?.text}</Text>
        </View>

        <FlatList style={tw`mt-0 border-t border-gray-200`} data={data} keyExtractor={(item) => item.id}
        renderItem={({item : {id, title, multiplier, image}, item}) => (
          <TouchableOpacity style={tw`flex-row text-center justify-between px-5 pl-2 ${selected?.id === id && 'bg-gray-200'}`}
          onPress={() => setSelected(item)}
          >
            <Image 
             source= {image}
             style= {{ width: 100, height: 100 , resizeMode: 'contain' }}
            />
            <View style={tw`mt-7 -ml-2`}>
              <Text style={tw`font-bold text-xl`}>{title}</Text>
              <Text>{distance && distance.duration?.text} </Text>
            </View>
            <Text style={tw`font-semibold text-xl mt-7`}>
              
              {
                new Intl.NumberFormat('en-gb',{
              style: 'currency',
              currency: 'NGN'}).format(
                (distance && distance.duration?.value * SURGE_RATE_CHARGE * multiplier
              ))
              }
            </Text>
          </TouchableOpacity>
        )}
        />

        <View>
          <TouchableOpacity disabled={!selected} style={
            tw`bg-black p-2 mx-3 mt-1 rounded-full ${!selected && 'bg-gray-200'}`
            }>
            <Text style={tw`text-white text-lg text-center `}>
             Choose {selected?.title} Ride 
            </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
   
  )
}

export default RideCarsPack