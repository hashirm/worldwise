import React from 'react'
import styles from './PageNav.module.css'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'

export default function PageNav() {

    

  return (
    <nav className={styles.nav}>
        
        <Logo/>
        
        <ul>
            <li>
                <NavLink to="/Pricing">
                    PRICING
                </NavLink>
            </li>
            <li>
                <NavLink to="/product">
                    PRODUCT
                </NavLink>
            </li>
            <li>
                <NavLink to="/Login" className={styles.ctaLink}>
                        LOGIN
                </NavLink>
            </li>
        </ul>

    </nav>
  )
}
