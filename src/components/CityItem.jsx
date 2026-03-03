import React from 'react'
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import { useCities } from './context/CitiesContext';
export default function CityItem({info}) {
  const {currentCity, deleteCity} = useCities();
   const {cityName, emoji, date, id, position} = info;

   function handleDelete(e){
      e.preventDefault();
      deleteCity(id)

   }

  return (
      
      <li>
        <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={`${styles.cityItem}  ${id == currentCity.id ? styles['cityItem--active']:""}`}>
          <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.name}>{cityName}</h3>
          <time className={styles.date}>{date.split("T")[0]}</time>
          <button className={styles.deleteBtn} onClick={handleDelete}>&times;</button>
        </Link>
      </li>
    
    
  )
}
