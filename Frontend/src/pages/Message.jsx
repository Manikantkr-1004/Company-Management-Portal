import { useContext, useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import Loading from "../components/Loading";
import { toast } from 'react-toastify';
import { UserContext } from "../contexts/userContext";
import readableDateTime from "../utils/formatDate";
import { GetChatConversations, GetChatUsers, SendChatMessages } from "../actions/messageAction";

const initialData = {
    receiverId: '',
    content: ''
}

export default function Message() {

    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const chatBoxRef = useRef();

    const [formData, setFormData] = useState(initialData);
    const [chatUsers, setChatUsers] = useState([]);
    const [chatData, setChatData] = useState([]);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        } else {
            fetchChatUsers();
        }
    }, [chatData]);

    const fetchChatUsers = async () => {
        try {
            setLoading(true);
            const response = await GetChatUsers();
            setChatUsers(response.data.data);
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    const fetchChatData = async (userId) => {
        if (userId === formData.receiverId) {
            setFormData((prev) => ({ ...prev, receiverId: '' }));
            return;
        }
        setFormData((prev) => ({ ...prev, receiverId: userId }));
        setChatData([]);
        try {
            setLoading(true);
            const response = await GetChatConversations(userId);
            setChatData(response.data.data);
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!formData.content.trim()) {
            return toast.info("Write something to Send")
        }
        try {
            setLoading(true);
            const response = await SendChatMessages(formData, user.csrfToken);
            const obj = {
                _id: Date.now(),
                content: formData.content,
                sender: { name: user.name, _id: user.id },
                createdAt: new Date()
            };
            setChatData((prev) => ([...prev, obj]));
            setFormData((prev) => ({ ...prev, content: '' }));
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="w-full h-full overflow-y-auto pt-5">
            <h2 className="text-3xl px-5 h-10 font-bold sm:font-extrabold text-center sm:text-left text-(--dark-color)">Chat Message</h2>

            {loading && chatData.length === 0 && <Loading />}

            <div style={{ height: 'calc(100% - 40px)' }} className="w-full">

                {/* Chat Users Based on Current Logged in User Role  */}
                <div className="w-full overflow-x-auto whitespace-nowrap h-40 overflow-y-auto px-5">
                    {
                        chatUsers.map((ele) => (
                            <div key={ele?._id} onClick={() => fetchChatData(ele?._id)}
                                className={`w-24 btn-animate ${formData.receiverId === ele?._id ? 'bg-(--dark-color) text-white animate-pulse' : 'bg-white'} relative cursor-pointer p-2 rounded-md mx-1 inline-flex flex-col text-xs gap-1.5`}>
                                <img className="rounded max-w-full bg-(--dark-color)" src={`https://api.dicebear.com/9.x/toon-head/svg?seed=${ele?.name}`} alt={ele?.name} width={100} height={100} />
                                <p className="w-full whitespace-pre-wrap text-center capitalize">{ele?.name}</p>
                                <p className="absolute top-0 left-0 bg-(--light-color) font-semibold uppercase w-full text-center">{ele?.role}</p>
                            </div>
                        ))
                    }
                </div>

                {/* Chat Box and Input for Send Message  */}
                {formData.receiverId &&
                    <div style={{ height: 'calc(100% - 160px)' }} className="w-full">
                        <div ref={chatBoxRef} style={{ height: 'calc(100% - 40px)' }} className="w-full scroll-smooth overflow-y-auto rounded-lg px-5">
                            {
                                chatData?.map((ele) => (
                                    <div key={ele?._id} className={`clear-both my-2 text-sm max-w-2/3 ${ele?.sender?._id === user.id ? 'float-right text-right' : 'float-left'}`}>
                                        <p className={`p-2 rounded mb-1 whitespace-pre-wrap ${ele?.sender?._id === user.id ? 'bg-white border' : 'bg-(--dark-color) text-white'}`}>{ele?.content}</p>
                                        <p className="text-xs font-semibold">{readableDateTime(ele?.createdAt)}</p>
                                        <div className={`flex items-center gap-1 text-xs font-semibold capitalize ${ele?.sender?._id === user.id ? 'justify-end' : 'justify-start'}`}>
                                            <img className="rounded-full border" src={`https://api.dicebear.com/9.x/toon-head/svg?seed=${ele?.sender?.name}`} alt={ele?.sender?.name} width={20} height={20} />
                                            Sent by {ele?.sender?._id === user.id ? 'Me' : ele?.sender?.name}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <form onSubmit={handleSendMessage} className="w-full h-10 flex items-center gap-2">
                            <textarea
                                disabled={loading}
                                value={formData.content} onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                                className="w-[88%] px-1.5 py-2 max-h-full min-h-full border h-full rounded-full text-sm" placeholder="Type Message" minLength={2} required />
                            <button
                                disabled={loading} type="submit"
                                className="w-[12%] duration-150 ease-out hover:scale-95 focus:scale-90 active:scale-85 h-full rounded-full flex justify-center cursor-pointer items-center bg-(--dark-color) text-white">
                                {loading ? '...' : <IoMdSend size={22} />}
                            </button>
                        </form>
                    </div>}

            </div>

        </section>
    );
}
