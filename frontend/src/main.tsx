import './styles/globals.scss';
import * as ReactDOM from 'react-dom/client';
import {SquidContextProvider} from '@squidcloud/react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from '@/components/Layout';
import {ROUTES} from '@/routes';
import Modal from 'react-modal';
import {ThemeProvider} from '@mui/material';
import theme from '@/theme';
import {SnackbarProvider} from '@/providers/SnackbarProvider';

(window as any)['SQUID_DEBUG_ENABLED'] = true;

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
    <SquidContextProvider
        options={{
            appId: import.meta.env.VITE_APP_ID,
            region: import.meta.env.VITE_REGION,
            environmentId: import.meta.env.VITE_ENVIRONMENT_ID,
            squidDeveloperId: import.meta.env.VITE_SQUID_DEVELOPER_ID,
        }}
    >
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <RouterProvider router={router}/>
            </SnackbarProvider>
        </ThemeProvider>
    </SquidContextProvider>
);
