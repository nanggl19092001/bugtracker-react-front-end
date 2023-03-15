import { useParams } from "react-router-dom";
import GetProject from "../../FetchData/GetProject";
import { HomeContext } from "../../Context/HomeContext";
import { useContext, useState } from "react";
import ModalNewTicket from "../notify/ModalNewTicket";
import Empty from "./Empty";

function ProjectTicket() {
  const { id } = useParams();
  const [reload,setReload] = useState(false);
  const { SERVER_DOMAIN, token } = useContext(HomeContext);
  const { data: ticket } = GetProject(
    `${SERVER_DOMAIN}/user/ticket/project?token=${token}&id=${id}`,reload
  );
  console.log(ticket);
  const [isOpenTicketModal, setIsOpenTicketModal] = useState(false);
  const toggleTicketModal = () => {
    setIsOpenTicketModal(!isOpenTicketModal);
  };
  return (
    <div className="tickets col-span-2 shadow-md">
      <div className="mx-4 my-2">
        <h2 className="inline text-lg text-text-color font-bold">Ticket</h2>
        <div className="inline float-right">
          <button
            className="bg-blue-600 text-white opacity-80 text-[14px] rounded-md 
            font-bold mx-2 mb-4 px-2 py-1 hover:opacity-100 transition duration-300 ease-in-out"
            onClick={toggleTicketModal}
          >
            New Ticket
          </button>
        </div>
        <ModalNewTicket
          idProject = {id}
          isOpenTicketModal={isOpenTicketModal}
          toggleModal={toggleTicketModal}
          reload={reload}
          setReload={setReload}
        />
        {ticket && ticket.length === 0 && <Empty />}
        {ticket && ticket.length > 0 && (
          <table className="table-fixed w-full min-h-[250px] py-2 font-light border-b border-gray-200">
            <thead>
              <tr>
                <th className="w-2/12 text-start">Name</th>
                <th className="w-6/12 text-start">Description</th>
                <th className="w-3/12 text-start">Contributor</th>
                <th className="text-start"></th>
              </tr>
            </thead>
            <tbody>
              
              {/* <tr className="border-t border-gray-200 h-11 hover:bg-slate-300 cursor-pointer">
              <td className="whitespace-nowrap overflow-hidden text-ellipsis font-normal">Ticket1</td>
              <td className="whitespace-nowrap overflow-hidden text-ellipsis ">This is Ticket 1</td>
              <td className="whitespace-nowrap overflow-hidden text-ellipsis">Halo Ng</td>
              <td className="relative"></td>
            </tr> */}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProjectTicket;
