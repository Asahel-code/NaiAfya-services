import { Ambulance, Home, Hospitals, UserProfile, Login, ViewSpecifcAmbulance, ViewSpecificHospital, PoliceStation, ViewSpecificPoliceStation, ViewSpecificFireFighter, FireFighter } from "../pages";
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
        path: '/police_stations',
        element: <AuthRouteMiddleware><PoliceStation /></AuthRouteMiddleware>
    },
    {
        path: '/fire_fighters',
        element: <AuthRouteMiddleware><FireFighter /></AuthRouteMiddleware>
    },
    {
        path: '/hospital/:id',
        element: <AuthRouteMiddleware><ViewSpecificHospital /></AuthRouteMiddleware>
    },
    {
        path: '/ambulance/:id',
        element: <AuthRouteMiddleware><ViewSpecifcAmbulance /></AuthRouteMiddleware>
    },
    {
        path: '/police_station/:id',
        element: <AuthRouteMiddleware><ViewSpecificPoliceStation /></AuthRouteMiddleware>
    },
    {
        path: '/fire_fighter/:id',
        element: <AuthRouteMiddleware><ViewSpecificFireFighter /></AuthRouteMiddleware>
    },
]