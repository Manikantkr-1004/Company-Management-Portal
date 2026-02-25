import { useContext, useEffect, useState } from "react";
import { IoArrowDownCircle } from "react-icons/io5";
import Loading from "../components/Loading";
import { toast } from 'react-toastify';
import { AdminCreateClientCompany, AdminGetClientCompany } from "../actions/clientCompanyAction";
import { UserContext } from "../contexts/userContext";
import ClientCompanyCard from "../components/ClientCompanyCard";
import Masonry from 'react-masonry-css';

const initialData = {
    name: '',
    description: ''
}

export default function ClientCompany() {

    const { user } = useContext(UserContext);
    const [isCreate, setIsCreate] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState(initialData);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchClientCompany();
    }, []);

    const fetchClientCompany = async () => {
        try {
            setLoading(true);
            const response = await AdminGetClientCompany();
            setData(response.data.data);
            toast.success(response.data.message);
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

    const handleCreateCompany = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await AdminCreateClientCompany(formData, user.csrfToken);
            const obj = {
                name: formData.name,
                description: formData.description,
                _id: Date.now(),
                createdAt: new Date(),
                createdBy: {
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
            setData((prev) => ([obj, ...prev]))
            setFormData(initialData);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="w-full h-full overflow-y-auto pt-5 pb-10 px-5">
            <h2 className="text-3xl font-bold sm:font-extrabold text-center sm:text-left text-(--dark-color)">Client Company Section</h2>

            {loading && <Loading />}

            {!loading &&
                <div className="w-full mt-5 border border-(--dark-color) rounded-lg">
                    <button
                        onClick={() => setIsCreate(prev => !prev)}
                        disabled={loading}
                        className="w-full flex justify-between items-center cursor-pointer p-1.5 rounded-t gap-5 bg-(--dark-color) text-white text-sm font-semibold">
                        Create Client Company <IoArrowDownCircle className={`${isCreate ? 'rotate-180' : 'rotate-0'} duration-100 ease-in`} size={20} />
                    </button>

                    <form
                        onSubmit={handleCreateCompany}
                        className={`w-full flex flex-col gap-2 p-2 bg-white rounded-b-lg ${isCreate ? 'block' : 'hidden'}`}>
                        <textarea
                            value={formData.description} onChange={handleChange}
                            className="w-full border p-1" name="description" id="description" minLength={10} rows={5} required placeholder="Enter Company Description"></textarea>
                        <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                            <input
                                value={formData.name} onChange={handleChange}
                                className="w-full sm:w-1/2 border p-1" type="text" name="name" id="name" placeholder="Enter Company Name" required />
                            <button
                                disabled={loading}
                                className="w-full sm:w-1/2 p-1 bg-(--dark-color) text-white rounded cursor-pointer" type="submit">{loading ? 'In Progress...' : 'Create'}</button>
                        </div>
                    </form>
                </div>}

            {!loading &&
                <div className="w-full mt-5">
                    {data.length === 0 && <h3 className="font-bold text-center text-lg">Oops, No Client Company Available</h3>}

                    {data.length > 0 &&
                        <Masonry
                            breakpointCols={{default: 5,1440: 4,1024: 3,768: 2,640: 1}}
                            className="flex gap-4"
                            columnClassName="flex flex-col gap-4"
                        >
                            {
                                data?.map((ele) => (
                                    <ClientCompanyCard key={ele?._id} item={ele} />
                                ))
                            }
                        </Masonry>
                    }

                </div>}

        </section>
    );
}
