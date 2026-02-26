import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Link } from "react-router-dom";


export default function Home() {
    
    const { user } = useContext(UserContext);

    return (
        <section
        className="w-full min-h-screen px-5 text-center flex flex-col justify-center items-center gap-5">
            {user.isLoggedIn && <p className="text-yellow-500 bg-yellow-100 px-5 text-sm py-1.5 rounded-full font-semibold capitalize animate-bounce">👋 Hi, {user.name}</p>}
            <h1 className="text-3xl md:text-5xl font-bold text-(--light-color)">Welcome to Manikant Software Solutions</h1>
            <p className="text-white font-semibold">To handle all works and functionality, Kindly visit Dashboard {!user.isLoggedIn && <span>, After Login</span>}</p>

            {user.isLoggedIn && <Link to={'/dashboard'} className="bg-(--dark-color) btn-animate shadow-white shadow-2xl text-white rounded-md text-sm font-medium px-5 py-2">Visit Dashboard</Link>}
            {!user.isLoggedIn && <Link to={'/auth/login'} className="bg-(--dark-color) btn-animate shadow-white shadow-2xl text-white rounded-md text-sm font-medium px-5 py-2">Login</Link>}
        </section>
    );
}
