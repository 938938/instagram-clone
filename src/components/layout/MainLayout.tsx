import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  return (
    <main className='w-screen h-screen flex items-center justify-center'>
      <Sidebar />
      {children}
    </main>
  );
};

export default MainLayout;
