import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner";


const CitiesContext = createContext();

const initialState = {
    info: [],
    isLoading:false,
    currentCity:{}
}

 function reducer(state, action){

  switch(action.type){
      case "loading":
        return{
          ...state,
          isLoading:true
        }
      case "cities/loaded":
          return {
            ...state,
            isLoading:false,
            info:action.payload
          }
      case "city/loaded":
        return {
          ...state,
          isLoading:false,
          currentCity:action.payload
        }
      case "city/created":
        return {
          ...state,
          isLoading:false,
          info:[...state.info, action.payload],
          currentCity:action.payload
        }
      case "city/deleted":
        return {
          ...state,
          isLoading:false,
          info:state.info.filter((cityy)=> cityy.id !== action.payload),
          currentCity:{}
          
        }
      case "rejected":
        return {
          ...state,
          isLoading:false,
          error:action.payload
        }
      default:{
        throw new Error("Unknow action type")
      }
  }

  
    
}

function CitiesProvider({children}){

  const [{info, isLoading, currentCity}, dispatch] = useReducer(reducer, initialState);

  // const [info, setInfo] = useState([]);
  // const [isLoading, setIsloading] = useState(false);
  // const [currentCity, setcurrentCity] = useState({});

  useEffect(()=>{
    async function fetchCitiesAndCountries() {
      dispatch({type:"loading"});

      try {
        const response = await fetch("https://worldwise-trip.netlify.app/cities"); 
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
    
        const data = await response.json();
    
        dispatch({type:"cities/loaded", payload:data})
    
      }catch{
        dispatch({type:'rejected', payload:"there was an error in loading the cities"})
      }
     
    }
    
    fetchCitiesAndCountries();
    
  },[])



  async function getCity(id){
    if( Number(id) === currentCity.id) return;

    dispatch({type:"loading"})

    try {
     
      const response = await fetch(`http://localhost:5174/cities/${id}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const data = await response.json();

      dispatch({type:"city/loaded", payload:data})

    }catch{
      dispatch({type:'rejected', payload:"there was an error in loading the cities"})
    }
   
  }

  async function createCity(newCity){
    dispatch({type:"loading"})
    try{
      const createCityData = await fetch(`https://worldwise-trip.netlify.app/cities`,{
        method:"POST",
        body:JSON.stringify(newCity),
        header:{
          "content-type":"application/json"
        }

      })

      const data = await createCityData.json();
    
      dispatch({type:"city/created", payload:data})
    

    }catch{
    
      dispatch({type:"rejected", payload:"There is an error in loading data"})

    }
   
  }

  async function deleteCity(id){
    dispatch({type:"loading"})
    try{
      await fetch(`https://worldwise-trip.netlify.app/cities/${id}`,{
        method:"delete",
      })

      dispatch({type:"city/deleted", payload:id})

    }catch{
        dispatch({type:"rejected", payload:"there is an error in deleting the data"})
    }
  }

  
  return (
        <CitiesContext.Provider value={{
                    info,
                    isLoading,
                    currentCity,
                    getCity,
                    createCity,
                    deleteCity
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