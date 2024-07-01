import { Outlet, useLoaderData } from "react-router-dom";
import Nav from "../components/Nav";
import {fetchData} from "../helper";
import wave from "../assets/wave.svg";

export default function RootLayout() {
    const {userName} = useLoaderData();
    return (
        <div className="layout">
            <Nav userName={userName}/>
            <main>
                <Outlet />
            </main>
            <img src={wave} alt="footer-img"></img>
        </div>
    );
}

//loader function 
export function rootLoader() {
    const userName = fetchData("userName");
    return {userName};
}
