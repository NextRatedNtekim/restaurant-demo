// import { 
//   createBrowserRouter, 
//   Route, 
//   createRoutesFromElements,
//   RouterProvider 
// } from 'react-router-dom'
// import Home from "./pages/home"
// import Root from "./components/navbar"
// import Contact from "./pages/contact"
// import Menu from "./pages/menu"
// import About from "./pages/about"
// import Order from "./pages/order"

// function App() {
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path='/' element={<Root />}>
//         <Route index element={<Home />}/>
//         <Route path='/contact' element={<Contact />}/>
//         <Route path='/menu' element={<Menu />}/>
//         <Route path='/about' element={<About />}/>
//         <Route path='/order' element={<Order />} />
//       </Route>
//     )
//   ) 

//   return (
    
//     <div>
//       <RouterProvider router={router}/>
//     </div>
//   )
// }

// export default App



import { 
  createBrowserRouter, 
  Route, 
  createRoutesFromElements,
  RouterProvider 
} from 'react-router-dom';

import Home from "./pages/home";
import Root from "./components/navbar";
import Contact from "./pages/contact";
import Menu from "./pages/menu";
import About from "./pages/about";
import Order from "./pages/order";
import { CartProvider } from "./components/CartContent"; // ✅ fixed

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/about' element={<About />} />
        <Route path='/order' element={<Order />} />
      </Route>
    )
  );

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;