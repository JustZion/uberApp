import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useSelector, useDispatch} from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';


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
    paddingTop: 20,
    flex: 0,
    backgroundColor:'white'
  },

  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0
  }

}) 