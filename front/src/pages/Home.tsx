import { MouseEvent } from 'react';
import Navigation from '../components/Navigation';
import { motion } from 'framer-motion';

function Home({ user }) {
  const logout = (e: MouseEvent) => {
    localStorage.removeItem('user');
    window.open("http://localhost:8080/auth/logout", "_self")
  }

  return (
    <div className='min-h-screen bg-gray-100'>
       <Navigation user={user}/>
       <div className="flex items-center justify-center min-h-screen bg-gray-800 ">
      
           <motion.div 
             initial={{ opacity: 0}}
             animate={{ opacity: 1 }}
             transition={{ duration: 2.5 }}
             className="p-10 ">
             <div className="p-8 bg-blue-900 rounded-lg shadow-lg flex flex-col justify-center items-center">
               <h1 className="mb-4 text-2xl font-bold text-center text-white">Welcome</h1>
               <img src={user.picture} alt="profile" className="w-20 h-20 rounded-full mb-4" />
               <div className="flex items-center mb-4 space-x-4">
                
                 <h2 className="text-xl"><span className='font-bold text-white'>User Name </span>: <span className='text-white'> {user.name} </span></h2>
               </div>
              
               <button onClick={logout} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Log out</button>
             </div>
           </motion.div>
          
      
       </div>
    </div>
  )
}

export default Home;
