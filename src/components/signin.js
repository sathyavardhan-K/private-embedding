// src/components/SignIn.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import domo from 'ryuu.js'; // Ensure this import is correct and 'ryuu.js' is properly configured

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [existingUsers, setExistingUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Attempting to fetch existing users...');
    domo.get('/domo/datastores/v1/collections/create_acc/documents')
      .then(response => {
        console.log('Response:', response);

        const users = response.data; // Adjust this line based on actual response structure
        console.log('Existing users:', users);

        if (!Array.isArray(users)) {
          console.error('Unexpected response format:', users);
          throw new Error('Unexpected response format');
        }

        setExistingUsers(users);
      })
      .catch(error => {
        console.error('Error fetching existing users:', error);
      });
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  const handleCreateAccount = () => {
    if (!username || !password || !confirmPassword) {
      setError('Please provide username, password, and confirm password');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const userExists = existingUsers.some(user => user.content.username === username);

    if (userExists) {
      setError('Username already exists');
    } else {
      // Create a new user object in the required format
      const newUser = {
        content: {
          username: username,
          password: password
        }
      };
      console.log('Creating new user:', newUser);

      // Post the new user to the server
      domo.post('/domo/datastores/v1/collections/create_acc/documents', newUser)
        .then(response => {
          console.log('Post response:', response);

          // Log the actual status code received from the server
          console.log('Response status:', response.status);
            navigate('/');
      
        })
        .catch(error => {
          console.error('Error creating account:', error);

          if (error.response) {
            // The request was made and the server responded with a status code outside the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            setError(`Failed to create account: ${error.response.data.message || error.response.statusText}`);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('Request data:', error.request);
            setError('Failed to create account: No response from server');
          } else {
            // Something happened in setting up the request that triggered an error
            console.error('Error message:', error.message);
            setError(`Failed to create account: ${error.message}`);
          }
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-h-1/2 max-w-96 p-4 border border-gray-200 rounded-md shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
        <div className='mb-4 text-gray-700 text-lg font-bold text-center'>
          Create an Account
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
        <div className="mb-4">
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
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-center">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleCreateAccount}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
