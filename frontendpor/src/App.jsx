import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import Login from './components/Auth/login'
import AdminDashbord from './components/Dashbord/AdminDashbord'
import EmployeeDashboard from './components/Dashbord/EmployeeDashboard'
import { getLocalStorage, setLocalStorage } from './utils/LocalStorage'
import { AuthContext } from './context/AuthProvider'

const App = () => {

const  [user, setUser] = useState(null);
  const [loogedInUserData, setLoogedInUserData] = useState(null);
const authData  = useContext(AuthContext);


// useEffect(()=>{


//   if(authData){
//  const loggedInUser = localStorage.getItem("loggedInUser")
//     if(loggedInUser){
//       setUser(loggedInUser.role)
//     }
//   }
// }, [authData])


const handleLogin = (email, password) => {
    if (email === 'admin@me.com' && password === '123') {
      setUser("admin");
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }));
    } else if (authData?.userData) {
      const employee = authData.userData?.employees?.find(
        (e) => e.email === email && e.password === password
      );
      if (employee) {
        setUser("employee");
        setLoogedInUserData(employee)
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee' }));
      } else {
        alert("Invalid Credentials");
      }
    }
  };



// handleLogin('admin@me.com',123)

  // ✅ useEffect at the top level of component
  useEffect(() => {
    // setLocalStorage()
    getLocalStorage()
  }); // empty dependency array runs only once

  return (
    <>
    {!user ?   <Login handleLogin={handleLogin} />: ""}
    {user =='admin' ? <AdminDashbord /> : ""}
      {user === 'employee' ? <EmployeeDashboard data={loogedInUserData} /> : null}
    </>
  )
}

export default App





// authData?.userData?.employees?.find((e) => e.email === email && e.password === password)