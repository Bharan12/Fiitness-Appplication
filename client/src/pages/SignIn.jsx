import { Link, useNavigate } from "react-router-dom";
import { postData } from "../services/apiService";
import { useState } from "react";
import { useAuth } from "../context/Auth";

function SignIn() {
  const [udata, setUdata] = useState({ email: "", password: "" });
  const [auth,setAuth]=useAuth();
  const navigate=useNavigate();
  const onSubmit = (e) => {
    e.preventDefault()
    postData("/signin", udata)
      .then((user) => {
        console.log(user)
        if(user.data.success===true){
          console.log(user.data.success);
          if(user.data.user.type==='user'){
            localStorage.setItem('auth',JSON.stringify(user.data))
            console.log(user.data.user.type);
            setAuth({
              ...auth,
              user:user.data.user,
              token:user.data.token
            })
            return navigate('/userhome');
          }
          else if(user.data.user.type==='trainer'){
            localStorage.setItem('auth',JSON.stringify(user.data))
            sessionStorage.setItem(user.data.user.email,"temail")
            console.log(user.data.user.type);
            setAuth({
              ...auth,
              user:user.data.user,
              token:user.data.token
            })
            return navigate('/trainerhome')
          }
          
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={onSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    onChange={(e) =>
                      setUdata({ ...udata, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={(e) =>
                      setUdata({ ...udata, password:e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    to={""}
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white   bg-sky-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignIn;
