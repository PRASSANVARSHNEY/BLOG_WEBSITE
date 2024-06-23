import React from 'react'
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import {URL} from '../url'
export const UserContext = createContext({})
export default function UserContextProvider(children) {
    const [user, setUser] = useState({})
    useEffect(() => {
        axios.get(URL + '/api/user/me')
       .then(res => {
            setUser(res.data)
        })
       .catch(err => {
            console.log(err)
        })
    }, [])
    const getUser = async()=>{
        try{
            const res = await axios.get(URL + '/api/user/me')
            setUser(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}
