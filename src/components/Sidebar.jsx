import React from 'react'
import AppNav from './AppNav'
import Logo from './Logo'
import StyleSheet from './Sidebar.module.css'
import { Outlet } from 'react-router-dom'


export default function Sidebar() {
  return (
    <div className={StyleSheet.sidebar}>
        <Logo/>
        <AppNav/>
        <Outlet/>
        <footer className={StyleSheet.footer}>
          <p className={StyleSheet.copyright}>
            &copy; Copyright {new Date().getFullYear()} by Worldwise Inc
          </p>
        </footer>
    </div>
  )
}
