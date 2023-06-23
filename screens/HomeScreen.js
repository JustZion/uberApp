import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useSelector, useDispatch} from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavorites from '../components/NavFavorites';

const HomeScreen = () => {

    const dispatch = useDispatch()
    const test = useSelector(state=> state.nav.origin)


  return (
    <SafeAreaView style={tw`bg-red-200 h-full`}>
      <View style={tw`bg-red-200 pt-5 pl-5`}>
        <Image
            style={{ 
            width: 100, 
            height: 100, 
            resizeMode: 'contain'
            }}
            source={
            require('../images/uber.jpg')
            } 
        />

        <GooglePlacesAutocomplete
            styles= {{
                container: {
                    flex: 0,
                    marginRight: 20
                },
                textInput: {
                    fontSize: 18
                }
            }}

            query= {{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en',
            }}
            onPress={(data, details = null) => {
                dispatch(setOrigin({
                    location: details.geometry.location,
                    description: data.description

                }))

                dispatch(setDestination(null))
                console.log(test, 'testing')
            }}

            fetchDetails={true}
            returnKeyType={"search"}
            minLength={2}
            enablePoweredByContainer={false}
            nearbyPlacesAPI='GooglePlacesSearch'
            placeholder='Where from ?'
            debounce={100}
        />

       
      </View>
      <NavOptions  />
      <NavFavorites />
    </SafeAreaView>
  )
}

export default HomeScreen