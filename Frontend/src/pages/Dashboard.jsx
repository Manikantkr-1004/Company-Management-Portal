import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { UserGetDashStats } from "../actions/userAction";
import Loading from "../components/Loading";
import {toast} from "react-toastify";

export default function Dashboard() {

    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [statsData, setStatsData] = useState({});

    useEffect(() => {
        fetchStatsData();
    }, [user.isLoggedIn]);

    const fetchStatsData = async () => {
        try {
            setLoading(true);
            const response = await UserGetDashStats();
            setStatsData(response.data.data);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="w-full h-full overflow-y-auto pt-5 pb-10 px-5">
            <h2 className="text-3xl font-bold sm:font-extrabold text-center sm:text-left text-(--dark-color)">Dashboard Status</h2>

            {loading && <Loading />}

            {!loading && user.role === 'admin' &&
            <div className="w-full flex flex-wrap gap-3 justify-start items-center mt-5">
                <div className="border-2 bg-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 text-white flex flex-col gap-0.5">
                    <p className="font-bold">Total Employees</p>
                    <p>{statsData?.totalEmployees}</p>
                </div>
                <div className="border-2 bg-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 text-white flex flex-col gap-0.5">
                    <p className="font-bold">Total Clients</p>
                    <p>{statsData?.totalClients}</p>
                </div>
                <div className="border-2 bg-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 text-white flex flex-col gap-0.5">
                    <p className="font-bold">Total Client Companies</p>
                    <p>{statsData?.totalClientCompanies}</p>
                </div>
                <div className="border-2 bg-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 text-white flex flex-col gap-0.5">
                    <p className="font-bold">Total Projects</p>
                    <p>{statsData?.totalProjects}</p>
                </div>
                <div className="border-2 bg-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 text-white flex flex-col gap-0.5">
                    <p className="font-bold">Total Services</p>
                    <p>{statsData?.totalServices}</p>
                </div>
                <div className="border-2 bg-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 text-white flex flex-col gap-0.5">
                    <p className="font-bold">Total Service Requests</p>
                    <p>{statsData?.totalServiceRequests}</p>
                </div>
                <div className="border-2 border-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 bg-white flex flex-col gap-0.5">
                    <p className="font-bold">Total Completed Projects</p>
                    <p>{statsData?.projectStatus?.completed}</p>
                </div>
                <div className="border-2 border-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 bg-white flex flex-col gap-0.5">
                    <p className="font-bold">Total In-Progress Projects</p>
                    <p>{statsData?.projectStatus?.inProgress}</p>
                </div>
                <div className="border-2 border-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 bg-white flex flex-col gap-0.5">
                    <p className="font-bold">Total Pending Projects</p>
                    <p>{statsData?.projectStatus?.pending}</p>
                </div>
            </div>
            }

            {!loading && user.role === 'employee' &&
            <div className="w-full flex flex-wrap gap-3 justify-start items-center mt-5">
                <div className="border-2 bg-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 text-white flex flex-col gap-0.5">
                    <p className="font-bold">Total Assigned Projects</p>
                    <p>{statsData?.assignedProjects}</p>
                </div>
                <div className="border-2 bg-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 text-white flex flex-col gap-0.5">
                    <p className="font-bold">Completed Projects</p>
                    <p>{statsData?.projectStatus?.completed}</p>
                </div>
                <div className="border-2 bg-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 text-white flex flex-col gap-0.5">
                    <p className="font-bold">InProgress Projects</p>
                    <p>{statsData?.projectStatus?.inProgress}</p>
                </div>
                <div className="border-2 bg-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 text-white flex flex-col gap-0.5">
                    <p className="font-bold">Pending Projects</p>
                    <p>{statsData?.projectStatus?.pending}</p>
                </div>
            </div>
            }

            {!loading && user.role === 'client' &&
            <div className="w-full flex flex-wrap gap-3 justify-start items-center mt-5">
                <div className="border-2 bg-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 text-white flex flex-col gap-0.5">
                    <p className="font-bold">My Projects</p>
                    <p>{statsData?.myProjects}</p>
                </div>
                <div className="border-2 bg-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 text-white flex flex-col gap-0.5">
                    <p className="font-bold">Available Services</p>
                    <p>{statsData?.totalServices}</p>
                </div>
                <div className="border-2 bg-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 text-white flex flex-col gap-0.5">
                    <p className="font-bold">My Service Requests</p>
                    <p>{statsData?.totalServiceRequests}</p>
                </div>
                <div className="border-2 border-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 bg-white flex flex-col gap-0.5">
                    <p className="font-bold">Completed Projects</p>
                    <p>{statsData?.projectStatus?.completed}</p>
                </div>
                <div className="border-2 border-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 bg-white flex flex-col gap-0.5">
                    <p className="font-bold">InProgress Projects</p>
                    <p>{statsData?.projectStatus?.inProgress}</p>
                </div>
                <div className="border-2 border-(--dark-color) w-full sm:w-auto min-w-50 rounded-md py-1 px-5 bg-white flex flex-col gap-0.5">
                    <p className="font-bold">Pending Projects</p>
                    <p>{statsData?.projectStatus?.pending}</p>
                </div>
            </div>
            }

            <div className="w-full flex justify-center items-center">
                <img width={500} src="https://png.pngtree.com/png-clipart/20241106/original/pngtree-standing-boy-with-laptop-png-image_16692815.png" alt="PcBoy" className="max-w-full scale-x-[-1] hue-rotate-180" />
            </div>
        </section>
    );
}
