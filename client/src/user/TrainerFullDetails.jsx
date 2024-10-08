// import React from "react";
// import Razorpay  from 'razorpay'
// import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData, postData } from "../services/apiService";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";

function TrainerFullDetails() {
  const id = sessionStorage.getItem("trainerId");
  // const navigate = useNavigate();
  const [tData, setData] = useState([]);
  const [feedback, setFeedBack] = useState();
  const [addFeedBack, setAddFeedBack] = useState(false);
  const [viewFeedBack, setViewFeedBack] = useState(false);
  const handleAddOpen = () => setAddFeedBack((cur) => !cur);
  const [scheduleData, setScheduleData] = useState([]);
  const [displayFeedback, setDisplayFeedback] = useState([]);
  const userId = JSON.parse(localStorage.getItem("auth"));
  const trainerId = tData.map((u) => u._id);
  const navigate=useNavigate()

  useEffect(() => {
    getData("/tdata/fulldetails/" + id)
      .then((result) => {
        setData([result.data.trainer]);
        setScheduleData([result.data.schedule]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleViewFeedback = () => {
    console.log(trainerId);
    getData("/get/feedback/" + trainerId)
      .then((result) => {
        console.log(result);
        setDisplayFeedback(result.data.details);
      })
      .catch((err) => {
        console.log(err);
      });
    if (viewFeedBack === true) {
      return setViewFeedBack(false);
    } else {
      return setViewFeedBack(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    postData(`/user/feedback/${userId.user._id}/${trainerId}`, { feedback })
      .then((result) => {
        if (result.data.success === true) {
          setAddFeedBack(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleBooking = (id) => {
    postData(`/user/booking`, { userId: userId.user._id, sessionId: id })
      .then((result) => {
        navigate('/userhome')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <>
        <div className="body overflow-y-hidden sm:flex sm:w-full bg-slate-400 justify-stretch ">
          <div className="max-w-sm w-full   sm:max-w-full lg:max-w-full lg:flex justify-center m-2 ">
            <div
              className="flex-none flex bg-cover rounded-t  lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              title="Woman holding a mug"
            >
                {tData?.map((p, index) => (
              p &&  p.photo ? (
                <div key={index}>
                  <img
                    className="h-full sm:w-full object-cover max-w-[400px]"
                    src={`http://localhost:3000/images/${p.photo}`}
                    alt="Avatar of Jonathan Reinink"
                  />
                </div>
              ) : null
            ))}
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-1">
                <p className="text-sm text-gray-600 flex items-center"></p>
                <div className="text-gray-900 font-bold text-xl mb-2 min-w-[400px] sm:min-w-0 flex justify-between">
                  <div className="btn md:flex-row sm:flex-col min-w-[400px] ">
                    <Button
                      onClick={handleViewFeedback}
                      className="py-2 m-1 font-normal"
                    >
                      View Feedback
                    </Button>
                    <Button
                      onClick={() => setAddFeedBack(true)}
                      className="py-2 m-1 font-normal"
                    >
                      Add Feedback
                    </Button>
                  </div>
                </div>

                {tData.map((user,index) => (
                  <>
                    <div className="user-details flex justify-stretch m-1 " key={index}>
                      <ul className="w-48 text-sm font-medium m-1 shadow-md p-1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                          Name
                        </li>
                      </ul>
                      <ul className="w-48 text-sm font-medium m-1 shadow-md text-gray-900 p-1 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                          {user.user.name}
                        </li>
                      </ul>
                    </div>
                    <div className="user-details flex justify-stretch m-1 ">
                      <ul className="w-48 text-sm font-medium m-1 shadow-md p-1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                          Email
                        </li>
                      </ul>
                      <ul className="w-48 text-sm font-medium m-1 shadow-md text-gray-900 p-1 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                          {user.user.email}
                        </li>
                      </ul>
                    </div>
                    <div className="user-details flex justify-stretch m-1 ">
                      <ul className="w-48 text-sm font-medium m-1 shadow-md p-1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                          Contact
                        </li>
                      </ul>
                      <ul className="w-48 text-sm font-medium m-1 shadow-md text-gray-900 p-1 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                          {user.user.contact}
                        </li>
                      </ul>
                    </div>
                    <div className="user-details flex justify-stretch m-1 ">
                      <ul className="w-48 text-sm font-medium m-1 shadow-md p-1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                          Qualifications
                        </li>
                      </ul>
                      <ul className="w-48 text-sm font-medium m-1 shadow-md text-gray-900 p-1 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                          {user.qualifications}
                        </li>
                      </ul>
                    </div>
                    <div className="user-details flex justify-stretch m-1 ">
                      <ul className="w-48 text-sm font-medium m-1 shadow-md p-1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                          Expertise
                        </li>
                      </ul>
                      <ul className="w-48 text-sm font-medium m-1 shadow-md text-gray-900 p-1 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                          {user.expertise}
                        </li>
                      </ul>
                    </div>
                    <div className="user-details flex justify-stretch m-1 ">
                      <ul className="w-48 text-sm font-medium m-1 shadow-md p-1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                          Specialization
                        </li>
                      </ul>
                      <ul className="w-48 text-sm font-medium m-1 shadow-md text-gray-900 p-1 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                          {user.specialization}
                        </li>
                      </ul>
                    </div>
                    <div className="user-details flex justify-stretch m-1 ">
                      <ul className="w-48 text-sm font-medium m-1 shadow-md p-1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                          Message
                        </li>
                      </ul>
                      <ul className="w-48 text-sm font-medium m-1 shadow-md text-gray-900 p-1 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                          {user.message}
                        </li>
                      </ul>
                    </div>
                    {scheduleData?.map((user, index) =>
                      user ? (
                        <div key={index}>
                          <div className="user-details flex justify-stretch m-1 ">
                            <ul className="w-48 text-sm font-medium m-1 shadow-md p-1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                              <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                                Date
                              </li>
                            </ul>
                            <ul className="w-48 text-sm font-medium m-1 shadow-md text-gray-900 p-1 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                              <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                                {user.date}
                              </li>
                            </ul>
                          </div>

                          <div className="user-details flex justify-stretch m-1 ">
                            <ul className="w-48 text-sm font-medium m-1 shadow-md p-1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                              <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                                Time
                              </li>
                            </ul>
                            <ul className="w-48 text-sm font-medium m-1 shadow-md text-gray-900 p-1 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                              <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                                {user.time}
                              </li>
                            </ul>
                          </div>

                          <div className="user-details flex justify-stretch m-1 ">
                            <ul className="w-48 text-sm font-medium m-1 shadow-md p-1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                              <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                                Amount
                              </li>
                            </ul>
                            <ul className="w-48 text-sm font-medium m-1 shadow-md text-gray-900 p-1 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                              <li className="w-full px-2 py-2  border-gray-200 rounded-t-lg dark:border-gray-600">
                                {user.amount}
                              </li>
                            </ul>
                          </div>
                        </div>
                      ) : null
                    )}

                    <div className="btn flex justify-end m-2">
                      <Button
                        className="py-2 m-1 font-normal"

                        onClick={() => handleBooking(user.user._id)}
                      >
                        Booking
                      </Button>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="addfeedback">
              <form action="">
                <Dialog
                  size="xs"
                  open={addFeedBack}
                  handler={handleAddOpen}
                  className="bg-transparent shadow-none flex justify-center align-middle"
                  style={{ marginTop: "200px" }}
                >
                  <Card className="mx-auto w-full e max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                      <Typography className="-mb-2" variant="h6">
                        Enter FeedBack
                      </Typography>
                      <Input
                        size="lg"
                        type="text"
                        placeholder="enter the feedback"
                        onChange={(e) => setFeedBack(e.target.value)}
                      />
                    </CardBody>
                    <CardFooter className="pt-0 flex justify-evenly">
                      <Button
                        variant="danger"
                        type="submit"
                        onClick={() => setAddFeedBack(false)}
                        className="bg-red-500"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant=""
                        type="submit"
                        className="flex justify-evenly"
                        onClick={handleSubmit}
                      >
                        Send
                      </Button>
                    </CardFooter>
                  </Card>
                </Dialog>
              </form>
            </div>
          </div>
          {viewFeedBack && (
            <div
              className="relative z-10"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        {displayFeedback.map((feed,index) => (
                          <>
                            <div className="" key={index}>
                              <div className="header flex align-middle ">
                                <div className="mx-auto flex h-12  w-12 flex-shrink-0 items-center justify-center align-middle rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                  <svg
                                    className="h-6 w-6 text-red-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />{" "}
                                  </svg>
                                </div>
                                <div className="user_name mx-2 p-2">
                                  <h3
                                    className="text-base font-semibold leading-6 text-gray-900"
                                    id="modal-title"
                                  >
                                    {feed.userId.name}
                                  </h3>
                                </div>
                              </div>
                              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500 font-medium">
                                    {feed.feedback}
                                  </p>
                                  <p className="text-sm text-gray-500 border-b-2 pt-2 w-[450px] flex justify-end">
                                    <span className="m-2">{feed.date}</span>
                                    <span className="m-2">{feed.time}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        onClick={() => setViewFeedBack(false)}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    </Layout>
  );
}

export default TrainerFullDetails;
