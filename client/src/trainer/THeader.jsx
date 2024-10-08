// import React from 'react'
// import {
//   Dialog,
//   DialogBackdrop,
//   DialogPanel,
//   DialogTitle,
// } from "@headlessui/react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { deleteData, getData, postData, putData } from "../services/apiService";
// import axios from "axios";

function THeader() {
  const [profile, setProfile] = useState(false);
  const [auth, setAuth] = useAuth();
  const [scheduleData, setScheduleData] = useState([]);
  const [scheduleUpdateData, setScheduleUpdateData] = useState({
    date: "",
    time: "",
    amount: "",
  });
  const id = JSON.parse(localStorage.getItem("auth"));
  const [open, setOpen] = useState(false);
  const [scheduleUpdateOpen, setScheduleUpdateOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [booking, setBooking] = useState([]);
  const handleScheduleUpdateOpen = () => setScheduleUpdateOpen((cur) => !cur);
  const handleOpen = () => setOpen(!open);
  const handleBookingOpen = () => setBookingOpen(!open);
  const navigate = useNavigate();
  const showProfile = () => {
    if (profile === true) {
      return setProfile(false);
    } else {
      return setProfile(true);
    }
  };
  useEffect(() => {
    getData("/schedule/data/" + id.user._id).then((res) => {
      setScheduleData([res.data]);
      setScheduleUpdateData({
        date: res.data.date || "", // Add default empty string
        time: res.data.time || "", // Add default empty string
        amount: res.data.amount || "", // Add default empty string
      });
    });
  }, []);
  
  console.log(booking);
  useEffect(() => {
    getData("/booking/data/" + id.user._id).then((res) => {
      setBooking(res.data.user);
    });
  }, []);

  const handleUpdateSchedule = (e) => {
    e.preventDefault();
    console.log(scheduleUpdateData);
    putData("/trainer/schedule/update/" + id.user._id, scheduleUpdateData)
      .then((result) => {
        if (result.data.message === "Update successfully") {
          setScheduleUpdateOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   if (open === true) {
  //     return setOpen(false);
  //   } else {
  //     return setOpen(true);
  //   }
  // };
  const logout = () => {
    setAuth({
      ...auth,
      user: "",
      token: "",
    });
    localStorage.clear("auth");
    return navigate("/");
  };
  /// handledelete schedule
  const handledelete = (id) => {
    deleteData("/schedule/delete/" + id)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleApprove=(bookingId)=>{
    postData('/booking/approve/'+bookingId,{action:'approve'}).then((data)=>{
      console.log(data);
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {/* <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          --> */}
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  //   stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    // stroke-linecap="round" stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/* <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          --> */}
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center"></div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    aria-current="page"
                  >
                    Fitness
                  </a>
                  <Link
                    href="#"
                    to="/trainerhome"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Home
                  </Link>
                  <Link
                    onClick={handleOpen}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Schedules
                  </Link>
                  <Link
                    onClick={handleBookingOpen}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Booking
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <!-- Profile dropdown --> */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    onClick={showProfile}
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 h-8 w-8 rounded-full text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </span>
                  </button>
                </div>

                {profile && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                    {/* <Link
                      to="/trainerprofile"
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </Link> */}
                    {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem"  id="user-menu-item-1">Settings</a> */}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      id="user-menu-item-2"
                      onClick={logout}
                    >
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2"></div>
        </div>
      </nav>
      <div>
        {/* schedule display */}
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Schedules</DialogHeader>
          <DialogBody>
            <div className="mt-2">
              <table className="table-fixed">
                <thead>
                  <tr className="border-b-2 p-8">
                    <th className="px-6">Schedules Date</th>
                    <th className="px-6">Time</th>
                    <th className="px-6">Amount</th>
                    <th className="px-6">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.length > 0 ? (
                    scheduleData.map((data) =>
                      // Ensure 'data' is not null and fields exist
                      data ? (
                        <tr key={data._id}>
                          <td className="px-6">{data.date || "N/A"}</td>
                          <td className="px-6">{data.time || "N/A"}</td>
                          <td className="px-6">{data.amount || "N/A"}</td>
                          <td className="px-6">
                            <button
                              onClick={() => handledelete(data.trainerId)}
                              className="rounded-md bg-red-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-500 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                              type="button"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ) : (
                        <tr key={Math.random()}>
                          <td colSpan={4} className="px-6 text-red-500">
                            Invalid schedule data
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 text-center">
                        No schedules available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant=""
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="" color="green" onClick={handleScheduleUpdateOpen}>
              <span>Schedule Update</span>
            </Button>
          </DialogFooter>
        </Dialog>
        {/* schedules_update */}
        <div className="schedules_update">
          <form action="">
            <Dialog
              size="xs"
              open={scheduleUpdateOpen}
              handler={handleScheduleUpdateOpen}
              className="bg-transparent shadow-none flex justify-center align-middle"
              style={{ marginTop: "200px" }}
            >
              <Card className="mx-auto w-full max-w-[24rem]">
                <CardBody className="flex flex-col gap-4">
                  <Typography
                    className="mb-3 font-normal"
                    variant="paragraph"
                    color="gray"
                  >
                    Schedule Update
                  </Typography>

                  <Typography className="-mb-2" variant="h6">
                    Your Date
                  </Typography>
                  <Input
                    size="lg"
                    type="date"
                    value={scheduleUpdateData?.date || ""} // Safe access using optional chaining
                    onChange={(e) =>
                      setScheduleUpdateData({
                        ...scheduleUpdateData,
                        date: e.target.value,
                      })
                    }
                  />

                  <Typography className="-mb-2" variant="h6">
                    Your Time
                  </Typography>
                  <Input
                    size="lg"
                    type="time"
                    value={scheduleUpdateData?.time || ""} //{/* Safe access */}
                    onChange={(e) =>
                      setScheduleUpdateData({
                        ...scheduleUpdateData,
                        time: e.target.value,
                      })
                    }
                  />

                  <Typography className="-mb-2" variant="h6">
                    Amount
                  </Typography>
                  <Input
                    size="lg"
                    value={scheduleUpdateData?.amount || ""} //{/* Safe access */}
                    onChange={(e) =>
                      setScheduleUpdateData({
                        ...scheduleUpdateData,
                        amount: e.target.value,
                      })
                    }
                  />
                </CardBody>
                <CardFooter className="pt-0 flex justify-evenly">
                  <Button
                    variant="danger"
                    onClick={handleScheduleUpdateOpen}
                    className="bg-red-500"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant=""
                    type="submit"
                    className="flex justify-evenly"
                    onClick={handleUpdateSchedule}
                  >
                    Schedule Update
                  </Button>
                </CardFooter>
              </Card>
            </Dialog>
          </form>
        </div>

        {/* Booking */}
        <div className="booking grid place-items-center">
          
            <Dialog
              size="sm"
              open={bookingOpen}
              handler={handleBookingOpen}
            >
              <DialogHeader>Bookings</DialogHeader>
              <DialogBody>
                <div className="mt-2">
                  <table className="table-fixed">
                    <thead>
                      <tr className="border-b-2 p-8">
                        <th className="px-6">Name</th>
                        <th className="px-6">Email</th>
                        <th className="px-6">Contact</th>
                        <th className="px-6">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {booking.length > 0 ? (
                        booking.map((data) =>
                          // Ensure 'data' is not null and fields exist
                          data ? (
                            <tr key={data._id}>
                              <td className="px-6">{data.details.name || "N/A"}</td>
                              <td className="px-6">{data.details.email || "N/A"}</td>
                              <td className="px-6">{data.details.contact || "N/A"}</td>
                              <td className="px-6">
                                <button
                                  onClick={() => handleApprove(data.sessionId)}
                                  className="rounded-md bg-green-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-500 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                                  type="button"
                                >
                                {data.status==='pending'?'Waiting For Approve':'approvel'}
                                </button>
                    
                              </td>
                            </tr>
                          ) : (
                            <tr key={Math.random()}>
                              <td colSpan={4} className="px-6 text-red-500">
                                No Boking data
                              </td>
                            </tr>
                          )
                        )
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 text-center">
                            No Booking available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant=""
                  color="red"
                  onClick={()=>setBookingOpen(false)}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
              </DialogFooter>
            </Dialog>
        </div>
      </div>
    </>
  );
}

export default THeader;
