import {ReactElement} from 'react';
import WidgetPage from '@/components/WidgetPage';

interface NavBarItem {
  path: string;
  component: ReactElement;
  mainRoute?: boolean;
}

export const ROUTES: Array<NavBarItem> = [
  {
    path: '/',
    component: <WidgetPage/>,
    mainRoute: true,
  },

];
