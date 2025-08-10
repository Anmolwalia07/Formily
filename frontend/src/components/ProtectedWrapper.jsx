import axios from "axios";
import { useEffect, useState } from "react"
import { useUser } from "../UserContext";
import Loading from "./Loading";

export default function ProtectedWrapper({children}) {

    const {setUser}=useUser();
    const [isLoading,setIsLoading]=useState(true);
    const token=localStorage.getItem('token'); 
     
    useEffect(()=>{
        
        if(!token) return;
        axios.get(`${import.meta.env.VITE_API_Server}/api/verifyUser`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(res=>{
            if(res.status===200){
                setUser(res.data.user);
                setIsLoading(false)
            }
        }).catch(err=>{
            setIsLoading(false)
        })
    },[token])

    if(isLoading) return <Loading/>
  return (
    {children}
  )
}
