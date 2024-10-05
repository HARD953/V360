import axios from "axios";
import { useEffect, useState } from "react";
import React,{ createContext } from "react";
import {BASE_URL} from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext=createContext();

export const AuthProvider =({children})=>{
    const [loading,setIsLoading]=useState(false)
    const [userInfo,setUserinfo]=useState({})
    const [splashLoagin, setSplashLoading]=useState(false)
    const [dat,setDat]=useState([])
    const [data1,setData1]=useState("")
    const [loading1,setLoading1]=useState(true)
    const [loading2,setLoading2]=useState(true)

    const register = (name, email, password) => {
        setIsLoading(true);
        axios
          .post(`${BASE_URL}/register`, {
            name,
            email,
            password,
          })
          .then(res => {
            let userInfo = res.data;
            setUserinfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
          })
          .catch(e => {
            console.log(`register error ${e}`);
            setIsLoading(false);
          });
      };

    const login=(email,password)=>{
        setIsLoading(true);
        axios
        .post('https://api.visitrack360.com/api/token/',{
            email,password
        }).then(res=>{
            let userInfo=res.data
            setUserinfo(userInfo)
            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo))
            setIsLoading(false)
        }).catch(e=>{
            console.log(e)
            setIsLoading(false)
        })
    }
    
    const logout =()=>{
        setIsLoading(true)
        AsyncStorage.removeItem('userInfo');
        setUserinfo({});
        setIsLoading(false);

    }

    const isLoggedIn= async()=>{
        try{
            setSplashLoading(true)
            let userInfo= await AsyncStorage.getItem('userInfo')
            userInfo=JSON.parse(userInfo);
            if (userInfo) {
                setUserinfo(userInfo)
            }
            setSplashLoading(false)
        } catch(e){
            console.log(e)
            setSplashLoading(false)
        }
    };

    useEffect(()=>{
        isLoggedIn;
    },[]);

    const userconnecte=(data)=>{
        const url1="https://api.visitrack360.com/api/detailadimn/"
        useEffect(()=>{
            getListTrans();
            return()=>{
            }
        },[])

        getListTrans=()=>{
            fetch(url1, { 
            method:'GET',
            headers: new Headers({
                'Authorization':  `Bearer ${data}`,  
            }),
        })
            .then((res)=>res.json())
            .then((json)=>setData1(json.data[0]))
            .catch((error)=>console.log(error))
            .finally(()=>setLoading1(false))
        }
    }
    

    const Info=(data)=>{
        const url=`https://apidons.herokuapp.com/cibleargent/${data.user_name}/`
        useEffect(()=>{
            getListTranss();
            return()=>{
            }
        },[])
        getListTranss=()=>{
            fetch(url)
            .then((res)=>res.json())
            .then((json)=>setDat(json.data))
            .catch((error)=>console.log(error))
            .finally(()=>setLoading2(false))
        }
    }

    
    return (<AuthContext.Provider value={{ splashLoagin, register,logout,login,loading,userInfo,Info,dat,userconnecte,data1,loading1,loading2 }}>{children}</AuthContext.Provider>);
}



