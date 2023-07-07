import { Link, useNavigate } from 'react-router-dom';
import './login.css'
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
function Login() {

    const { login } = useContext(AuthContext);


    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [err, setErr] = useState(null);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e) => {

        e.preventDefault();
        try {
            await login(inputs);
            navigate("/")
        } catch (err) {
            if (err.response?.status === 401) {
                setErr("Invalid email or password");
            } else if (err.response?.status === 404) {
                setErr("User doesn't exist");
            } else {
                console.log(err);
            }

        }


        //     e.preventDefault();
        //     setError("");
        //     const user = {
        //         id: 1,
        //         username: email,
        //         img: "https://media.licdn.com/dms/image/D4D03AQHCq385fHY7NQ/profile-displayphoto-shrink_800_800/0/1667140980041?e=2147483647&v=beta&t=8ZlApi5-pdNR2bVXO7wzdECfCC9XU44Voa5CNT3Y390"
        //     }

        //     axios.post('http://127.0.0.1:4001/api/auth/login', { email, password }, {
        //         headers: { withCredentials: true }

        //     }).then((res) => {
        //         console.log(res);
        //         if (res.status !== 200) {
        //             console.log("something wrong!")
        //         }

        //     }).catch((err) => {

        //         if (err.response?.status === 401) {
        //             setError("Invalid email or password");
        //         } else if (err.response?.status === 404) {
        //             setError("User doesn't exist");
        //         } else {
        //             console.log(err);

        //         }
        //     })
        //  login(user);


    }
    return (
        <div className="login">
            <div className='card'>
                <div className='left'>
                    <div className='heading'>
                        <h1>Welcome to</h1> <span className='logo'>Fakebook!</span>
                    </div>

                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
                    <span>Don't have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>


                </div>
                <div className='right'>
                    <span className='title'>Login</span>
                    <form>
                        <input type="text" placeholder='Username' name='username' value={inputs.username} onChange={handleChange} />
                        <input type="text" placeholder='Password' name='password' value={inputs.password} onChange={handleChange} />
                        <button onClick={handleLogin}>Log In</button>

                        {err && <p>
                            {err}
                        </p>}

                    </form>
                    <a href="/register"><span className='link'>Don't have an account?</span></a>
                </div>
            </div>
        </div>
    );
}

export default Login;

