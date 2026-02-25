import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner";

const CitiesContext = createContext();


function CitiesProvider({children}){

  const [info, setInfo] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [currentCity, setcurrentCity] = useState({});



  useEffect(()=>{
    async function fetchCitiesAndCountries() {
      try {
        setIsloading(true);
        const response = await fetch("http://localhost:5174/cities");
    
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
    
        const data = await response.json();

        // Extract cityName and country
        // const result = data.map(item => {
        //   return item;
        // });
    
         setInfo(data);
    
      }catch (error) {
          console.error("Error:", error.message);
      }finally{
        setIsloading(false);
      }
    }
    fetchCitiesAndCountries();
    
   
  },[])



  async function getCity(id){

    try {
      setIsloading(true);
      const response = await fetch(`http://localhost:5174/cities/${id}`);
      
  
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const data = await response.json();

      // Extract cityName and country
      // const result = data.map(item => {
      //   return item;
      // });

      // console.log(data)
  
       setcurrentCity(data);
  
    }catch (error) {
        console.error("Error:", error.message);
    }finally{
      setIsloading(false);
    }
  
  }

  

    return (
        <CitiesContext.Provider value={{
                    info:info,
                    isLoading:isLoading,
                    currentCity:currentCity,
                    getCity:getCity
                     }}>
                {children}
        </CitiesContext.Provider>

    )
}

function useCities(){
  const context = useContext(CitiesContext);
  return context
}

export {CitiesProvider, useCities};