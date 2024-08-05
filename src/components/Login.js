// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import domo from 'ryuu.js'; // Ensure this import is correct and 'ryuu.js' is properly configured

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please provide both username and password');
      return;
    }
    
    console.log('Attempting to fetch existing users...');
    domo.get('/domo/datastores/v1/collections/create_acc/documents')
      .then(response => {
        console.log('Fetched users data:', response);
        const users = response; // Assuming response directly contains the user list
        console.log('Existing users:', users);

        const user = users.find(u => u.content.username === username && u.content.password === password);

        if (user) {
          navigate('/dashboard');
        } else {
          setError('Invalid username or password');
        }
      })
      .catch(error => {
        console.error('Error during login:', error);

        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
          setError(`Failed to login: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
          console.error('Request data:', error.request);
          setError('Failed to login: No response from server');
        } else {
          console.error('Error message:', error.message);
          setError(`Failed to login: ${error.message}`);
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-h-96 max-w-96 p-4 border border-gray-200 rounded-md shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
        <div className='mb-4 text-gray-700 text-lg font-bold text-center'>
          Log in
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-center">
          <button
            className="bg-[#6d63fe] hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
