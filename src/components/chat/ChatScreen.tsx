'use client';

import { useRecoilValue } from 'recoil';
import Person from './Person';
import Message from './Message';
import {
  selectedUserIdState,
  selectedUserIndexState,
} from '@/utils/recoil/atoms';
import {
  getAllMessages,
  getUserById,
  sendMessage,
} from '@/actions/chatActions';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const ChatScreen = () => {
  const selectedUserId = useRecoilValue(selectedUserIdState);
  const selectedUserIndex = useRecoilValue(selectedUserIndexState);
  const [message, setMessage] = useState<string>('');

  const selectedUserQuery = useQuery({
    queryKey: ['user', selectedUserId],
    queryFn: () => getUserById(selectedUserId),
  });

  const sendMessageMutaton = useMutation({
    mutationFn: async () => {
      return sendMessage({
        message,
        chatUserId: selectedUserId,
      });
    },
    onSuccess: () => {
      setMessage('');
      getAllMessagesQuery.refetch();
    },
  });

  const getAllMessagesQuery = useQuery({
    queryKey: ['messages', selectedUserId],
    queryFn: () => getAllMessages({ chatUserId: selectedUserId }),
  });

  return selectedUserQuery.data !== null ? (
    <div className='w-full h-screen flex flex-col'>
      <Person
        index={selectedUserIndex}
        isActive={false}
        name={selectedUserQuery.data?.email?.split('@')?.[0]}
        onChatScreen={true}
        onlineAt={new Date().toISOString()}
        userId={selectedUserQuery.data?.id}
      />

      <div className='w-full flex-1 flex flex-col p-4 gap-3'>
        <Message isFromMe={true} message={'안녕하세요.'} />
        <Message isFromMe={false} message={'반갑습니다.'} />
        <Message isFromMe={true} message={'안녕하세요.'} />
        <Message isFromMe={true} message={'안녕하세요.'} />
        <Message isFromMe={false} message={'반갑습니다.'} />
        <Message isFromMe={false} message={'반갑습니다.'} />
      </div>

      <div className='flex'>
        <input
          className='p-3 w-full border-2 border-light-blue-600'
          placeholder='메시지를 입력하세요.'
        />

        <button
          className='min-w-20 p-3 bg-light-blue-600 text-white'
          color='light-blue'
        >
          <span>전송</span>
        </button>
      </div>
    </div>
  ) : (
    <div className='w-full'></div>
  );
};

export default ChatScreen;
