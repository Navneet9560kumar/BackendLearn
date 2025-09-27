import "./App.css";

import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
import Home from "./components/Pages/Home";
import Products from "./components/Pages/Products";
import {
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Contactinfo from "./components/ContactInfo";
import ContactFrom from "./components/ContactFrom";
import NotFound from "./components/NotFound";
import JobLayout from "./layout/JobLayout";
import Jobs, { jobsLoader } from "./components/Pages/Jobs";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index path="/" element={<Home />} />
        <Route path="Products" element={<Products />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} >
        <Route path="info" element={<Contactinfo/>} />
          <Route path="from" element={<ContactFrom/>} />
        </Route>
        <Route path='jobs'element={<JobLayout/>}>
        <Route index element={<Jobs/>} loader={jobsLoader}/>

        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    )
  );

  return (
    <div>
  
    
      <RouterProvider router={router}/>
          
      </div>
   
  );
}

export default App;
