import React, { useState } from 'react'
import Pin from './Pin'
import { useDispatch, useSelector } from 'react-redux'
import { updateViewCoordinates } from '../actions/map'
import { Link } from 'react-router-dom'

import InteractiveMap, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl'

import { API_KEY } from '../../secrets'

function MapForPlacingMarker() {
  
  const viewCoordinatesRedux = useSelector((state: any) => state.map)
  const dispatch = useDispatch()

  const initialState = {
    longitude: 174.774,
    latitude: -41.2969,
    zoom: 3.5
  }

  const [viewCoordinatesState, setViewCoordinatesState] = useState({...viewCoordinatesRedux})
  
  function saveViewStateToRedux() {
    dispatch(updateViewCoordinates({...viewCoordinatesState}))
  }
  
  const [buttonStyle, setButtonStyle] = useState({
    display: 'none',
    color: '#4BB543'
  })

  return (
    <div 
      style={{ 
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
   
      }}
    >
      <InteractiveMap
        initialViewState={{ ...initialState }}
        style={{ height: 300, width: '100%' }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        onMove={(evt) => {
          setViewCoordinatesState(evt.viewState)
        }}
        mapboxAccessToken={API_KEY}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

          <Marker
            key={'centred-marker'}
            longitude={viewCoordinatesState.longitude}
            latitude={viewCoordinatesState.latitude}
          >
            <Pin />
          </Marker>
      </InteractiveMap>

      <button className='button is-primary is-small mx-4'
      onClick={(e) => {
          e.preventDefault()
          setButtonStyle({
            display: 'block',
            color: '#4BB543'
          })
          saveViewStateToRedux()
        }}
      >
        <b>Add</b><i className="fa-solid fa-location-dot mx-2"></i>
      </button>
      
      <p style={buttonStyle}>
        Marker Placed!
      </p>
    </div>
  )
}

export default MapForPlacingMarker
