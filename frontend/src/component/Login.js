import React, { useContext, useState } from 'react';
import { MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { contextapi } from '../Contextapi';
import toast from 'react-hot-toast';

const Login = () => {

    const navigate = useNavigate()

    const { setLoginName } = useContext(contextapi)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    function handleLogin(e) {
        e.preventDefault()
        setLoading(true);  // Start loading
        
        const Logindata = { username, password }

        fetch("/backend/Login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Logindata)
        })
            .then((res) => { return res.json() })
            .then((data) => {
                setLoading(false);  // Stop loading
                if (data.status === 200) {
                    localStorage.setItem("loginname", data.apiData)
                    setLoginName(localStorage.getItem("loginname"))
                  
                    navigate(data.apiData === "admin" ? "/admindashboard" : "/");
                    toast.success(data.message);

                } else {
                   
                    toast.error(data.message)
                }

            })

            .catch((error) => {
                setLoading(false);
                console.error("Login Error: ", error);
                toast.error("Something went wrong. Please try again.");
            });

    }


    return (
        <div className='container pt-5 ' id='bg_shadow'>
            <div className='row m-3'>
                <div className='col-md-5 py-4 px-4 rounded-3 m-auto animate__animated animate__zoomIn' id='reg_form'>

                    <div className='d-flex align-items-center justify-content-between p-2'>
                        <h3 className='m-0' id='reg_heading'>Login</h3>
                        <img src='/food.png' alt='...' className='w-25' />
                    </div>

                    <form onSubmit={(e) => { handleLogin(e) }}>
                        <MDBInput value={username} onChange={(e) => setUsername(e.target.value)} label='Username' id='username' type='text' required className='mb-3' />
                        <MDBInput value={password} onChange={(e) => setPassword(e.target.value)} label='Password' id='password' type='password' required className='mb-3' />
                        <button className='form-control btn btn-info' id='loginbtn'>{loading ? 'Logging in...' : 'Login'}</button>
                        <p className='text-center mt-2'>Don't have an account? <Link id='sign_in' to='/Registration'>Sign up</Link></p>
                        <p className='text-center m-0'><Link to='/forget'>Forget password?</Link></p>
                    </form>

                </div>
            </div>
        </div>
    )
};

export default Login