import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import { useState } from 'react';
import axios from 'axios';

function Register() {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        name: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleInputs(event) {
        var name = event.target.name;
        var value = event.target.value;

        setInputs((prev) => (
            { ...prev, [name]: value }
        ));
    }


    function register(event) {
        event.preventDefault();
        axios.post('http://127.0.0.1:4001/api/user/register', inputs)
            .then((res) => {
                if (res.status === 200) navigate('/login');
            })
            .catch((err) => {
                if (err.response.status === 400) setError(err.response.data.error);
                console.log(err);
            })
    }
    return (
        <div className="register">
            <div className='card'>

                <div className='left'>
                    <span className='title'>Register</span>
                    <form>
                        <input type="text" placeholder='Username' name='username' value={inputs.username} onChange={handleInputs} />
                        <input type="text" placeholder='Email' name='email' value={inputs.email} onChange={handleInputs} />
                        <input type="text" placeholder='Name' name='name' value={inputs.name} onChange={handleInputs} />
                        <input type="text" placeholder='Password' name='password' value={inputs.password} onChange={handleInputs} />
                        <button onClick={register}>Register</button>
                        {error && <p>{error}</p>}
                    </form>
                    <a href="/login"><span className='link'>Already have an account?</span></a>
                </div>
                <div className='right'>
                    <div className='heading'>
                        <h1>Welcome to</h1> <span className='logo'>Fakebook!</span>
                    </div>

                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
                    <span>Already have an account?</span>

                    <Link to="/login">
                        <button>Log In</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;

