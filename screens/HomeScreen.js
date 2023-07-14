import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useSelector, useDispatch} from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavorites from '../components/NavFavorites';
import { Icon, Input } from 'react-native-elements';
import * as Location from 'expo-location'

// navigator.geolocation = require('react-native-geolocation-service');

const HomeScreen = () => {

    const dispatch = useDispatch()
    const test = useSelector(state=> state.nav.origin)
    const [mylocation, setmyLocation] = useState(null)
    const location = useRef()


    const getPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          console.log('access denied')
          return;
        }
  
        let locationa = await Location.getCurrentPositionAsync({});
        // setmyLocation(locationa);
        myLocationAddress(locationa)
        // console.log('my precious locaion', locationa)
    }

    const myLocationAddress = async (rawAddress)  => {
        const geocodedLocation = await Location.reverseGeocodeAsync({
            longitude: rawAddress.coords.longitude,
            latitude:  rawAddress.coords.latitude
        })
        setmyLocation(geocodedLocation[0].name + ' ' + geocodedLocation[0].street);
        console.log('reversed', geocodedLocation)
    }

    const testt = ()=> {
        const x = location.current.getAddressText()
        console.log(x)
    }
    useEffect(() => {
       

        getPermission()

    })

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`bg-white pt-5 pl-5`}>
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
            ref = {location}
            styles= {{
                container: {
                    flex: 0,
                    marginRight: 20
                },
                textInput: {
                    fontSize: 18,
                    paddingRight: 40,
                }
            }}

            query= {{
                key: GOOGLE_MAPS_APIKEY,
                language: 'enr',
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

        //  currentLocation={true}

           
        />

        <View style={[tw`absolute `, {marginTop: 127, right: 25}]}>
            <TouchableOpacity  
            onPress={()=> location.current.clear()}>
           
            <Icon name='close' size={30} type='ionicon'/>
           
            </TouchableOpacity>
            
        </View>

        <View style={[tw`absolute z-50 `, {marginTop: 127, right: 55}]}>
            <TouchableOpacity  
            onPress={()=> getPermission()}>
           
            <Icon name='close' size={30} type='ionicon'/>
           
            </TouchableOpacity>
            
        </View>

        <View style={[tw`absolute z-50 `, {marginTop: 127, right: 95}]}>
            <TouchableOpacity  
            onPress={()=> {console.log('dd',mylocation)
            location.current.setAddressText(mylocation)
            location.current.blur()
            location.current.focus()
            }}>
           
            <Icon name='close' size={30} type='ionicon'/>
           
            </TouchableOpacity>
            
        </View>

        <View style={[tw`absolute z-50 `, {marginTop: 127, right: 125}]}>
            <TouchableOpacity  
            onPress={()=> {'jjjs', testt(); 
            }}>
           
            <Icon name='close' size={30} type='ionicon'/>
           
            </TouchableOpacity>
            
            </View>

       

       
      <NavOptions  />
      <NavFavorites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen