import { Outlet } from 'react-router-dom';

export default function PublicLayout() { 

    return (
        <>
        <header className='w-full flex justify-center items-center gap-5 px-3 py-2'>
        </header>
        <main>
            <Outlet />
        </main>
        </>
    );
}
