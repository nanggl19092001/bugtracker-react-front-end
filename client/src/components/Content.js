import React, { useContext } from "react";
import { HomeContext } from "../Context/HomeContext";
import Header from "./Header";
import Dashboard from "./content/Dashboard";
import Ticket from "./content/Ticket";

function Content() {
    const {page} = useContext(HomeContext)
    return ( 
        <div className="col-span-4 bg-gray-200 min-h-screen xl:col-span-7">
            <Header />
            {page === '1' ? <Dashboard /> : <Ticket />}
        </div>
    );
}

export default Content;