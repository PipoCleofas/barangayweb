import { useState } from "react";
import axios from 'axios';

export function useHandleClicks() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleUsernameChange(username: string) {
        setUsername(username);
    }

    function handlePasswordChange(password: string) {
        setPassword(password);
    }

    const onLoginClick = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>, 
        navigate: any,
        username: string,
        password: string
    ) => {
        e.preventDefault();
        
        try {
            if (!username || !password) {
                setError('Username or password cannot be empty');
                return; 
            }
    
            const response = await axios.get('http://192.168.100.127:3000/barangay/getBarangay', {
                params: {
                    username: username,
                    password: password
                }
            });
            
            if (response.status === 200) {
                console.log('Login successful:', response.data);
                setError(''); 
    
                localStorage.setItem('username', username);
    
                navigate('/mainpage'); 
            } 
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                setError(error.response.data.message);
                console.error(error);
            } else {
                console.error("Error during login click:", error);
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };
    
    

    return {
        handlePasswordChange,
        handleUsernameChange,
        onLoginClick,
        error,
        username,
        password,
    };
}