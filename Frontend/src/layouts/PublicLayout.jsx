import { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { IoLogOut } from "react-icons/io5";
import { UserLogout } from '../actions/authAction';
import { toast } from 'react-toastify';

export default function PublicLayout() { 

    const { user, handleLogout } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const makeLogout = async () => {
        try {
            setLoading(true);
            const response = await UserLogout();
            handleLogout();
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
        } finally{
            setLoading(false);
        }
    }

    return (
        <>
        <header className='w-full z-999 flex justify-between items-center gap-5 p-5 fixed top-0 left-0 backdrop-blur-2xl shadow-2xl'>
            <Link to={'/'} className='font-bold text-(--light-color) text-2xl relative w-30 font-serif!'>
                Manikant <span className='text-xs absolute right-0 -bottom-1.5'>Software Solutions</span>
            </Link>

            <nav className='font-semibold text-white text-sm flex justify-between items-center gap-5'>
                {!user.isLoggedIn && <Link to={'/auth/login'}>Login</Link>}

                {user.isLoggedIn && 
                <button aria-label='Logout' title='Logout' 
                disabled={loading}
                onClick={makeLogout}
                className={`bg-red-500 cursor-pointer w-8 h-8 rounded-full flex justify-center items-center ${loading && 'animate-pulse'}`}>
                    <IoLogOut size={22} />
                </button>}

                {user.isLoggedIn && 
                <Link to={'/profile'} title='Go to Profile' className="w-8 h-8 bg-white rounded-full overflow-hidden border-2 border-(--light-color)">
                    <img className='w-full h-full object-cover' src={`https://robohash.org/${user.name}`} alt={user.name} width={32} height={32} />
                </Link>}

            </nav>
        </header>

        <main style={{backgroundImage:'url(/world-bg.jpg)'}} className='bg-fixed min-h-screen bg-center bg-no-repeat bg-cover'>
            <Outlet />
        </main>
        </>
    );
}
