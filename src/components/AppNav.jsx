import React from 'react'
import styles from './AppNav.module.css'
import { Link, NavLink } from 'react-router-dom'


export default function AppNav() {
  return (

    <nav className={styles.nav}>
        <ul>
            <li>
                <NavLink to="cities">
                    City
                </NavLink>
            </li>
            <li>
                <NavLink to="countries">
                    Countries
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}
