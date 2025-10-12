import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import Login from './components/Auth/login'
import AdminDashbord from './components/Dashbord/AdminDashbord'
import EmployeeDashboard from './components/Dashbord/EmployeeDashboard'
import { getLocalStorage, setLocalStorage } from './utils/LocalStorage'
import { AuthContext } from './context/AuthProvider'

const App = () => {

const  [user, setUser] = useState(null);
const authData  = useContext(AuthContext);
console.log(authData.userData?.employees);


const handleLogin = (email,password)=>{
  if(email== 'admin@me.com' && password =='123'){
    setUser("admin")
    // console.log(user)
  }else if(authData ){
   setUser("employee")
  //  console.log(user)
  }else{
    alert("Invalid Credentials")
  }
}



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
      {user == 'employee' ? <EmployeeDashboard /> : ""}
    </>
  )
}

export default App
