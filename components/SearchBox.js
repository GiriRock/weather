import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import {
  useLoadScript,
  Autocomplete,
} from '@react-google-maps/api'
const scriptOptions = {
  googleMapsApiKey: "AIzaSyChIXIBopSYa6KfoV6v8K0KrPj4nTVDBnA",
  libraries: ['places'],
}



export default function SearchBox({ title }) {
  const router = useRouter();
  const { isLoaded, loadError } = useLoadScript(scriptOptions)
  const [autocomplete, setAutocomplete] = useState(null)
  const inputEl = useRef(title ? title : null)

  // Handle the keypress for input
  const onKeypress = (e) => {
    // On enter pressed
    if (e.key === 'Enter') {
      e.preventDefault()
      return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const onLoad = (autocompleteObj) => {
    setAutocomplete(autocompleteObj)
  }

  const onPlaceChanged = (e) => {
    if (autocomplete) {
      const place = autocomplete.getPlace()
      if ('place_id' in place) {
        console.log(place)
        router.push(`/location/${place.place_id}`)
      }
    }
  }

  return (
    <div className= "p-10">
      { loadError && (
        <div>Google Map script cannot be loaded, please reload the page</div>
      ) }

      { isLoaded && (
        <React.Fragment>
          <form className="flex" onSubmit={handleSubmit}>
            <div className="w-full">
              <Autocomplete
                onLoad={onLoad}
                fields={['place_id']}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  ref={inputEl}
                  type="text"
                  className="form-input"
                  placeholder="Choose your location"
                  onKeyPress={onKeypress}
                />
              </Autocomplete>
            </div>
          </form>
        </React.Fragment>
      ) }
    </div>
  )
}
