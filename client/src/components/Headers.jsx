import './css/header.css';
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Headers = () => {

  const [userData, setUserdata] = useState({});
    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:8080/login/sucess", { withCredentials: true });
            setUserdata(response.data.user)
        } catch (error) {
            console.log("error", error)
        }
    }

    //logout
    const logout = () =>{
        window.open("http://localhost:8080/logout","_self")
    }

    useEffect(() => {
        getUser()
    }, [])

  return (
    <>
            <header>
                <nav>
                    <div className="left">
                        <h1>App Logo</h1>
                    </div>
                    <div className="right">
                        <ul>
                            <li>
                                <NavLink to="/">
                                    Home
                                </NavLink>
                            </li>
                            {
                                Object?.keys(userData)?.length > 0 ? (
                                    <>
                                    <li style={{color:"black", fontWeight:"bold"}}>{userData?.displayName}</li>
                                        <li>
                                            <NavLink to="/dashboard">
                                                Dashboard
                                            </NavLink>
                                        </li>
                                        <li onClick={logout}>Logout</li>
                                        <li>
                                            <img src={userData?.image} style={{ width: "50px", borderRadius: "50%" }} alt="" />
                                        </li>
                                    </>
                                ) : <li>
                                    <NavLink to="/login">
                                        Login
                                    </NavLink>
                                </li>
                            }
                        </ul>
                    </div>
                </nav>
            </header>
        </>
  )
}

export default Headers;
