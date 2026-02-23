import { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { UserLogout } from '../actions/authAction';
import { toast } from 'react-toastify';
import { IoLogOut } from 'react-icons/io5';
import { MdDragIndicator } from "react-icons/md";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";

const allRoutes = [
    {
        name: 'Home',
        url: '/',
        roles: ['admin', 'employee', 'client'],
    },
    {
        name: 'Dashboard',
        url: '/dashboard',
        roles: ['admin', 'employee', 'client'],
    },
    {
        name: 'Projects',
        url: '/projects',
        roles: ['admin', 'employee', 'client'],
    },
    {
        name: 'Services',
        url: '/services',
        roles: ['admin', 'client'],
    },
    {
        name: 'All Users',
        url: '/users',
        roles: ['admin'],
    },
    {
        name: 'Messages',
        url: '/messages',
        roles: ['admin', 'employee', 'client'],
    },
    {
        name: 'Profile',
        url: '/profile',
        roles: ['admin', 'employee', 'client'],
    }
]

export default function AuthLayout() {

    const { user, handleLogout } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const width = window.innerWidth;

    const makeLogout = async () => {
        try {
            setLoading(true);
            const response = await UserLogout();
            handleLogout();
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full flex items-start justify-between gap-0">

            <aside className={`${isMenuOpen ? 'w-72 block':'w-0 hidden'} relative h-screen bg-(--dark-color) p-5 flex flex-col gap-8 overflow-y-auto z-999`}>

                <button onClick={()=> setIsMenuOpen(false)} title='Close Menu' aria-label='Close Menu' className='text-white cursor-pointer absolute top-0 right-0 animate-pulse'>
                    <IoIosCloseCircle size={26} />
                </button>

                <div className="w-full flex items-center gap-3">
                    <div className="min-w-10 w-10 min-h-10 h-10 rounded-full bg-white overflow-hidden border-2 border-(--light-color)">
                        <img className='w-full h-full object-cover' src={`https://robohash.org/${user.name}`} alt={user.name} width={32} height={32} />
                    </div>
                    <div className="w-full flex flex-col gap-1 overflow-hidden">
                        <p className='text-sm text-(--light-color) font-semibold'>{user.name}</p>
                        <p className='text-xs text-white'>{user.email}</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-5">
                    {
                        allRoutes.map((ele) => {
                            return ele.roles.includes(user.role) ?
                            <Link to={ele.url} className="w-full flex items-center gap-2 bg-(--light-color)/10 hover:bg-(--light-color)/30 p-2 text-sm rounded-md font-semibold text-(--light-color)">
                                <MdDragIndicator size={26} /> {ele.name}
                            </Link>
                            :
                            <></>
                        })
                    }
                </div>

                <button aria-label='Logout' title='Logout'
                    disabled={loading}
                    onClick={makeLogout}
                    className={`w-full bg-red-500 cursor-pointer py-2 rounded-full flex justify-center items-center gap-2 text-white text-sm font-semibold ${loading && 'animate-pulse'}`}>
                    <IoLogOut size={22} /> Logout
                </button>

                <p className='text-sm text-(--light-color)/30 animate-pulse text-center'>Managed by Manikant Software Solutions</p>

            </aside>

            {!isMenuOpen &&
            <button 
            onClick={()=> setIsMenuOpen(true)}
            className='fixed top-1/2 -left-7 bg-(--dark-color) cursor-pointer rounded-full py-3 pr-3 pl-10 text-(--light-color)'><FaArrowRightToBracket /></button>}

            <main style={{ width: isMenuOpen ? 'calc(100% - 288px)' : '100%' }} className={`h-screen overflow-y-auto border ${isMenuOpen && width <= 768 && 'backdrop-blur-2xl'}`}>
                <Outlet />
            </main>
        </div>
    );
}
