import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/styles.css';
import service from '../apis/apis';

const Login = () => {
    const [token, setToken] = useState('');

    const navigate=useNavigate();

    const makeLoginCall = async (e) => {
        e.preventDefault();
        service.login(token).then(result => {
            localStorage.setItem('token', token);
            navigate('/');
        }).catch(err => alert(err.message));
    }

    return <div className='loginComponent'>
            <div className='login'>
                <img src='https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png' className='image'/>
                <input type='text' required={true} onChange={e => setToken(e.target.value)}/>
                <button onClick={makeLoginCall}> Login</button>
            </div>
        </div>;
}

export default Login;