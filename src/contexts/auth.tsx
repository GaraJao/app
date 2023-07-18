import React, { createContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import axios from "axios";

type AuthContext = {
    signIn: any;
    user: any;
    token: any;
};

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export default function authProvider({ children }: { children: any }) {

    const [user, setUser] = useState({});
    const [token, setToken] = useState({});
    const navigation = useNavigation();

    async function signIn(login: string, password: string) {
        await axios.post(
            "https://garajao-dev.vercel.app/api/users/login",
            { login, password },
            { headers: { 'Content-Type': 'application/json', } },
        ).then((response) => {
            const user = response.data.user;
            const token = response.data.token;

            setUser({ user })
            setToken({ token })

            navigation.reset({
                index: 1,
                routes: [{ name: 'Home' }]
            });
        }).catch((error) => {
            if (error.response)
                Alert.alert("Attention", error.response.data.message);
        });
    }

    return (
        <AuthContext.Provider value={{ signIn, user, token }}>
            {children}
        </AuthContext.Provider>
    )
}