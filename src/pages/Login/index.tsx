import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import indexifyLogo from "../../assets/Indexify.png";
import { useAppDispatch } from "../../store/hooks";
import { ILoginRequest } from "../../types";
import RequestServices from "../../utils/requests.service";

export const LoginPage = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginData, setLoginData] = useState<ILoginRequest>({ email: "" });
  const submitLoginForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loginData.email.length > 0) {
      sendLoginRequest();
    } else {
      alert("Kindly input a your email");
    }
  };
  const sendLoginRequest = () => {
    RequestServices.login(loginData)
      .then((response) => {
        RequestServices.setUserInLocalStorage({
          email: loginData.email,
          token: response.data.token,
        });
        navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className=" w-11/12 max-w-md">
        <img
          className="mx-auto mb-5"
          width={150}
          src={indexifyLogo}
          alt="Indexify Logo"
        />
        <div className="bg-white shadow-md py-10 px-8 rounded-md">
          <h3 className="text-xl font-bold mb-12">Login To Your Account</h3>
          <form onSubmit={submitLoginForm}>
            <div>
              <label className="font-semibold text-sm" htmlFor="emailAddress">
                Email Address
              </label>
              <br />
              <input
                className="w-full border-2 p-2 border-gray-200 rounded-lg mt-2"
                type="email"
                name="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ email: e.target.value })}
                placeholder="example@email.com"
                required
              />
            </div>
            <div className="mt-12">
              <button
                className="text-center py-3 text-lg font-medium rounded-lg bg-[#428AF5] text-white hover:bg-blue-600 transition-colors duration-300 w-full"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
