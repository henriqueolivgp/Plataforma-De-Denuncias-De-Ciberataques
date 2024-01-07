import Footer from '../components/Footer';
import NavbarV2 from '../components/Navbar';

import {Outlet} from 'react-router-dom';

function App() {


  return (
    <>
      <NavbarV2/>
			<Outlet />
			<Footer/>
    </>
  )
}

export default App;