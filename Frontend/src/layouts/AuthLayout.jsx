import { Outlet } from 'react-router-dom';

export default function AuthLayout() {

    return (
        <div className="w-full flex items-start justify-center gap-0">
            <aside className='w-80 h-screen'>
            </aside>
            <main style={{width: 'calc(100% - 320px)'}} className='h-screen'>
                <Outlet />
            </main>
        </div>
    );
}
