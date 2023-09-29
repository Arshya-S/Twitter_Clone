import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface Response {
  username: string
}


const Login: React.FC<{ setUser: (user: string) => void }> = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user: object = {
      username: username,
      password: password
    }

    try {
      const response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    })

    const data = await response.json()
    
    if (response.status === 200) {
      localStorage.setItem('authTokens', JSON.stringify(data))


      const responseData: Response = jwt_decode(data.access)
      localStorage.setItem('username', responseData.username)
      setUser(responseData.username)

      navigate('/tweets')
    }

    } catch (err) {
      console.log('Login error: ', err)
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <h2 className='mb-5'>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Username:</label>
              <input
                type="username"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
