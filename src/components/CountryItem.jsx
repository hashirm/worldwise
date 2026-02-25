import React from 'react'
import styles from "./CountryItem.module.css";

function CountryItem({ countryItem }) {
  
  const {country, emoji} = countryItem;

  return (
    <li className={styles.countryItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name} >{country}</h3>
    </li>
  );
}

export default CountryItem;
