import React from 'react'
import {useCities } from './context/CitiesContext'
import styles from './CityList.module.css'
import CityItem from './CityItem'
import Spinner from './Spinner'
import Message from './Message'



export default function CityList() {
  const {info, isLoading} = useCities();

  if(isLoading) return <Spinner/>
  if(!info.length) return <Message message="data is not exist"/>


  return (
    
    <ul className={styles.cityList}>{

      info.map((city) => (

        city.id &&  <CityItem key={city.id} info={city}/>
        )
      )
    }
    </ul>
  )
}
