import React, { createContext,useReducer ,useEffect} from 'react';
import {linkReducer} from "../reducers/linkReducer";

export const LinkContext = createContext();

const LinkContextProvider =(props)=> {

  const [links,dispatch] =useReducer(linkReducer,[],()=>{
    const localData = localStorage.getItem('links');
    return localData? JSON.parse(localData) :[]
  });

  useEffect(()=>{
    localStorage.setItem('links',JSON.stringify(links));
  },[links])

  return (
    <LinkContext.Provider value={{links,dispatch}}>
      {props.children}
    </LinkContext.Provider>
  );
  
}
export default LinkContextProvider;