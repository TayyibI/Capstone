import { useEffect, useState } from "react";
import "./chatlist.css"
import AddUser from "./adduser/AddUser";
import { useUserStore } from "../../../../CONFIG/userstoreZustand";
import { firebaseDb } from "../../../../CONFIG/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useChatStore } from "../../../../CONFIG/chatstoreZustand";

function ChatList(){
    const [addMode,setAddMode] = useState(false);
    const [chats,setChats] = useState([]);

    const {currentUser} = useUserStore();
    const {chatId,changeChat} = useChatStore();

    console.log(chatId);

    useEffect(()=>{
        const unSub = onSnapshot(doc(firebaseDb, "userschats",currentUser.id), async (res) => {
            const items = res.data().chats;

            const promises = items.map( async (item) =>{
                const userDocRef = doc(firebaseDb, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef );

                const user = userDocSnap.data();

                return {...item,user};
            });

            const chatData = await Promise.all(promises);
            setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt));

        });

        return () =>{
            unSub();
        }
    },[currentUser.id]);

    const handleSelect = async (chat) =>{
        changeChat(chat.chatId,chat.user);
    }
    return(
        <div className="chatlist"> 
            <div className="search">
                <div className="searchbar">
                    <img src="src\assets\search.png" />
                    <input type="text" placeholder="Search a user" />
                </div>
                <img src={addMode ? "src/assets/minus.png" : "src/assets/plus.png"}
                className="add" onClick={()=>setAddMode((prev)=>!prev)}/>
            </div>
            {chats.map((chat) =>(
            <div className="item" key={chat.chatId} onClick={() => handleSelect(chat)}>
                <img src="src/assets/avatar.png" />
                <div className="texts">
                    <span> {chat.user.name} </span>
                    <p> {chats.lastMessage} </p>
                </div>
            </div>))}
            {addMode && <AddUser /> }
        </div>
    )
}

export default ChatList;