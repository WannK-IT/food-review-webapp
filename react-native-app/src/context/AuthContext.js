import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { apiAdress } from '../api/apiAddress';
import { messageToast } from '../functions';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Register
    const register = (fullname, email, password) => {
        setIsLoading(true);

        axios.post(`${apiAdress}register`, {
            fullname,
            email,
            password,
        }, {
            validateStatus: function(status){
                return true;
            }
        }).then((response) => {
            setIsLoading(false)
            if(response.data.success == false){
                messageToast('error', 'Lỗi 🚧', response.data.message)
            }else if(response.data.success == true){
                messageToast('success', 'Thành công 👋', response.data.message)
            }
        }).catch((error) => {
            console.log("Lỗi: ", error);
            setIsLoading(false)
        })
    }

    // Login
    const login = (email, password) => {
        setIsLoading(true);

        axios.post(`${apiAdress}login`, {
            email,
            password,
        }, {
            validateStatus: function(status){
                return true;
            }
        }).then((response) => {
            setIsLoading(false)
            if(response.data.success == false){
                messageToast('error', 'Lỗi 🚧', response.data.message)
            }else if(response.data.success == true){
                let userInfo = response.data.data
                setUserInfo(userInfo)
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
                messageToast('success', 'Thành công 👋', response.data.message)
            }
        }).catch((error) => {
            console.log("Lỗi: ", error);
            setIsLoading(false)
        })
    }

    // Logout
    const logout = () => {
        setIsLoading(true);

        axios.post(`${apiAdress}logout`, {}, {
            validateStatus: function(status){
                return true;
            },
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`
            }
        }).then((response) => {
            AsyncStorage.removeItem('userInfo')
            setUserInfo({})
            setIsLoading(false)
        }).catch((error) => {
            console.log("Lỗi: ", error);
            setIsLoading(false)
        })
    }

    // Check status Login
    const isLoggedIn = async () => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if(userInfo){
                setUserInfo(userInfo)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        isLoggedIn()
    }, [])
    
  return (
    <AuthContext.Provider value={{
        isLoading, 
        userInfo, 
        register, 
        login, 
        logout
    }}
    >
        {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider}
