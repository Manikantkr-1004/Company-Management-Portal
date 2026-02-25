import { useContext, useEffect, useState } from "react";
import { IoArrowDownCircle } from "react-icons/io5";
import Loading from "../components/Loading";
import { toast } from 'react-toastify';
import { UserContext } from "../contexts/userContext";
import Masonry from 'react-masonry-css';
import { AdminGetAllUsers } from "../actions/userAction";
import readableDateTime from "../utils/formatDate";
import { AdminAssignEmployee, EmployeeUpdateProjectStatus, GetAllProjects } from "../actions/projectAction";

const initialData = {
    id: '',
    employeeIds: []
}

export default function Projects() {

    const { user } = useContext(UserContext);
    const [isCreate, setIsCreate] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState(initialData);
    const [emplyeeData, setEmployeeData] = useState([]);
    const [projectData, setProjectData] = useState([]);

    useEffect(() => {
        if (user.role === 'admin') {
            fetchEmployees();
        }
        fetchAllProjects();
    }, [user]);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await AdminGetAllUsers('employee');
            setEmployeeData(response.data.data);
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    const fetchAllProjects = async () => {
        try {
            setLoading(true);
            const response = await GetAllProjects();
            setProjectData(response.data.data);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (id) => {
        if (formData.employeeIds.includes(id)) {
            setFormData((prev) => ({
                ...prev,
                employeeIds: prev.employeeIds.filter((ele) => ele !== id)
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                employeeIds: [id, ...prev.employeeIds]
            }));
        }
    }

    const handleAssignEmployee = async (e) => {
        e.preventDefault();
        if (formData.employeeIds.length === 0) {
            return toast.warning("Add atleast one Employee")
        }
        try {
            setLoading(true);
            const response = await AdminAssignEmployee(formData.id, formData, user.csrfToken);
            setFormData(initialData);
            setIsCreate(false);
            toast.success(response.data.message);
            fetchAllProjects();
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    const handleUpdateProjectStatus = async (item, value) => { //"pending" | "in-progress" | "completed"
        if (!value) return;
        if (value === item?.status) return;
        try {
            setLoading(true);
            const response = await EmployeeUpdateProjectStatus(item?._id, { status: value }, user.csrfToken);
            setProjectData((prev) => prev.map(ele => ele._id === item?._id ? { ...ele, status: value } : ele));
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="w-full h-full overflow-y-auto pt-5 pb-10 px-5">
            <h2 className="text-3xl font-bold sm:font-extrabold text-center sm:text-left text-(--dark-color)">
                {user.role === 'admin' ? 'Project Section' : user.role === 'client' ? 'Your Projects' : 'Assigned Projects'}
            </h2>

            {loading && <Loading />}

            {/* Assign Employee by Admin  */}
            {!loading && user.role === 'admin' &&
                <div className="w-full mt-5 border border-(--dark-color) rounded-lg">
                    <button
                        onClick={() => setIsCreate(false)}
                        disabled={loading}
                        className="w-full flex justify-between items-center cursor-pointer p-1.5 rounded-t gap-5 bg-(--dark-color) text-white text-sm font-semibold">
                        Assign Employees <IoArrowDownCircle className={`${isCreate ? 'rotate-180' : 'rotate-0'} duration-100 ease-in`} size={20} />
                    </button>

                    <form
                        onSubmit={handleAssignEmployee}
                        className={`w-full flex flex-col gap-2 p-2 bg-white rounded-b-lg ${isCreate ? 'block' : 'hidden'}`}>
                        <div className="w-full flex flex-wrap items-center gap-2">
                            <div className="w-full overflow-x-auto whitespace-nowrap">
                                {
                                    emplyeeData.map((ele) => (
                                        <div key={ele?._id}
                                            onClick={() => handleChange(ele?._id)}
                                            className={`w-50 cursor-pointer p-2 rounded-md mx-1 inline-flex flex-col text-xs gap-1.5 ${formData?.employeeIds?.includes(ele._id) ? 'border-2 bg-(--dark-color) text-white' : 'border'}`}>
                                            <img className="rounded max-w-full bg-(--dark-color)" src={`https://api.dicebear.com/9.x/toon-head/svg?seed=${ele?.name}`} alt={ele?.name} width={300} height={300} />
                                            <p>{ele?.name} - {ele?.role}</p>
                                            <p>{ele?.email}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="w-full flex items-center gap-2">
                                <input
                                    value={formData.id} disabled
                                    className="w-full sm:w-1/2 border p-1" type="text" name="id" id="id" placeholder="Enter Project Id" required />

                                <button
                                    disabled={loading}
                                    className="w-full sm:w-1/2 p-1 bg-(--dark-color) text-white rounded cursor-pointer" type="submit">{loading ? 'In Progress...' : 'Assign Employees'}</button>
                            </div>
                        </div>
                    </form>
                </div>}

            {/* Project Card and Assign , Update functionality  */}
            {!loading &&
                <div className="w-full mt-5">
                    {projectData.length === 0 && <h3 className="font-bold text-center text-lg">Oops, No Projects Available</h3>}

                    {projectData.length > 0 &&
                        <Masonry
                            breakpointCols={{ default: 5, 1440: 4, 1024: 3, 768: 2, 640: 1 }}
                            className="flex gap-4"
                            columnClassName="flex flex-col gap-4"
                        >
                            {
                                projectData?.map((item) => (
                                    <div key={item?._id} className="w-full relative bg-white break-inside-avoid self-start overflow-hidden border text-(--dark-color) rounded-md p-2">
                                        <h5 className="font-bold text-center">{item?.name}</h5>
                                        <p className="text-sm whitespace-pre-wrap">{item?.description}</p>
                                        <p className="text-sm font-semibold">🕛 {readableDateTime(item?.createdAt)}</p>
                                        <p className={`px-3 py-1 rounded-md text-xs text-white font-semibold my-1 ${item?.status === 'pending' ? 'bg-red-500' : item?.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}>Status: {item?.status}</p>
                                        <p className="text-sm font-semibold">Assigned Employees: {item?.assignedEmployees.length}</p>

                                        {/* Showing Client Info only Admin and Employee  */}
                                        {(user.role === 'admin' || user.role === 'employee') &&
                                            <div className="w-full flex items-center justify-between gap-2 border-y border-dashed py-2 my-2">
                                                <img className="rounded-md border bg-(--dark-color)" src={`https://api.dicebear.com/9.x/toon-head/svg?seed=${item?.client?.name}`} alt={item?.client?.name} width={32} height={32} />
                                                <div className="w-full text-xs">
                                                    <p className="line-clamp-1">{item?.client?.email}</p>
                                                    <p className="font-semibold">Client: {item?.client?.name}</p>
                                                </div>
                                            </div>}

                                        {/* Showing Employee Info only Admin and Client  */}
                                        {(user.role === 'admin' || user.role === 'client') &&
                                            <div className="w-full border border-dashed p-1 my-2 flex flex-col gap-2">
                                                {
                                                    item?.assignedEmployees?.map((emp, ind) => (
                                                        <div key={emp?._id} className="w-full flex items-center justify-between gap-2">
                                                            <img className="rounded-md border bg-(--dark-color)" src={`https://api.dicebear.com/9.x/toon-head/svg?seed=${emp?.name}`} alt={item?.emp?.name} width={32} height={32} />
                                                            <div className="w-full text-xs">
                                                                <p className="line-clamp-1">{emp?.email}</p>
                                                                <p className="font-semibold">Employee {ind + 1}: {emp?.name}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        }

                                        {/* Assign Employee by Admin  */}
                                        {user.role === 'admin' &&
                                            <button
                                                onClick={() => {
                                                    setFormData((prev) => ({ id: item?._id, employeeIds: item?.assignedEmployees.map(ele => ele._id) }));
                                                    setIsCreate(true);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                                }}
                                                className="w-full py-1.5 bg-(--dark-color) text-white text-sm rounded cursor-pointer">Assign Employees</button>
                                        }

                                        {/* Update Project Status by Employee  */}
                                        {user.role === 'employee' &&
                                            <select onChange={(e) => handleUpdateProjectStatus(item, e.target.value)}
                                                className="w-full border p-1 rounded text-sm font-semibold my-2">
                                                <option value="">Update Project Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in-progress">In Progress</option>
                                                <option value="completed">Completed</option>
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
