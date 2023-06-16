import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env'

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
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
                    flex: 0
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
                console.log(data, details)
            }}

            fetchDetails={true}
            minLength={2}
            enablePoweredByContainer={false}
            nearbyPlacesAPI='GooglePlacesSearch'
            placeholder='Where from ?'
            debounce={100}
        />

        <NavOptions />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen