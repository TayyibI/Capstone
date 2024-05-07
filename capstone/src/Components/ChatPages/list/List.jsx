import ChatList from "./chatlist/ChatList";
import "./list.css"
import UserInfo from "./userinfo/UserInfo";

function List(){
    return(
        <div className="list"> 
            <UserInfo/>
            <ChatList />
        </div>

    )
}

export default List;