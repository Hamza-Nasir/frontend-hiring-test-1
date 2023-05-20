import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Navbar, Pagination } from "../components";
import axios from 'axios'

import styles from "../styles";
import AuthContext from "../contexts/AuthContext";

function secondsToHms(d: any) {
  var m = Math.floor(d / 60);
  var s = Math.floor((d % 3600) % 60);

  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return mDisplay + sDisplay;
}

function convertDate(inputFormat: string) {
  function pad(s:any) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-')
}


interface itemProps {
  call_type: string;
  created_at: string;
  direction: string;
  duration: any;
  from: string;
  id: string;
  is_archived: boolean;
  to: string;
  via: string;

}

function Dashboard() {
  let location = useLocation();
  const { token } = useContext(AuthContext);  
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageCount, setTotalPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage]= useState(false);
  const { page } = useParams();
  const [openStatus, setOpenStatus] = useState(false);

  useEffect(() => {

    console.log("Inside dashboard, token: ", token)
    
    axios.get('https://frontend-test-api.aircall.io/calls?offset=0&limit=10', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log("Hello!")
      console.log(res.data);
      setCurrentPage(1);
      setData(res.data.nodes);
      setTotalCount(res.data.totalCount);
      setHasNextPage(res.data.hasNextPage);

    }).catch((err) => {
      console.log(err);
    })
  }, [])

  useEffect(() => {
    setTotalPageCount(~~((totalCount / 10) + 1))
    // console.log("Data: ", data);
    // console.log("Total: ", totalCount);
    // console.log("Total pages: ", pageCount);

  }, [data])

  useEffect(() => {
    const pageNo = location.search.split('=')[1];

    if (pageNo === undefined) {
      setCurrentPage(1);
    } else {
      setCurrentPage(Number(pageNo))
    }

  }, [location])

  useEffect(() => {

    console.log("Changing page!")

    axios.get(`https://frontend-test-api.aircall.io/calls?offset=${(currentPage - 1) * 10}&limit=10`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log("Hello!")
      console.log(res.data);
      setData(res.data.nodes);
      setHasNextPage(res.data.hasNextPage);

    }).catch((err) => {
      console.log(err);
    })

  }, [currentPage])

  return (
    <>
      <Navbar loggedIn={true} />
      <div className="w-screen h-screen ml-[43px] mt-[34px]">
      <h1 className="h-[32px] text-[28px]">
        Turing Technologies Frontend Test
      </h1>
      <div className="flex gap-2 mt-4">
        <p>Filter by: </p>
        <p onClick={() => {setOpenStatus(!openStatus); console.log("OpenStatus: ", openStatus)}} className="text-blue-700 hover:cursor-pointer">Status</p>
      </div>
      <div className={`w-64 ${openStatus ? "" : "hidden"} absolute left-[42px] top-[200px] p-4 rounded-lg border-2 border-gray-500`}>
        <ul>
          <li className="bg-blue-200 p-2">All</li>
          <li className="p-2">Archived</li>
          <li className="p-2">Unarchived</li>
        </ul>
      </div>

      <div className="w-full h-4/5 mt-8 mx-auto">
        <table className="border mx-auto">
          <thead className="bg-[#F4F4F9]">
            <th className=" text-left px-8 py-4 ">Call Type</th>
            <th className="border text-left px-8 py-3">Direction</th>
            <th className=" border text-left px-8 py-3">Duration</th>
            <th className=" border text-left px-8 py-3">FROM</th>
            <th className=" border text-left px-8 py-3">TO</th>
            <th className=" border text-left px-8 py-3">VIA</th>
            <th className=" border text-left px-8 py-3">CREATED AT</th>
            <th className="border text-left px-8 py-3">Status</th>
            <th className="border text-left px-8 py-3">Actions</th>
          </thead>

          <tbody>
            {data.length > 1 ? data.map((item: itemProps, index) => (
              <tr key={index} className="">
                <td
                  className={`${
                    item.call_type === "voicemail"
                      ? styles.callTypeVM
                      : item.call_type === "answered"
                      ? styles.callTypeAns
                      : item.call_type === "missed"
                      ? styles.callTypeMissed
                      : ""
                  }
                            px-8 py-6`}
                >
                  {item.call_type === "voicemail" ? "Voice Mail" : item.call_type === "answered" ? "Answered" : "Missed"}
                </td>
                <td className="text-[#325AE7] px-8">{item.direction === "outbound" ? "Outbound" : "Inbound" }</td>
                <td className="w-fit px-8">
                  <div className="flex flex-col">
                    <div>{secondsToHms(item.duration)}</div>
                    <div className="text-[#325AE7]">({item.duration})</div>
                  </div>
                </td>
                <td className="px-8">{item.from}</td>
                <td className="px-8">{item.to}</td>
                <td className="px-8">{item.via}</td>
                <td className="px-8">{convertDate(item.created_at)}</td>
                <td>
                  <p
                    className={`${
                      item.is_archived === true
                        ? styles.statusArchived
                        : styles.statusUnarchive
                    } text-center border `}
                  >
                    {item.is_archived ? "Archived" : "Unarchived"}
                  </p>
                </td>
                <td>
                  <button className="bg-[#4F46F8] p-2 text-white mx-8">
                    Add Note
                  </button>
                </td>
              </tr>
            )) : undefined}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} pageCount={pageCount} />
        <div className="w-full">
          <p className="text-center">{(currentPage - 1) * 10} - {(currentPage - 1) * 10 + 10 > totalCount ? totalCount : (currentPage - 1) * 10 + 10 } of {totalCount} results</p>
        </div>
      </div>
    </div>
    

    </>
    
  );
}

export default Dashboard;
