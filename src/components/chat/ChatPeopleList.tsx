'use client';

import { useRecoilState } from 'recoil';
import Person from './Person';
import {
  selectedUserIdState,
  selectedUserIndexState,
} from '@/utils/recoil/atoms';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/actions/chatActions';

const ChatPeopleList = ({ loggedInUser }) => {
  const [selectedUserId, setSelectedUserId] =
    useRecoilState(selectedUserIdState);
  const [selectedUserIndex, setSelectedUserIndex] = useRecoilState(
    selectedUserIndexState
  );

  const getAllUsersQuery = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const allUsers = await getAllUsers();
      return allUsers.filter((user) => user.id !== loggedInUser.id);
    },
  });

  return (
    <div className='h-screen min-w-60 flex flex-col bg-gray-50'>
      {/* <Person
        onClick={() => setSelectedUserId(0)}
        index={0}
        isActive={selectedUserId === 0}
        name={'Lopun'}
        onChatScreen={false}
        onlineAt={new Date().toISOString()}
        userId={'iasdonfiodasn'}
      />
      <Person
        onClick={() => setSelectedUserId(1)}
        index={1}
        isActive={selectedUserId === 1}
        name={'홍길동'}
        onChatScreen={false}
        onlineAt={new Date().toISOString()}
        userId={'iasdonfiodasn'}
      /> */}
      {getAllUsersQuery.data?.map((user, idx) => (
        <Person
          onClick={() => {
            setSelectedUserId(user.id);
            setSelectedUserIndex(idx);
          }}
          index={idx}
          isActive={selectedUserId === user.id}
          name={user.email?.split('@')[0]}
          onChatScreen={false}
          onlineAt={new Date().toISOString()}
          userId={user.id}
        />
      ))}
    </div>
  );
};

export default ChatPeopleList;
