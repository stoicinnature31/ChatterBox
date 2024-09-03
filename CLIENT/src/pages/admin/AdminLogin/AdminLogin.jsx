import React from 'react'
import "./AdminLogin.css"
import { useInputValidation } from '6pp'
import { Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'


const AdminLogin = () => {


    // Submit Handler
    const submitHandler = (e) => {
        e.preventDefault()
        console.log("submit")
    }

    const secretKey = useInputValidation("");

    const isAdmin = true;

    if (isAdmin) return <Navigate to="/admin/dashboard" />

    return (
        <div className="container">
            <div className="heading">Admin Login</div>
            <form action="" className="form">


                <input
                    required=""
                    className="input"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={secretKey.value}
                    onChange={secretKey.changeHandler}
                />
                {/* {password.error && (
                    <Typography color="error" variant="caption" padding={"2px"}>
                        {password.error}
                    </Typography>
                )} */}
                <span className="forgot-password">
                    <a href="#">FORGOT PASSWORD ?</a>
                </span>
                <input
                    className="login-button"
                    type="submit"
                    value="Sign In"
                    onSubmit={submitHandler}
                />
            </form>


        </div>
    )
}

export default AdminLogin
