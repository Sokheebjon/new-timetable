import {createBrowserRouter, Navigate} from 'react-router-dom';
import {Layout} from "@/containers";
import loadable from "@/utils/loadable.tsx";


const NotFound = loadable(() => import('./NotFound'));
const Timetable = loadable(() => import('./timetable.tsx'));
const Faculties = loadable(() => import('./faculties.tsx'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Layout/>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/faculties" replace/>,
            },
            {
                path: '/faculties',
                element: <Faculties/>,
            },
            {
                path: '/timetable/:faculty',
                element: <Timetable/>  ,
            }
        ]
        // errorElement: <Navigate to="/404" replace />,
    },
    {
        path: '*',
        element: <NotFound/>,
    },
]);