import React from 'react'
import Sidebar from '../components/Sidebar'
import Styles from './AppLayout.module.css'
import Map from '../components/Map'
import User from '../components/User'

export default function AppLayout() {
  return (
    <div className={Styles.app}>
        <Sidebar/>
        <Map/>
        <User/>
    </div>
  )
}
