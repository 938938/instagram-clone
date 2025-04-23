import ChatPeopleList from "@/components/chat/ChatPeopleList";
import ChatScreen from "@/components/chat/ChatScreen";

const ChatPage = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <ChatPeopleList />
      <ChatScreen />
    </div>
  );
};

export default ChatPage;
