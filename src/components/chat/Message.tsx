'use client';

const Message = ({ isFromMe, message }) => {
  return (
    <div
      className={`w-fit p-3 rounded-md ${
        isFromMe ? 'ml-auto bg-blue-400 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <p>{message}</p>
    </div>
  );
};

export default Message;
