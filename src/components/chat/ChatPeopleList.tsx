'use client';

import { useRecoilState } from 'recoil';
import Person from './Person';
import { selectedIndexState } from '@/utils/recoil/atoms';

const ChatPeopleList = () => {
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedIndexState);
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
