
import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { SignupInput } from "@0xnas/medium-common"
import Button from './Button'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export default function Auth({ type }: { type: "signup" | "signin" }) {
    const nav = useNavigate();

    const [dataInput, setDataInput] = useState<SignupInput>({
        email: "",
        password: "",
        name: "",
    })

    const handleSignup = async () => {
        // console.log(dataInput);
        try {

            const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signin' ? 'signin' : 'signup'}`, JSON.stringify(dataInput));
            localStorage.setItem('token', res.data.token)
            nav('/blogs')

        } catch (error) {
            // 
            console.log(error);

        }

    }

    return (
        <div className='h-screen flex justify-center flex-col'>
            <div className='flex justify-center '>
                <div>
                    <div className='px-10'>
                        <div className='text-3xl font-extrabold'>
                            {type === 'signin' ? 'Sign in to your account' : 'Create an account'}
                        </div>
                        <div className='text-slate-500  '>
                            {type === "signin" ? "Don't have an account?" : "Already have an account ?"}<span className='text-blue-600 underline pl-2'><Link to={type === "signin" ? '/signup' : '/signin'} >{type == "signin" ? 'Signup' : 'Login'}</Link></span>
                        </div>

                    </div>
                    <div className='pt-4'>
                        {type === 'signup' && <LabelledInput label='User Name' placeholder='please enter your username' onChange={(e) => {
                            setDataInput((d) => ({ ...d, name: e.target.value }))
                        }} />}
                        <LabelledInput label='Email' placeholder='please enter your email' onChange={(e) => {
                            setDataInput((d) => ({ ...d, email: e.target.value }))
                        }} />
                        <LabelledInput label='Password' type="password" placeholder='please enter you password' onChange={(e) => {
                            setDataInput((d) => ({ ...d, password: e.target.value }))
                        }} />
                        <Button title={type == "signin" ? "Sign In" : "Sign Up"} onClick={handleSignup} />
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputType { label: string, placeholder: string, type?: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void }


function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white pt-4">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>

    )
}
