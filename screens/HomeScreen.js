import { View, Text, SafeAreaView, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useSelector, useDispatch} from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavorites from '../components/NavFavorites';
import { Icon, Input } from 'react-native-elements';
import * as Location from 'expo-location'
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../sideMenu/Profile';
import SettingsScreen from '../sideMenu/Settings';
import SavedScreen from '../sideMenu/Saved';
import ReferScreen from '../sideMenu/Refer';
import Otp from '../components/Otp';

// navigator.geolocation = require('react-native-geolocation-service');

const HomeScreen = () => {

    const dispatch = useDispatch()
    const test = useSelector(state=> state.nav.origin)
    const [mylocation, setmyLocation] = useState(null)
    const location = useRef()
    const Drawer = createDrawerNavigator();
    
    const keys = process.env.GOOGLE_MAPS_APIKEY


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
        // console.log('reversd', geocodedLocation)
    }

    const testt = ()=> {
        const x = location.current.getAddressText()
        console.log('gotten',x)
    }
    useEffect(() => {
       

        getPermission()

    })

  return (
    <>
    
    
    
    <SafeAreaView style={tw`bg-white h-full`}>
        <KeyboardAvoidingView>

        
      <View style={tw`bg-white pt-5 pl-5`}>
        <View style={tw`flex-row justify-between`}>

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

        <TouchableOpacity style={tw`mt-4 mr-6 bg-gray-200 rounded-full w-14 h-14 flex justify-center `}>
            <Icon name='menu-outline' size={30} type='ionicon'/>
        </TouchableOpacity>
        </View>
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
                key: keys,
                language: 'enr',
            }}
            onPress={(data, details = null) => {
                console.log('yesstyped');
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
      
      </KeyboardAvoidingView>
    </SafeAreaView>
   
    </>
  )
}

export default HomeScreen