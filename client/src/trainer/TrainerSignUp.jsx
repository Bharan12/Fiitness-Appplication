// import {Link }from 'react-router-dom'
import { postData } from "../services/apiService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TLayout from "./layout/TLayout";

function SignUp() {

  const id =JSON.parse(localStorage.getItem('auth'))
  const [tdata, setTdata] = useState({

    qualifications: "",
    expertise: "",
    specialization: "",
    file: "",
    message: "",
  });
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("qualifications", tdata.qualifications);
    formData.append("expertise", tdata.expertise);
    formData.append("specialization", tdata.specialization);
    formData.append("file", tdata.file);
    formData.append("message", tdata.message);
    console.log(formData)
    postData("/trainer/signup/"+id.user._id, formData)
      .then((data) => {
        console.log(data)
        if (data.data.success === true) {
          return navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <TLayout>
    <div>
      <section
        className="bg-red-50 dark:bg-gray-900 overflow-y-scroll "
        style={{ heigth: "50rem", paddingTop: "20px" }}
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div
            className="w-full bg-white   rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
            style={{ heigth: "50rem",}}
          >
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8  ">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Other details
              </h1>
              <form
                className="space-y-4 md:space-y-6 "
                action="#"
                onSubmit={onSubmit}
              >
                <div>
                  <label
                    htmlFor="qualification"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Qualification
                  </label>
                  <input
                    type="qualification"
                    name="qualification"
                    id="qualification"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={(e) =>
                      setTdata({ ...tdata, qualifications: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="expertise"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Expertise
                  </label>

                  <input
                    type="text"
                    name="expertise"
                    id="expertise"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={(e) =>
                      setTdata({ ...tdata, expertise: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="specialization"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    id="specialization"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={(e) =>
                      setTdata({ ...tdata, specialization: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="photo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Upload photo
                  </label>
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={(e) =>
                      setTdata({ ...tdata, file: e.target.files[0] })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write message to attract potential..."
                    onChange={(e) =>
                      setTdata({ ...tdata, message: e.target.value })
                    }
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full text-black bg-sky-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
    </TLayout>
  );
}

export default SignUp;
