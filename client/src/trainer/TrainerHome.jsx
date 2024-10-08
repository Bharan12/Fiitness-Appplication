import TLayout from "./layout/TLayout";
import { useNavigate } from "react-router-dom";
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
function TrainerHome() {
  const navigate = useNavigate();
  const [tData, setData] = useState([]);
  const [addBtn, setAddBtn] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [scheduleData, setScheduleData] = useState();
  console.log(tData)
  const id = JSON.parse(localStorage.getItem("auth"));
  useEffect(() => {
    if (tData && tData.length >= 0) {
      return setAddBtn(true);
    } else {
      return setAddBtn(false);
    }
  }, [addBtn]);
  useEffect(() => {
    getData("/tdata/" + id.user._id)
      .then((result) => {
        setData([result.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    postData("/trainer/schedule/" + id.user._id, scheduleData)
      .then((result) => {
        if (result.data.message === "Success") {
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <TLayout>
      <div className="body overflow-y-hidden sm:flex sm:w-full bg-gray-200">
        <div className="max-w-sm w-full   sm:max-w-full m-3 sm:flex  lg:max-w-full lg:flex justify-center">
          <div
            className="flex-none flex bg-cover rounded-t   lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
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
            <div className="mb-8">
              <p className="text-sm text-gray-600 flex items-center">
                <svg
                  className="fill-current text-gray-500 w-3 h-3 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                </svg>
                Trainer only
              </p>
              <div className="text-gray-900 font-bold text-xl mb-2 min-w-[400px] sm:min-w-0 flex justify-between">
                I am Trainer
                <div className="btn md:flex-row sm:flex-col min-w-[400px] ">
                  {addBtn && (
                    <button
                      type="submit"
                      onClick={() => navigate("/trainersignup")}
                      className=" m-2 text-white   bg-sky-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Add Details
                    </button>
                  )}
                  <Button
                    onClick={handleOpen}
                    className="py-3 m-1 p-2  font-semibold"
                  >
                    Book Schedules
                  </Button>
                  <Button
                    onClick={() => navigate("/trainerupdate")}
                    className="py-3 m-1 p-2  bg-green-500 font-semibold"
                  >
                    Edit
                  </Button>
                </div>
              </div>

              {tData?.map((user, index) =>
                user && user.user ? (
                  <div key={index}>
                    <div className="user-details flex justify-stretch m-1">
                      <ul className="w-48 text-sm font-medium m-1 shadow-md p-1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2 border-gray-200 rounded-t-lg dark:border-gray-600">
                          Name
                        </li>
                      </ul>
                      <ul className="w-48 text-sm font-medium m-1 shadow-md text-gray-900 p-1 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2 border-gray-200 rounded-t-lg dark:border-gray-600">
                          {user.user.name}
                        </li>
                      </ul>
                    </div>

                    <div className="user-details flex justify-stretch m-1">
                      <ul className="w-48 text-sm font-medium m-1 shadow-md p-1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2 border-gray-200 rounded-t-lg dark:border-gray-600">
                          Email
                        </li>
                      </ul>
                      <ul className="w-48 text-sm font-medium m-1 shadow-md text-gray-900 p-1 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2 border-gray-200 rounded-t-lg dark:border-gray-600">
                          {user.user.email}
                        </li>
                      </ul>
                    </div>

                    <div className="user-details flex justify-stretch m-1">
                      <ul className="w-48 text-sm font-medium m-1 shadow-md p-1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2 border-gray-200 rounded-t-lg dark:border-gray-600">
                          Contact
                        </li>
                      </ul>
                      <ul className="w-48 text-sm font-medium m-1 shadow-md text-gray-900 p-1 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2 border-gray-200 rounded-t-lg dark:border-gray-600">
                          {user.user.contact}
                        </li>
                      </ul>
                    </div>

                    <div className="user-details flex justify-stretch m-1">
                      <ul className="w-48 text-sm font-medium m-1 shadow-md p-1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2 border-gray-200 rounded-t-lg dark:border-gray-600">
                          Qualifications
                        </li>
                      </ul>
                      <ul className="w-48 text-sm font-medium m-1 shadow-md text-gray-900 p-1 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2 border-gray-200 rounded-t-lg dark:border-gray-600">
                          {user.qualifications}
                        </li>
                      </ul>
                    </div>

                    <div className="user-details flex justify-stretch m-1">
                      <ul className="w-48 text-sm font-medium m-1 shadow-md p-1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2 border-gray-200 rounded-t-lg dark:border-gray-600">
                          Expertise
                        </li>
                      </ul>
                      <ul className="w-48 text-sm font-medium m-1 shadow-md text-gray-900 p-1 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2 border-gray-200 rounded-t-lg dark:border-gray-600">
                          {user.expertise}
                        </li>
                      </ul>
                    </div>

                    <div className="user-details flex justify-stretch m-1">
                      <ul className="w-48 text-sm font-medium m-1 shadow-md p-1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2 border-gray-200 rounded-t-lg dark:border-gray-600">
                          Specialization
                        </li>
                      </ul>
                      <ul className="w-48 text-sm font-medium m-1 shadow-md text-gray-900 p-1 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2 border-gray-200 rounded-t-lg dark:border-gray-600">
                          {user.specialization}
                        </li>
                      </ul>
                    </div>

                    <div className="user-details flex justify-stretch m-1">
                      <ul className="w-48 text-sm font-medium m-1 shadow-md p-1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2 border-gray-200 rounded-t-lg dark:border-gray-600">
                          Message
                        </li>
                      </ul>
                      <ul className="w-48 text-sm font-medium m-1 shadow-md text-gray-900 p-1 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full px-2 py-2 border-gray-200 rounded-t-lg dark:border-gray-600">
                          {user.message}
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
          <div className="schedules">
            <form action="">
              <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none flex justify-center align-middle"
                style={{ marginTop: "200px" }}
              >
                <Card className="mx-auto w-full e max-w-[24rem]">
                  <CardBody className="flex flex-col gap-4">
                    <Typography
                      className="mb-3 font-normal"
                      variant="paragraph"
                      color="gray"
                    >
                      Book Appointment
                    </Typography>
                    <Typography className="-mb-2" variant="h6">
                      Your Date
                    </Typography>
                    <Input
                      size="lg"
                      type="date"
                      onChange={(e) =>
                        setScheduleData({
                          ...scheduleData,
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
                      onChange={(e) =>
                        setScheduleData({
                          ...scheduleData,
                          time: e.target.value,
                        })
                      }
                    />
                    <Typography className="-mb-2" variant="h6">
                      Amount
                    </Typography>
                    <Input
                      size="lg"
                      onChange={(e) =>
                        setScheduleData({
                          ...scheduleData,
                          amount: e.target.value,
                        })
                      }
                    />
                  </CardBody>
                  <CardFooter className="pt-0 flex justify-evenly">
                    <Button
                      variant="danger"
                      onClick={handleOpen}
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
                      Schedules
                    </Button>
                  </CardFooter>
                </Card>
              </Dialog>
            </form>
          </div>
        </div>
      </div>
    </TLayout>
  );
}

export default TrainerHome;
