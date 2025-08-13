import './styles/globals.scss';
import * as ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from '@/components/Layout';
import {ROUTES} from '@/routes';
import Modal from 'react-modal';
import {ThemeProvider} from '@mui/material';
import theme from '@/theme';
import {SnackbarProvider} from '@/providers/SnackbarProvider';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: ROUTES.map((route) => ({
            path: route.path,
            element: route.component,
            index: !!route.mainRoute,
        })),
    },
]);

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
        <SnackbarProvider>
            <RouterProvider router={router}/>
        </SnackbarProvider>
    </ThemeProvider>
);
