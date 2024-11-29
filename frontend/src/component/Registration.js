import React, { useState } from 'react';
import { MDBInput } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Registration = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    function handleReg(e) {
        e.preventDefault();

        if (!username || !password || !email) {
            toast.error("All fields are required");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        const formdata = { username, password, email };
        setLoading(true);
        // console.log(username, password, email);

        fetch("/backend/Register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formdata)
        })
            .then((res) => { return res.json() })
            .then((data) => {
                setLoading(false);
                if (data.status === 201) {
                    // toast.success(data.message)
                    toast.success(data.message || "Registration successful!");
                    setUsername('');
                    setPassword('');
                    setEmail('');

                    navigate('/Login');
                    // setMessage(data.message)
                } else {
                    // toast.error(data.message)
                    toast.error(data.message || "Registration failed.");
                    // setMessage(data.message)
                }
            })

            .catch((err) => {
                setLoading(false);
                toast.error(err.message || "Something went wrong. Please try again.");
            });
    }

    return (
        <div className='container pt-5' id='bg_shadow'>
            <div className='row m-3'>
                <div className='col-md-5 py-4 px-4 rounded-3 m-auto animate__animated animate__zoomIn' id='reg_form'>

                    <div className='d-flex align-items-center justify-content-between p-2'>
                        <h3 className='text-center m-0' id='reg_heading'>Create Your Account</h3>
                        {/* <h5>{message}</h5> */}
                        {/* <img src='/food.png' alt='...' className='w-25' /> */}
                    </div>

                    <form onSubmit={(e) => { handleReg(e) }}>
                        <MDBInput value={username} onChange={(e) => setUsername(e.target.value)} label='Username' id='username' type='text' required className='mb-4' />
                        <MDBInput value={password} onChange={(e) => setPassword(e.target.value)} label='Password' id='password' type='password' required className='mb-4' />
                        <MDBInput value={email} onChange={(e) => setEmail(e.target.value)} label='Email' id='email' type='email' required className='mb-4' />
                        <button className='form-control btn' style={{ backgroundColor: '#007bff', color: '#fff' }} id='loginbtn' disabled={loading}>{loading ? <><span className="spinner-border spinner-border-sm"></span> Registering...</> : "Register"}</button>
                        <p className='text-center mt-2 mb-0'>Already have an account? <Link id='sign_in' to='/Login'>Sign in</Link></p>
                    </form>

                </div>
            </div>
        </div>
    )
};

export default Registration