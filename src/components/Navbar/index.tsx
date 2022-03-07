import React from "react";
import { useNavigate } from "react-router-dom";
import indexifyLogo from "../../assets/Indexify.png";
import requestsService from "../../utils/requests.service";

import { SearchForm } from "../SearchForm";

export const NavBar = () => {
  const navigate = useNavigate();
  const logoutUser = () => {
    requestsService.logout();
    navigate("/login");
  };
  return (
    <div className="w-full shadow-md  py-4 bg-white px-4">
      <div className="w-full max-w-screen-2xl mx-auto flex justify-between items-center">
        <div>
          <img src={indexifyLogo} height={30} alt="Indexify Logo" />
        </div>
        <div className="w-1/3">
          <SearchForm />
        </div>
        <div>
          <button
            type="submit"
            className="text-center py-4 px-8 font-medium rounded-lg bg-[#428AF5] text-white hover:bg-blue-600 transition-colors duration-300 w-full"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
