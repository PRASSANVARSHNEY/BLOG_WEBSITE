import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {URL} from '../url';
import Footer from '../components/Footer';
import { UserContext } from '../context/UserContext';

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(URL + '/api/auth/login', {
        username,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      
      if (res.status === 200) {
        const data = res.data;
        console.warn('Data', data);

        setUser(data);
        navigate('/');
      } else {
        console.error('Request failed with status', res.status);
      }
    } catch (err) {
      setError(true);
      console.log(err);
    }
  }

  return (
    <div>
      <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
        <h1 className='text-lg md:text-xl font-extrabold'>
          <Link to="/">BANIYA's BLOG</Link>
        </h1>
        <h3><Link to='/register'>Register</Link></h3>
      </div>
      <div className='w-full flex justify-center items-center h-[80vh]'>
        <div className='w-full md:w-1/2'>
          <h1 className='text-xl font-bold text-left'>
            LOGIN TO YOUR ACCOUNT
          </h1>
          <form onSubmit={handleLogin}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border border-black outline-0'
              type='text'
              placeholder='ENTER YOUR EMAIL'
              value={email}
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border border-black outline-0'
              type='password'
              placeholder='ENTER YOUR PASSWORD'
              value={password}
              required
            />
            <button
              type='submit'
              className='w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black'
            >
              LOGIN
            </button>
          </form>
          {err && <p className='text-red-500 text-sm'>Email or Username is incorrect</p>}
          <div className='flex justify-center items-center space-x-3'>
            <p className='text-gray-500 hover:text-black'>
              <Link to='/register'>REGISTER</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
