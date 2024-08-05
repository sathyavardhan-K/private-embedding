// // src/App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import './App.css';
// import logo from './images/logo.svg';
// import users from './users.json'; // Import the JSON file
// import Dashboard from './components/Dashboard';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     const user = users.find(u => u.username === username && u.password === password);
//     if (user) {
//       navigate('/dashboard');
//     } else {
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="mb-10 ml-28">
//         <img src={logo} alt="logo" className="w-1/6" />
//       </div>
//       <div className="max-h-96 max-w-96 p-4 border border-gray-200 rounded-md shadow-lg w-1/2 bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
//         <div className='mb-4 text-gray-700 text-lg font-bold text-center'>
//           My Works
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//             Username:
//           </label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//             Password:
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
//         <div className="flex items-center justify-center">
//           <button
//             className="bg-[#6d63fe] hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             type="button"
//             onClick={handleLogin}
//           >
//             Log in
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// src/App.js// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import logo from './images/logo.svg';
import SignIn from './components/signin';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function Home() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-10">
        <img src={logo} alt="logo" className="w-1/6" />
      </div>
      <div className="max-w-md p-4 border border-gray-200 rounded-md shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
        <div className="flex items-center justify-center space-x-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => handleNavigate('/signin')}
          >
            Create an Account
          </button>
          <button
            className="bg-[#6d63fe] hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => handleNavigate('/login')}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
