import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { settimeTravelInformation } from '../slices/navSlice';

const Maps = () => {

    const origin = useSelector(state=> state.nav.origin)
    const destination = useSelector(state=> state.nav.destination)
    const mapRef = useRef(null)

   const dispatch = useDispatch()


    useEffect(() => {
        if (!origin || !destination) return;

        var i = setInterval(() => {
            console.log("Before", i);

        mapRef?.current?.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: {top: 50, bottom: 50, right: 140, left: 150}, animated: true
        })

        clearInterval(i);
      console.log("After clear interval", i);
    }, 50);

    }, [origin, destination])

    useEffect(()=> {
        if (!origin || !destination) return

        const URL =`https://maps.googleapis.com/maps/api/distancematrix/json?origins=
        ${origin.description}&destinations=${destination.description}&units
        imperial&key=${GOOGLE_MAPS_APIKEY}`

       const getTravelTime = async () => {
            fetch(URL).then((res) => res.json()).then((data) => {console.log(data, 'norm');
            console.log(data.rows[0].elements[0], 'rowss');
            dispatch(settimeTravelInformation(data.rows[0].elements[0]))})
       } 
    
        getTravelTime()


    }, [origin, destination, GOOGLE_MAPS_APIKEY])
  return (
    <MapView
        ref = {mapRef}
        style={tw`flex-1`}
        mapType='mutedStandard'
        initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }}
    >

        { origin && destination && (
            <MapViewDirections
            origin= {origin.description}
            destination={destination.description}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={2}
            strokeColor='black'
            />

        )

        }
        {
            origin?.location && (
                <Marker 
                coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                }}
                title='Origin'
                description={origin.description}
                identifier='origin'
                />
            )
        }

{
            destination?.location && (
                <Marker 
                coordinate={{
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                }}
                title='destination'
                description={destination.description}
                identifier='destination'
                />
            )
        }

    </MapView>
  )
}

export default Maps