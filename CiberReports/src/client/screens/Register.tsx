import { Banner } from "flowbite-react";
import { Link } from 'react-router-dom';
import { supabase } from '../../Services/supabase/client';
import { useRef, useState, FormEvent } from "react";
//import { Alert } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

interface SignUpProps {
  email: string;
  password: string;
}

function Register() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const register = async ({ email, password }: SignUpProps) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (!error && data) {
        return data; // or whatever data you want to return
      } else {
        throw new Error(error?.message || 'Unknown error');
      }
    } catch (error) {
      throw new Error("Error in Creating Account");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !passwordRef.current?.value ||
      !emailRef.current?.value ||
      !confirmPasswordRef.current?.value
    ) {
      setErrorMsg("Please fill all the fields");
      toast.error(errorMsg);
      return;
    }
    if (passwordRef.current!.value !== confirmPasswordRef.current!.value) {
      setErrorMsg("Passwords don't match");
      toast.error(errorMsg);
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      await register({
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      });
      setMsg("Registration Successful. Check your email to confirm your account");
        toast.success(msg);
    } catch (error) {
      setErrorMsg("Error in Creating Account");
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Banner />
      {/* Same as */}
      <ToastContainer/>
      <div className="container mx-auto">
        <div className="content mx-auto">
          <div className="flex justify-center items-center h-screen">
            <div className="xl:w-[580px] xl:h-[640px] bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <h1 className="text-xl text-center font-bold font-Epilogue text-gray-900 dark:text-white">Create an account</h1>
                <div className="flex flex-col items-center">
                  <div className="flex flex-col">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" ref={emailRef} required />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" ref={passwordRef} required />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm your password</label>
                    <input type="password" name="confirm_password" id="confirm_password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" ref={confirmPasswordRef} required />
                  </div>
                </div>

                

                <div className="flex items-start"></div>
                <div className="flex justify-center">
                  <button disabled={loading} type="submit" className="w-80 text-white bg-button-blue hover:bg-footer-bg focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create my account</button>
                </div>
                <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
                  Already have an account?
                  <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500">
                    <span className="text-darkAqua">Login</span>
                  </Link>
                </div>
                <div>
                  <div className="flex justify-center space-x-10 columns-2 w-full">
                    <hr className="w-36 h-[2px] my-4 bg-gray-300 border-0 dark:bg-gray-700" />
                    <Link to={"/login"}>Or sign in with</Link>
                    <hr className="w-36 h-[2px] my-4 bg-gray-300 border-0 dark:bg-gray-700" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
