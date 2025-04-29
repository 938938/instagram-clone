'use client';

import { useRecoilState } from 'recoil';
import Person from './Person';
import { selectedUserIndexState } from '@/utils/recoil/atoms';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/actions/chatActions';

const ChatPeopleList = () => {
  const [selectedIndex, setSelectedIndex] = useRecoilState(
    selectedUserIndexState
  );

  const getAllUsersQuery = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const allUsers = await getAllUsers();
      console.log(allUsers);
      // return allUsers.filter((user) => user.id !== loggedInUser.id);
      return allUsers;
    },
  });

  return (
    <div className='h-screen min-w-60 flex flex-col bg-gray-50'>
      <Person
        onClick={() => setSelectedIndex(0)}
        index={0}
        isActive={selectedIndex === 0}
        name={'Lopun'}
        onChatScreen={false}
        onlineAt={new Date().toISOString()}
        userId={'iasdonfiodasn'}
      />
      <Person
        onClick={() => setSelectedIndex(1)}
        index={1}
        isActive={selectedIndex === 1}
        name={'홍길동'}
        onChatScreen={false}
        onlineAt={new Date().toISOString()}
        userId={'iasdonfiodasn'}
      />
    </div>
  );
};

export default ChatPeopleList;
