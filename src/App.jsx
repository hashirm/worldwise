
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import './index.css'
import AppLayout from './pages/AppLayout'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import { CitiesProvider } from './components/context/CitiesContext'


function App() {
  

  
  // console.log(info)

  return (
    
      <BrowserRouter>
        <CitiesProvider>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="App" element={<AppLayout/>}>
            <Route index element={<Navigate replace to="cities"/>}/>
              <Route path='cities' element={<CityList/>}/>
              <Route path='cities/:id' element={<City/>}/>
              <Route path='form' element={<Form/>}/>
              <Route path='countries' element={<CountryList/>}/>
            </Route>
          <Route path="/product" element={<Product/>} />
          <Route path="/pricing" element={<Pricing/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
        </CitiesProvider>
      </BrowserRouter>
  
  )
}

export default App
