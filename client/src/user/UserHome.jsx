import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getData } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
// import { button } from "@material-tailwind/react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
function UserHome() {
  const [tData, setTdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
 
  const navigate = useNavigate();
  useEffect(() => {
    getData("/get/trainer")
      .then((result) => {
        setTdata(result.data.trainers,);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const colums = [
    {
      name: "Name",
      selector: (row) => row.user.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.user.email,
    },
    {
      name: "Contact",
      selector: (row) => row.user.contact,
    },
    {
      name: "Qualifications",
      selector: (row) => row.qualifications,
    },
    {
      name: "Expertise",
      selector: (row) => row.qualifications,
    },
    {
      name: "Specialization",
      selector: (row) => row.specialization,
    },
    {
      name: "Specialization",
      selector: (row) => row.specialization,
    },

    {
      name: "Action",
      cell: (row) => (
        <button
          className="admin-edit-btn border-4 p-2 bg-slate-400 text-white"
          onClick={() =>
            navigate(
              "/tfulldetails",
              sessionStorage.setItem("trainerId", row.userId)
            )
          }
        >
          Book
        </button>
      ),
    },
  ];
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    setSearchValue(searchValue);
    const newdata = tData.filter((res) => {
      return (
        res.specialization &&
        res.specialization.toLowerCase().includes(searchValue)
      );
    });
    setTdata(newdata);
  };
  const clearSearch = () => {
    setSearchValue("");
      getData("/get/trainer")
        .then((result) => {
          setTdata(result.data.trainers,);
        })
        .catch((err) => {
          console.log(err);
        });
  // Reset data to original
  };
  return (
    <Layout>
      <div>
        <DataTable
          columns={colums}
          data={tData}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          selectableRowsHighlight
          highlightOnHover
          subHeader
          subHeaderComponent={
            <>
              <input
                type="text"
                className="admin-search-hover form-control  border-2 p-2"
                placeholder="search here..."
                value={searchValue}
                onChange={handleSearch}
              />
              <button
                onClick={clearSearch}
                className="rounded-md bg-slate-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-500 focus:shadow-none active:bg-slate-700 hover:bg-white-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                type="button"
              >
                clear
              </button>
            </>
          }
        />
        <div className="feedback-dispaly">
          <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                  transition
                  className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                          />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          user name
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">feedback</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      data-autofocus
                      onClick={() => setOpen(false)}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Close
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
}

export default UserHome;
