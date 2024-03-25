import './App.css';
import { Routes, Route } from 'react-router-dom'
import { UserContext } from './Context/Context'
import { Suspense, lazy, useState } from 'react';
import Error404 from './pages/Error404/Error404';
import ProtectedRoute from './pages/Components/ProtectedRoute';
import PageLoading from './Components/Shared/PageLoading';

const Home = lazy(() => import('./pages/Home/Home'))
const Login = lazy(() => import('./pages/Auth/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))
const Register = lazy(() => import('./pages/Auth/Register'))
const Docs = lazy(() => import('./pages/Docs/Docs'))
const Contact = lazy(() => import('./pages/Contact/Contact'))

// function PageLoading() {
//     return (
//         <div className='page-load-container'>
//             <div className='pageLoading'></div>
//         </div>
//     )
// }

function App() {

    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Suspense fallback={<PageLoading />}>
                <div className="App">
                    <Routes>
                        <Route
                            path="*"
                            element={<Error404 />} />
                        <Route
                            exact
                            path='/'
                            element={<Home />} />
                        <Route
                            path='/login'
                            element={<Login />} />
                        <Route
                            path='/register'
                            element={<Register />} />

                        <Route
                            path="/dashboard"
                            element={<ProtectedRoute />}
                        >
                            <Route index element={<Dashboard />} />
                        </Route>

                        <Route
                            path="/dashboard/:id"
                            element={<ProtectedRoute />}
                        >
                            <Route index element={<Dashboard />} />
                        </Route>

                        <Route
                            exact
                            path='/docs'
                            element={<Docs />} />
                        <Route
                            exact
                            path='/docs/setup'
                            element={<Docs />} />
                        <Route
                            exact
                            path='/docs/response'
                            element={<Docs />} />
                        <Route
                            exact
                            path='/docs/api'
                            element={<Docs />} />
                        <Route
                            path='/contact'
                            element={<Contact />} />
                    </Routes>
                </div>
            </Suspense>
        </UserContext.Provider>
    );
}

export default App;
