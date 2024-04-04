import axios from "axios";
import { UserCreation } from "../models/user_model";
import { urlSignUp, urlLogin } from "../utils/endpoints";
import { useNavigate } from "react-router";

function getIdentity(){
    const identity = JSON.parse(localStorage.getItem('identity')!);
    if(identity){
        return identity;
    }else{
        return null;
    }
}

function getToken(){
    const token = localStorage.getItem('token');
    if(token){
        return token;
    }else{
        return null;
    }
}

export async function registrarUsuario(usuario: UserCreation): Promise<boolean> {
    var result = false;

    try {
        await axios
            .post(urlSignUp, usuario)
            .then((response) => {
                if (response.status === 200) {
                    result = true;
                }
            })
            .catch((error) => {
                throw error;
            });
    } catch (error) {
        throw error;
    }

    return result;
}

export async function loginUser(email: string, password: string): Promise<boolean> {
    var result = false;

    try {
        await axios
            .post(urlLogin, { email: email, password: password })
            .then((response) => {
                if (response.status === 200) {
                    var token = response.data.token;
                    var identity = JSON.stringify(response.data.user);

                    localStorage.setItem("token", token);
                    localStorage.setItem("identity", identity);
                    result = true;
                }
            })
            .catch((error) => {
                throw error;
            });
    } catch (error) {
        throw error;
    }

    return result;
}

function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('identity');

    const navigate = useNavigate();
    navigate('/');
}

export {getIdentity, getToken, logout};