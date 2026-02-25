import { useContext, useEffect, useState } from "react";
import { IoArrowDownCircle } from "react-icons/io5";
import Loading from "../components/Loading";
import { toast } from 'react-toastify';
import { AdminGetClientCompany } from "../actions/clientCompanyAction";
import { UserContext } from "../contexts/userContext";
import Masonry from 'react-masonry-css';
import { AdminCreateUser, AdminDeleteUser, AdminGetAllUsers } from "../actions/userAction";
import readableDateTime from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

const initialData = {
    name: '',
    email: '',
    password: '',
    role: '',
    company: ''
}

export default function User() {

    const { user } = useContext(UserContext);
    const [isCreate, setIsCreate] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState(initialData);
    const [data, setData] = useState([]);
    const [companyData, setCompanyData] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchClientCompany();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await AdminGetAllUsers();
            setData(response.data.data);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    const fetchClientCompany = async () => {
        try {
            setLoading(true);
            const response = await AdminGetClientCompany();
            setCompanyData(response.data.data);
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleCreateUsers = async (e) => {
        e.preventDefault();
        if (formData.role === 'client' && !formData.company) {
            return toast.warning("Please select Client Company or Create one")
        }
        let company;
        if (formData.role === 'client') {
            company = companyData.find((ele) => ele._id === formData.company);
        }
        try {
            setLoading(true);
            const response = await AdminCreateUser(formData, user.csrfToken);
            const obj = {
                name: formData.name,
                email: formData.email,
                _id: Date.now(),
                createdAt: new Date(),
                role: formData.role,
                company: company ? {name: company?.name } : null
            }
            setData((prev) => ([obj, ...prev]))
            setFormData(initialData);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteUser = async (userId) => {
        try {
            setLoading(true);
            const response = await AdminDeleteUser(userId, user.csrfToken);
            setData((prev) => prev.filter((ele) => ele._id !== userId));
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="w-full h-full overflow-y-auto pt-5 pb-10 px-5">
            <h2 className="text-3xl font-bold sm:font-extrabold text-center sm:text-left text-(--dark-color)">Users Section</h2>

            {loading && <Loading />}

            {!loading &&
                <div className="w-full mt-5 border border-(--dark-color) rounded-lg">
                    <button
                        onClick={() => setIsCreate(prev => !prev)}
                        disabled={loading}
                        className="w-full flex justify-between items-center cursor-pointer p-1.5 rounded-t gap-5 bg-(--dark-color) text-white text-sm font-semibold">
                        Create Users <IoArrowDownCircle className={`${isCreate ? 'rotate-180' : 'rotate-0'} duration-100 ease-in`} size={20} />
                    </button>

                    <form
                        onSubmit={handleCreateUsers}
                        className={`w-full flex flex-col gap-2 p-2 bg-white rounded-b-lg ${isCreate ? 'block' : 'hidden'}`}>
                        <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                            <input
                                value={formData.name} onChange={handleChange}
                                className="w-full sm:w-1/2 border p-1" type="text" name="name" id="name" minLength={2} placeholder="Enter User Name" required />
                            <input
                                value={formData.email} onChange={handleChange}
                                className="w-full sm:w-1/2 border p-1" type="email" name="email" id="email" placeholder="Enter User Email" required />
                        </div>
                        <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                            <input
                                value={formData.password} onChange={handleChange}
                                className="w-full sm:w-1/2 border p-1" type="password" name="password" id="password" minLength={6} placeholder="Enter User Password" required />
                            <select
                                value={formData.role} onChange={handleChange}
                                className="w-full sm:w-1/2 border p-1" name="role" id="role" required>
                                <option value="">Select User Role</option>
                                <option value="client">Client</option>
                                <option value="employee">Employee</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                            {formData.role === 'client' &&
                                <select
                                    value={formData.company} onChange={handleChange}
                                    className="w-full sm:w-1/2 border p-1" name="company" id="company" required >
                                    <option value="">Select Client Company</option>
                                    {
                                        companyData?.map((ele) => (
                                            <option key={ele?._id} value={ele?._id}>{ele?.name} - {ele?._id}</option>
                                        ))
                                    }
                                </select>}
                            <button
                                disabled={loading}
                                className="w-full sm:w-1/2 p-1 bg-(--dark-color) text-white rounded cursor-pointer" type="submit">{loading ? 'In Progress...' : 'Create'}</button>
                        </div>
                    </form>
                </div>}

            {!loading &&
                <div className="w-full mt-5">
                    {data.length === 0 && <h3 className="font-bold text-center text-lg">Oops, No Users Available</h3>}

                    {data.length > 0 &&
                        <Masonry
                            breakpointCols={{ default: 5, 1440: 4, 1024: 3, 768: 2, 640: 1 }}
                            className="flex gap-4"
                            columnClassName="flex flex-col gap-4"
                        >
                            {
                                data?.map((item) => (
                                    <div key={item?._id} className="w-full relative bg-white break-inside-avoid self-start overflow-hidden border text-(--dark-color) rounded-md p-2">
                                        <img className="rounded-md border bg-(--dark-color) w-full" src={`https://api.dicebear.com/9.x/toon-head/svg?seed=${item?.name}`} alt={item?.name} width={500} height={500} />
                                        <h5 className="font-bold text-center">{item?.name} - ({item?.role})</h5>
                                        <p className="text-sm">📧 {item?.email}</p>
                                        <p className="text-sm">🕛 {readableDateTime(item?.createdAt)}</p>
                                        {item?.company && <p className="font-semibold text-sm">Company: {item?.company?.name}</p>}
                                        <button 
                                        disabled={loading} aria-label="Delete User" title="Delete User"
                                        onClick={()=> handleDeleteUser(item?._id)}
                                        className="absolute top-0 right-0 bg-red-500 cursor-pointer text-white rounded p-1.5"><MdDelete /></button>
                                    </div>
                                ))
                            }
                        </Masonry>
                    }

                </div>}

        </section>
    );
}
