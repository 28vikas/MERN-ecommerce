import axios from 'axios';
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import { setAuthToken } from '../../utils/auth';
import { toast } from 'react-hot-toast';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const API_URL = `http://localhost:5000/api/auth/login`;

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL, {email, password});
            if (response.status === 200) {
               setAuthToken(); 
                navigate('/admin/dashboard');
                toast.success("Login Successfully", {
                    position: 'top-right',
                });
            } else {
                console.log('Not working');
                toast.error("Oops someting went wrong", {
                    position: 'top-right',
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 d-flex flex-column justify-content-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-8 w-100">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6"
                        onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input id="email" name="email" type="email" autoComplete="email" required
                                    value={email}
                                    onChange={
                                        (e) => setEmail(e.target.value)
                                    }
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input id="password" name="password" type="password" autoComplete="current-password" required
                                    value={password}
                                    onChange={
                                        (e) => setPassword(e.target.value)
                                    }
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                            </div>
                        </div>

                        <div className='text-center'>
                            <p>Dont Have Account ? <Link to="/admin/signup">Signup</Link></p>
                            <button type="submit" className="p-2 bg-primary rounded my-2">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
