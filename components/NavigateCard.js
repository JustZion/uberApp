import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useSelector, useDispatch} from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavorites';
import { Icon } from 'react-native-elements';


const NavigateCard = () => {

  const dispatch = useDispatch()
  const Navigate = useNavigation()

  const destiny = useSelector(state=> state.nav.destination)
  const [selected, setSelected] = useState(null)

  const keys = process.env.GOOGLE_MAPS_APIKEY
  

  // console.log('yeeee', destiny)

  useEffect(() => {
    if (destiny?.description) setSelected('rides')
  }, [])

  return (
    <SafeAreaView style={tw`bg-white`}>
      <Text style={tw`bg-white text-center text-xl font-bold py-3`}>Good morning, James</Text>
      <View style={tw`border-t bg-white border-gray-100 flex-shrink `}>
        <View>
          <GooglePlacesAutocomplete 
          styles={toInputStyles}
            placeholder='Where too ?'
            debounce={400}
            query= {{
              key: keys,
              language: 'en',
          }}

          onPress={(data, details = null) => {
            dispatch(setDestination({
              location: details.geometry.location,
              description: data.description
            }))

            console.log(destiny, 'newww')
            setSelected('rides')
            Navigate.navigate('RideCarsPark')
          }}
          returnKeyType={'search'}
          minLength={2}
          enablePoweredByContainer={false}
          nearbyPlacesAPI='GooglePlacesSearch'
          fetchDetails={true}
          />
        </View>
        <NavFavorites />
      </View>
      
      <View style={tw`flex-row pb-10 justify-evenly mt-4`}>
        <TouchableOpacity disabled={!selected}
        onPress={() =>{ Navigate.navigate('RideCarsPark');
                        setSelected('rides')}}
        style={tw`bg-gray-300 w-32 py-4 px-6 flex-row justify-evenly rounded-full  ${selected === 'rides' && 'bg-black'}`}>
          <Icon color={selected === 'rides' ? 'white' : 'black'} size={20} name='car' type='font-awesome' />
          <Text style={tw`${selected === 'rides' && 'text-white'}`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity disabled={!selected}
         onPress={() =>{ setSelected('food')}}
        style={tw`bg-gray-300 w-32 py-4 px-6  flex-row justify-evenly flex-row rounded-full ${selected === 'food' && 'bg-black'}`}>
          <Icon color={selected === 'food' ? 'white' : 'black'} size={20} name='fast-food-outline' type='ionicon' />
          <Text style={tw`${selected === 'food' && 'text-white'}`}>Food</Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard


const toInputStyles = StyleSheet.create({
  textInput: {
    paddingTop: 0,
    height: 50,
    backgroundColor: 'lightgray',
    fontSize: 18
  },

  container: {
    paddingTop: 10,
    flex: 0,
    backgroundColor:'white'
  },

  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0
  }

}) 