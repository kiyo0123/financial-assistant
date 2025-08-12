import {Link, Outlet} from 'react-router-dom';
import {useSquid} from '@squidcloud/react';
import {useEffect} from 'react';
import Icon from '@/components/lib/Icon';

export default function Layout() {
    const squid = useSquid();
    useEffect(() => {
        (window as any).squid = squid;
    }, []);


    return (
        <div className={'w-full h-full'}>
            <div className={'absolute top-0 left-0 w-full h-[102px] flex items-center flex-shrink-0 flex-grow-0'}>
                <div className={'container flex items-center justify-between'}>
                    <Link to={'/'}>
                        <Icon className={'icon'} icon={'logo'}/>
                    </Link>
                </div>
            </div>
            <div className={'h-full flex flex-col justify-center items-center gap-[24px] background_texture'}>
                <Outlet/>
            </div>
        </div>
    );
}
