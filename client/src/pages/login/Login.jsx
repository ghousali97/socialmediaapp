import { Link, useNavigate } from 'react-router-dom';
import './login.css'
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const user = {
            id: 1,
            username: username,
            img: "https://media.licdn.com/dms/image/D4D03AQHCq385fHY7NQ/profile-displayphoto-shrink_800_800/0/1667140980041?e=2147483647&v=beta&t=8ZlApi5-pdNR2bVXO7wzdECfCC9XU44Voa5CNT3Y390"
        }

        login(user);
        navigate('/');

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
                    <span>Login</span>
                    <form>
                        <input type="text" placeholder='username' name='username' value={username} onChange={(e) => {
                            let username = e.target.value;
                            setUsername(username);
                        }} />
                        <input type="text" placeholder='password' name='password' value={password} onChange={(e) => {
                            let password = e.target.value;
                            setPassword(password);
                        }} />
                        <button onClick={handleLogin}>Log In</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

