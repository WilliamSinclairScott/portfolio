// /home/wsinscott/code/personal/dungeonsanddragonsportfolio/src/app/5e/ClientDrawPage.tsx
'use client';

// import dynamic from 'next/dynamic';
import Chat from '../../components/MessageBoard'
// // Dynamically import the DrawingCanvas component
// const DrawingCanvas = dynamic(() => import('../../components/GameBoard'), {
//   ssr: false,
// });

const ClientDrawPage: React.FC = () => {
  // return (
  //   <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gray-100">
  //     <h1 className="text-2xl font-bold mb-4">Draw on the Canvas</h1>
  //     <DrawingCanvas />
  //   </div>
  // );

  return (
    <div>
      <h1>Chat</h1>
      <Chat />
    </div>
  );
};

export default ClientDrawPage;
