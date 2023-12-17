// import React, { useEffect } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';

// // Pages
// import Expenses from './pages/Expenses/Expenses';
// import Login from './pages/Login/Login';
// import Signup from './pages/Signup/Signup';

// import { useAuth } from './Contexts/AuthContext.jsx';

// export default function App() {
//     const { isLoggedIn, setIsLoggedIn } = useAuth();
//     const [cookies] = useCookies(['token']);
//     const navigate = useNavigate();
    
//     useEffect(() => {
//         const token = cookies.token;

//         if (token) {
//             setIsLoggedIn(true);
//         } else {
//             setIsLoggedIn(false);
//         }
//     }, []);

//     return (
//         <Routes>
//         {isLoggedIn ? (
//             <>
//                 <Route path='/' element={<Expenses />} />
//                 <Route
//                     path='*'
//                     redirect={() => window.location.replace('/connexion')}
//                 />
//             </>
//         ) : (
//             <>
//                 <Route path='/' element={<Expenses />} />
//                 <Route
//                     path='/connexion'
//                     element={<Login />}
//                 />
//                 <Route
//                     path='/inscription'
//                     element={<Signup />}
//                 />
//                 <Route
//                     path='*'
//                     redirect={() => window.location.replace('/connexion')}
//                 />
//             </>
//         )}
//         </Routes>
//     );
// }

import React, { useEffect } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Pages
import Expenses from './pages/Expenses/Expenses';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

import { useAuth } from './Contexts/AuthContext.jsx';

export default function App() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        const token = cookies.token;

        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [cookies.token, setIsLoggedIn]);

    return (
        <Routes>
            <Route
                path='/'
                element={<Outlet />}
            >
                {isLoggedIn ? (
                    <Route
                        index
                        element={<Expenses />}
                    />
                ) : (
                    <>
                        <Route
                            index
                            element={<Expenses />}
                        />
                        <Route
                            path='/connexion'
                            element={<Login />}
                        />
                        <Route
                            path='/inscription'
                            element={<Signup />}
                        />
                        <Route
                            path='*'
                            element={<Navigate to="/connexion" />}
                        />
                    </>
                )}
            </Route>
        </Routes>
    );
}
