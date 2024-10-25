import Header from "@/containers/Layout/Header";
import {Outlet} from "react-router-dom";


const Layout = () => {

    return (
        <div>
            <Header/>
            <div className='px-16 pt-8'>
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout;
