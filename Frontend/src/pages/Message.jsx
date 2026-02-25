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
        fetchChatUsers();
    }, []);

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
        if(userId===formData.receiverId) return;
        setFormData((prev)=> ({...prev, receiverId: userId}));
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

    const handleSendMessage = async () => {
        if (!formData.content.trim()) {
            return toast.warning("Write something to Send")
        }
        const receiver = chatUsers.find((ele) => ele?._id === formData.receiverId);
        try {
            setLoading(true);
            const response = await SendChatMessages(formData, user.csrfToken);
            const obj = {
                _id: Date.now(),
                content: formData.content,
                sender: { name: user.name },
                receiver: { name: receiver.name },
                createdAt: new Date()
            };
            setChatData((prev) => ([obj, ...prev]));
            setFormData((prev)=> ({...prev, content: ''}));
            // chatBoxRef.current.scrollTo = chatBoxRef.current.offSetHeight;
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

            {loading && <Loading />}

            {/* Assign Employee by Admin  */}
            {!loading &&
                <div style={{height: 'calc(100% - 40px)'}} className="w-full">

                    <div className="w-full overflow-x-auto whitespace-nowrap h-40 overflow-y-auto px-5">
                        {
                            chatUsers.map((ele) => (
                                <div key={ele?._id} onClick={()=> fetchChatData(ele?._id)}
                                    className={`w-24 ${formData.receiverId===ele?._id ? 'bg-(--dark-color) text-white':'bg-white'} cursor-pointer p-2 rounded-md mx-1 inline-flex flex-col text-xs gap-1.5`}>
                                    <img className="rounded max-w-full bg-(--dark-color)" src={`https://api.dicebear.com/9.x/toon-head/svg?seed=${ele?.name}`} alt={ele?.name} width={100} height={100} />
                                    <p className="w-full whitespace-pre-wrap">{ele?.name} - {ele?.role}</p>
                                </div>
                            ))
                        }
                    </div>

                    <div style={{height: 'calc(100% - 160px)'}} className="w-full">
                        <div ref={chatBoxRef} style={{height: 'calc(100% - 40px)'}} className="w-full overflow-y-auto rounded-lg px-5">
                        </div>
                        <div className="w-full h-10 flex items-center gap-2">
                            <input 
                            disabled={loading}
                            value={formData.content} onChange={(e)=> setFormData((prev)=> ({...prev, content: e.target.value}))}
                            className="w-[88%] px-1.5 border h-full rounded-lg text-sm" type="text" placeholder="Type Message" />
                            <button 
                            disabled={loading}
                            className="w-[12%] h-full rounded-lg flex justify-center cursor-pointer items-center bg-(--dark-color) text-white"><IoMdSend size={22} /></button>
                        </div>
                    </div>

                </div>}

        </section>
    );
}
