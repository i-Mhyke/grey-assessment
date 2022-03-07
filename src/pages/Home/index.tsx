import React from "react";
import { NavBar } from "../../components/Navbar";
import { CompanyTable } from "../../components/CompanyTable";

export const HomePage = () => {
  return (
    <div>
      <NavBar />
      <CompanyTable />
    </div>
  );
};
