import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>

        <label>Username</label>
        <input 
          type='text'
          name='username'
          required
          value={loginData.username || ''}
          onChange={handleChange}
        />

        <label>Password</label>
        <input 
          type='password'
          name='password'
          required
          value={loginData.password || ''}
          onChange={handleChange}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type='submit' disabled={loading}>
          {loading ? 'Logging in...' : 'Submit Form'}
        </button>
      </form>
    </div>
  );
};

export default Login;


// const Login = () => {
//   const [loginData, setLoginData] = useState({
//     username: '',
//     password: ''
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setLoginData({
//       ...loginData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       const data = await login(loginData);
//       Auth.login(data.token);
//     } catch (err) {
//       console.error('Failed to login', err);
//     }
//   };

//   return (
//     <div className='container'>
//       <form className='form' onSubmit={handleSubmit}>
//         <h1>Login</h1>
//         <label >Username</label>
//         <input 
//           type='text'
//           name='username'
//           value={loginData.username || ''}
//           onChange={handleChange}
//         />
//       <label>Password</label>
//         <input 
//           type='password'
//           name='password'
//           value={loginData.password || ''}
//           onChange={handleChange}
//         />
//         <button type='submit'>Submit Form</button>
//       </form>
//     </div>
    
//   )
// };

// export default Login;
