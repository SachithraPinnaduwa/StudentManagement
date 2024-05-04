import { MouseEvent } from 'react';

import Navigation from '../components/Navigation';

function Home({ user }) {
  const logout = (e: MouseEvent) => {
    window.open("http://localhost:8080/auth/logout", "_self")
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
       <Navigation />
    <div className=" flex items-center justify-center flex-col">
     
      <div className=" mx-auto bg-white rounded-lg shadow-lg p-4 m-4">
        <h1 className="text-2xl font-bold mb-4">Home</h1>
        <div className="flex items-center space-x-4 mb-4">
          <img src={user.picture} alt="profile" className="w-12 h-12 rounded-full" />
          <h2 className="text-xl">{user.name}</h2>
        </div>
        <div className="mb-4">
          <input type="text" defaultValue={user.email} placeholder="Enter your Email" className="border border-gray-300 rounded-md px-4 py-2 w-full" />
        </div>
        
        <button onClick={logout} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Log out</button>
      </div>
      {/* <AddStudentForm />
      <ProductTable /> */}
    </div>
  </div>
  )
}

export default Home;
