import React from 'react';
import './login.css';


function Login() {
    return (
        <div className='body-login'>
        <div className="container-login">
            <div className="brand-logo"></div>
            <div className="brand-title">TSAKIN</div>
            <div className="inputs">
                <label>EMAIL</label>
                <input type="email" placeholder="example@test.com" />
                <label>PASSWORD</label>
                <input type="password" placeholder="Min 6 characters long" />
                <button className='button-login' type="submit">LOGIN</button>
            </div>
         
        </div>
        </div>
    );
}

export default Login;
