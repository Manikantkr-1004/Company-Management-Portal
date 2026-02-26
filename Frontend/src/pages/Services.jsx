import { useContext, useEffect, useState } from "react";
import { IoArrowDownCircle } from "react-icons/io5";
import Loading from "../components/Loading";
import { toast } from 'react-toastify';
import { UserContext } from "../contexts/userContext";
import Masonry from 'react-masonry-css';
import readableDateTime from "../utils/formatDate";
import { AdminCreateService, GetAllServices } from "../actions/serviceAction";
import { AdminUpdateServiceRequest, CreateServiceRequest, GetAllServiceRequests } from "../actions/serviceRequestAction";

const initialData = {
    name: '',
    description: ''
}

export default function Services() {

    const { user } = useContext(UserContext);
    const [isCreate, setIsCreate] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState(initialData);
    const [serviceData, setServiceData] = useState([]);
    const [serviceRequestData, setServiceRequestData] = useState([]);

    useEffect(() => {
        fetchServices();
        fetchServiceRequests();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await GetAllServices();
            setServiceData(response.data.data);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    const fetchServiceRequests = async () => {
        try {
            setLoading(true);
            const response = await GetAllServiceRequests();
            setServiceRequestData(response.data.data);
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

    const handleCreateServices = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await AdminCreateService(formData, user.csrfToken);
            const obj = {
                _id: Date.now(),
                createdAt: new Date(),
                name: formData.name,
                description: formData.description,
                createdBy: {
                    name: user.name,
                    role: user.role
                }
            };
            setServiceData((prev) => ([obj, ...prev]))
            setFormData(initialData);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    const handleServieRequest = (item) => {
        setFormData((prev)=> ({...prev, name: item?._id}));
        setIsCreate(true);
        window.scrollTo({top:0, behavior: 'smooth'});
    }

    const handleCreateServiceRequest = async (e) => {
        e.preventDefault();
        const findService = serviceData.find((ele) => ele?._id === formData.name);
        try {
            setLoading(true);
            const response = await CreateServiceRequest({ service: formData.name, description: formData.description }, user.csrfToken);
            const obj = {
                _id: Date.now(),
                createdAt: new Date(),
                description: formData.description,
                status: 'pending',
                service: {
                    name: findService?.name
                }
            };
            setServiceRequestData((prev) => ([obj, ...prev]))
            setFormData(initialData);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    const handleUpdateServiceRequest = async (item, value) => {
        if(!value) return;
        if(item?.status === value) return;
        try {
            setLoading(true);
            const response = await AdminUpdateServiceRequest(item?._id, { action: value }, user.csrfToken);
            setServiceRequestData((prev) => prev.map(ele => ele._id === item?._id ? { ...ele, status: value } : ele));
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }    

    return (
        <section className="w-full h-full overflow-y-auto pt-5 pb-10 px-5">
            <h2 className="text-3xl font-bold sm:font-extrabold text-center sm:text-left text-(--dark-color)">Services Section</h2>

            {loading && <Loading />}

            {!loading &&
                <div className="w-full mt-5 border border-(--dark-color) rounded-lg">
                    <button
                        onClick={() => setIsCreate(prev => !prev)}
                        disabled={loading}
                        className="w-full flex justify-between items-center cursor-pointer p-1.5 rounded-t gap-5 bg-(--dark-color) text-white text-sm font-semibold">
                        Create {user.role === 'admin' ? 'Serives' : 'Service Request'} <IoArrowDownCircle className={`${isCreate ? 'rotate-180' : 'rotate-0'} duration-100 ease-in`} size={20} />
                    </button>

                    <form
                        onSubmit={user.role === 'admin' ? handleCreateServices : handleCreateServiceRequest}
                        className={`w-full flex flex-col gap-2 p-2 bg-white rounded-b-lg ${isCreate ? 'block' : 'hidden'}`}>
                        <textarea
                            value={formData.description} onChange={handleChange}
                            className="w-full border rounded p-1" name="description" id="description" minLength={10} rows={5} required placeholder="Enter Related Description"></textarea>
                        <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                            <input
                                value={formData.name} onChange={handleChange}
                                className="w-full sm:w-1/2 border rounded p-1" type="text" name="name" id="name" placeholder={user.role === 'admin' ? 'Enter Service Name' : 'Enter Service Id'} required />
                            <button
                                disabled={loading}
                                className="w-full duration-150 ease-out hover:scale-95 focus:scale-90 active:scale-85 sm:w-1/2 p-1 bg-(--dark-color) text-white rounded cursor-pointer" type="submit">{loading ? 'In Progress...' : 'Create'}</button>
                        </div>
                    </form>
                </div>}

            {/* For Service Management (For Admin create and Client make request) */}
            {!loading &&
                <div className="w-full mt-5">
                    <h3 className="font-bold text-center text-lg">{serviceData?.length>0 ? 'Available All Services':'Oops, No Services Available'}</h3>

                    {serviceData.length > 0 &&
                        <Masonry
                            breakpointCols={{ default: 5, 1440: 4, 1024: 3, 768: 2, 640: 1 }}
                            className="flex gap-4 mt-5"
                            columnClassName="flex flex-col gap-4"
                        >
                            {
                                serviceData?.map((item) => (
                                    <div key={item?._id} className="w-full relative bg-white break-inside-avoid self-start overflow-hidden border text-(--dark-color) rounded-md p-2">
                                        <h5 className="font-bold text-center capitalize">{item?.name}</h5>
                                        <p className="text-sm whitespace-pre-wrap">{item?.description}</p>
                                        {user.role==='client' && <p className="text-sm font-semibold my-1">Unique Id: {item?._id}</p>}
                                        <p className="text-sm">🕛 {readableDateTime(item?.createdAt)}</p>
                                        {user.role==='client' && 
                                        <button 
                                        onClick={()=> handleServieRequest(item)} 
                                        className="w-full bg-(--dark-color) btn-animate text-sm font-semibold py-1 rounded cursor-pointer text-white">Make Service Request</button>}
                                        <div className="w-full flex items-center justify-between gap-2 border-t border-dashed pt-2 mt-2">
                                            <img className="rounded-md border bg-(--dark-color)" src={`https://api.dicebear.com/9.x/toon-head/svg?seed=${item?.createdBy?.name}`} alt={item?.createdBy?.name} width={32} height={32} />
                                            <div className="w-full text-xs">
                                                <p className="line-clamp-1 capitalize">{item?.createdBy?.name}</p>
                                                <p className="font-semibold">CreatedBy: {item?.createdBy?.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Masonry>
                    }

                </div>}

            {/* For Service Request Management (For Admin update status and Client see) */}
            {!loading &&
                <div className="w-full mt-5">
                    <h3 className="font-bold text-center text-lg">{serviceRequestData?.length>0 ? (user.role==='admin'? 'All Service Requests':'Your Service Requests'):'Oops, No Service Requests Available'}</h3>

                    {serviceRequestData.length > 0 &&
                        <Masonry
                            breakpointCols={{ default: 5, 1440: 4, 1024: 3, 768: 2, 640: 1 }}
                            className="flex gap-4 mt-5"
                            columnClassName="flex flex-col gap-4"
                        >
                            {
                                serviceRequestData?.map((item) => (
                                    <div key={item?._id} className="w-full relative bg-white break-inside-avoid self-start overflow-hidden border text-(--dark-color) rounded-md p-2">
                                        <h5 className="font-bold text-center capitalize">{item?.service?.name}</h5>
                                        <p className="text-sm whitespace-pre-wrap">{item?.description}</p>
                                        <p className="text-sm font-semibold my-1">🕛 {readableDateTime(item?.createdAt)}</p>
                                        <p className={`px-3 py-1 rounded-md text-xs text-white font-semibold capitalize ${item?.status==='pending'?'bg-blue-500' : item?.status==='approved'?'bg-green-500': 'bg-red-500'}`}>Status: {item?.status}</p>
                                        {user.role==='admin' &&
                                        <div className="w-full flex items-center justify-between gap-2 border-t border-dashed pt-2 mt-2">
                                            <img className="rounded-md border bg-(--dark-color)" src={`https://api.dicebear.com/9.x/toon-head/svg?seed=${item?.client?.name}`} alt={item?.client?.name} width={32} height={32} />
                                            <div className="w-full text-xs">
                                                <p className="capitalize">Requested by {item?.client?.name}</p>
                                                <p className="font-semibold">{item?.client?.email}</p>
                                            </div>
                                        </div>}
                                        {user.role==='admin' && item?.status !=='approved' &&
                                        <select className="w-full btn-animate p-1.5 text-sm border rounded font-semibold mt-2"
                                        onChange={(e)=> handleUpdateServiceRequest(item, e.target.value)}>
                                            <option value="">Update Status</option>
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                            <option value="rejected">Rejected</option>
                                        </select>}
                                    </div>
                                ))
                            }
                        </Masonry>
                    }

                </div>}

        </section>
    );
}
