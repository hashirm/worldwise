import React, { useContext} from 'react'
import { useCities } from './context/CitiesContext'
import Spinner from './Spinner'
import CountryItem from './CountryItem';
import Message from './Message';
import styles from './CountryList.module.css'

export default function CountryList() {

  const {isLoading, info} = useCities();

    if(isLoading) return <Spinner/>;
    if(!info.length) return <Message message="countries data does not exist"/>
  return (
    
    <ul className={styles.countryList}>
        {
            info.map((countryItem) => (
                <CountryItem key={countryItem.id} countryItem={countryItem} />
            ))
        }
    </ul>
    
  )
}
