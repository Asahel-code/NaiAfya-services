import { Ambulance, Home, Hospitals, UserProfile, Login, ViewSpecifcAmbulance, ViewSpecificHospital } from "../pages";
import AuthRouteMiddleware from './middleware/AuthRouteMiddleware';


export const routes = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/my_profile',
        element: <AuthRouteMiddleware><UserProfile /></AuthRouteMiddleware>
    },
    {
        path: '/',
        element: <AuthRouteMiddleware><Home /></AuthRouteMiddleware> 
    },
    {
        path: '/ambulances',
        element: <AuthRouteMiddleware><Ambulance /></AuthRouteMiddleware>
    },
    {
        path: '/hospitals',
        element: <AuthRouteMiddleware><Hospitals /></AuthRouteMiddleware>
    },
    {
        path: '/hospital/:id',
        element: <AuthRouteMiddleware><ViewSpecificHospital /></AuthRouteMiddleware>
    },
    {
        path: '/ambulance/:id',
        element: <AuthRouteMiddleware><ViewSpecifcAmbulance /></AuthRouteMiddleware>
    },
]