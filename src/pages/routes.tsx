import {createBrowserRouter, Navigate} from 'react-router-dom';
import {Layout} from "@/containers";
import loadable from "@/utils/loadable.tsx";


const NotFound = loadable(() => import('./NotFound'));
const Timetable = loadable(() => import('./timetable.tsx'));
const AudienceOccupancy = loadable(() => import('./audience-occupancy.tsx'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Layout/>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/timetable" replace/>,
            },
            {
                path: '/timetable',
                element: <Timetable/>  ,
            },
            {
                path: '/audience-occupancy',
                element: <AudienceOccupancy/>,
            }
        ]
        // errorElement: <Navigate to="/404" replace />,
    },
    {
        path: '*',
        element: <NotFound/>,
    },
]);