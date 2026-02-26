import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { isEmailValid } from "../utils/emailPattern";
import { toast } from 'react-toastify';
import { UserLogin } from "../actions/authAction";

const initialData = {
    email:"",
    password: ""
};

export default function Login() {

    const { user, handleLogin } = useContext(UserContext);
    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prev)=> ({...prev, [name]: value}));
    }

    const makeLogin = async(event) => {
        event.preventDefault();

        if(!isEmailValid.test(formData.email)){
            return toast.error('Please enter valid email');
        }

        try {
            setLoading(true);
            const response = await UserLogin(formData, user.csrfToken);
            toast.success(response.data.message);
            handleLogin(response.data.data.user);
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
        } finally{
            setLoading(false);
        }
    }

    return (
        <section
        className="w-full min-h-screen px-5 r text-center flex flex-col justify-center items-center">

            <form onSubmit={makeLogin} className="w-[95%] sm:w-[320px] backdrop-blur-none sm:backdrop-blur-2xl border-none border sm:border-dashed border-white p-5 rounded-lg flex flex-col gap-4">
                {/* <h1 className="font-bold text-xl text-(--light-color)">Login</h1> */}
                <img className="m-auto" src="https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUydnQ5a2VrbHMwZTN5dm5wNmtndnc3NGU3NHVmamh5N2ppdXB1dmVmYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/KH8rrprCFhqcbc3BfH/giphy.gif" alt="Eye blink" width={80} height={80} />

                <label className="w-full flex flex-col gap-1 justify-start items-start text-white font-semibold">
                    Enter Email*
                    <input 
                    value={formData.email} onChange={handleChange}
                    className="w-full focus:outline-none focus:shadow-md shadow-white border border-(--light-color) rounded p-1 font-normal text-sm" 
                    type="email" name="email" id="email" placeholder="ram@gmail.com" required />
                </label>

                <label className="w-full flex flex-col gap-1 justify-start items-start text-white font-semibold">
                    Enter Password*
                    <input 
                    value={formData.password} onChange={handleChange}
                    className="w-full focus:outline-none focus:shadow-md shadow-white border border-(--light-color) rounded p-1 font-normal text-sm" 
                    type="password" name="password" id="password" placeholder="***********" minLength={6} required />
                </label>

                <button 
                disabled={loading}
                className="bg-(--dark-color) hover:bg-(--light-color) btn-animate cursor-pointer w-full py-2 rounded text-white font-semibold text-sm" type="submit">
                    {loading ? 'In Progress...' : 'Login'}
                </button>

            </form>
        </section>
    );
}
