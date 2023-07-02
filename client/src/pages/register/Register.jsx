import { Link } from 'react-router-dom';
import './register.css';


function Register() {
    return (
        <div className="register">
            <div className='card'>

                <div className='left'>
                    <span>Register</span>
                    <form>
                        <input type="text" placeholder='Username' name='username' />
                        <input type="text" placeholder='Email' name='email' />
                        <input type="text" placeholder='Name' name='name' />
                        <input type="text" placeholder='Password' name='password' />
                        <button>Register</button>
                    </form>
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

