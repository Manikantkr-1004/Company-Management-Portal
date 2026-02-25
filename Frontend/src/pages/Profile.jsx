import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";
import readableDateTime from "../utils/formatDate";
import {UAParser} from "ua-parser-js";
import {toast} from "react-toastify";
import { UserUpdateProfile } from "../actions/userAction";

const initialData = {
        name: '',
        password: ''
    };
export default function Profile() {
    
    const {user, updateUser} = useContext(UserContext);
    const parser = new UAParser(user.userAgent);
    const result = parser.getResult();

    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    const handleUserUpdate = async (e) => {
        e.preventDefault();
        if(!formData.name.trim() && !formData.password.trim()){
            return toast.error('Please fill either one box to update')
        }
        if(formData.name.toLowerCase() === user.name.toLowerCase()){
            return toast.warning('You entered the same name');
        }
        try {
            setLoading(true);
            const response = await UserUpdateProfile(user.id, formData, user.csrfToken);
            toast.success(response.data.message);
            if(formData.name) { updateUser({name: formData.name}) }
            setFormData(initialData);
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
        } finally{
            setLoading(false);
        }
    }

    return (
        <section className="w-full h-full overflow-y-auto pt-5 pb-10 px-5">
            <h2 className="text-3xl font-bold sm:font-extrabold text-center sm:text-left text-(--dark-color)">Profile Section</h2>

            <div className="w-full flex flex-col gap-5 mt-5">
                <img width={150} height={150} className="rounded-full border-2 m-auto bg-(--dark-color)" src={`https://api.dicebear.com/9.x/toon-head/svg?seed=${user.name}`} alt={user.name} />
                <div className="w-full flex justify-center items-center flex-wrap gap-3">
                    <div className="border-2 border-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 bg-white flex flex-col gap-0.5">
                        <p className="font-bold">Full Name</p>
                        <p>{user.name}</p>
                    </div>
                    <div className="border-2 border-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 bg-white flex flex-col gap-0.5">
                        <p className="font-bold">Your Email</p>
                        <p>{user.email}</p>
                    </div>
                    <div className="border-2 border-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 bg-white flex flex-col gap-0.5">
                        <p className="font-bold">Your Role</p>
                        <p>{user.role}</p>
                    </div>
                    <div className="border-2 border-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 bg-white flex flex-col gap-0.5">
                        <p className="font-bold">Account Created</p>
                        <p>{readableDateTime(user.createdAt)}</p>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center flex-wrap gap-3">
                    <h3 className="font-bold text-lg max-w-62 m-auto text-center text-white bg-(--dark-color) rounded-full py-2 px-5">Latest Login Details</h3>
                    <div className="w-full flex justify-center items-center flex-wrap gap-3">
                    <div className="border-2 border-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 bg-white flex flex-col gap-0.5">
                        <p className="font-bold">Browser</p>
                        <p>{result?.browser?.name ?? 'NA'} {result?.browser?.version}</p>
                    </div>
                    <div className="border-2 border-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 bg-white flex flex-col gap-0.5">
                        <p className="font-bold">CPU</p>
                        <p>{result?.cpu?.architecture ?? 'NA'}</p>
                    </div>
                    <div className="border-2 border-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 bg-white flex flex-col gap-0.5">
                        <p className="font-bold">OS</p>
                        <p>{result?.os?.name ?? 'NA'} {result?.os?.version}</p>
                    </div>
                    <div className="border-2 border-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 bg-white flex flex-col gap-0.5">
                        <p className="font-bold">Device</p>
                        <p>{result?.device?.type ?? 'Laptop/PC'} {result?.device?.vendor} {result?.device?.model}</p>
                    </div>
                </div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-5 mt-5 border-t border-dashed pt-5">
                <h3 className="font-bold text-lg max-w-62 m-auto text-center text-white bg-(--dark-color) rounded-full py-2 px-5">Update Profile</h3>
                <form onSubmit={handleUserUpdate} className="w-full flex justify-center items-center flex-wrap gap-3">
                    <input 
                    value={formData.name} onChange={(e)=> setFormData((prev)=> ({...prev, name: e.target.value}))}
                    className="w-full md:w-auto border text-sm p-1.5 rounded"
                    type="text" name="name" id="name" placeholder="Enter new name" minLength={2} />
                    <input 
                    value={formData.password} onChange={(e)=> setFormData((prev)=> ({...prev, password: e.target.value}))}
                    className="w-full md:w-auto border text-sm p-1.5 rounded"
                    type="password" name="password" id="password" placeholder="Enter new password" minLength={6} />
                    <button 
                    disabled={loading}
                    className="w-full md:w-auto bg-(--dark-color) text-white text-sm py-1.5 px-3 cursor-pointer rounded"
                    type="submit">{loading ? 'In Progress...' : 'Update'}</button>
                </form>
            </div>

        </section>
    );
}
