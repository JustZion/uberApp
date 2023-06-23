import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useSelector, useDispatch} from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavorites';
import { Icon } from 'react-native-elements';


const NavigateCard = () => {

  const dispatch = useDispatch()
  const Navigate = useNavigation()

  const destiny = useSelector(state=> state.nav.destination)
  


  return (
    <SafeAreaView>
      <Text style={tw`bg-red-200 text-center text-xl py-3`}>NavigateCard</Text>
      <View style={tw`border-t border-gray-200 flex-shrink `}>
        <View>
          <GooglePlacesAutocomplete 
          styles={toInputStyles}
            placeholder='Where too ?'
            debounce={400}
            query= {{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
          }}

          onPress={(data, details = null) => {
            dispatch(setDestination({
              location: details.geometry.location,
              description: data.description
            }))

            console.log(destiny, 'newww')
            
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
      
      <View style={tw`flex-row justify-evenly mt-4`}>
        <TouchableOpacity 
        onPress={() => Navigate.navigate('RideCarsPark')}
        style={tw`bg-black w-32 py-4 px-6 flex-row justify-evenly rounded-full`}>
          <Icon color='white' size={20} name='car' type='font-awesome' />
          <Text style={tw`text-white`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw`w-32 py-4 px-6  flex-row justify-evenly flex-row rounded-full`}>
          <Icon color='black' size={20} name='fast-food-outline' type='ionicon' />
          <Text style={tw`text-black`}>Food</Text>
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