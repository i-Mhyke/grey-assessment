import React, { useEffect, useState } from "react";
import { currentSearch } from "../../store/features/search/searchSlice";
import { useAppSelector } from "../../store/hooks";
import { ICompanyData, ICompanyDataPayload } from "../../types";
import { formatDate } from "../../utils";
import requestsService from "../../utils/requests.service";
import { CompanyModal } from "../ComapnyModal";

export const CompanyTable = () => {
  const searchWord = useAppSelector(currentSearch);
  const [companies, setCompanies] = useState<ICompanyDataPayload>();
  const [page, setPage] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<ICompanyData>();

  const openCompanyModal = (company: ICompanyData) => {
    setOpenModal(true);
    setSelectedCompany(company);
  };
  useEffect(() => {
    setPage(0);
  }, [searchWord]);
  useEffect(() => {
    requestsService
      .getPaginatedCompanies({ page, companyName: searchWord })
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, searchWord]);

  return (
    <>
      {companies ? (
        <div className="w-full py-10 px-4 relative">
          <div className="w-full max-w-screen-lg mx-auto ">
            <table className="table-auto w-full bg-white shadow-md">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
                {companies &&
                  companies.payload.companies.map((company: ICompanyData) => (
                    <tr
                      onClick={() => openCompanyModal(company)}
                      key={company._id}
                    >
                      <td>{company.company_name}</td>
                      <td>{company.email}</td>
                      <td>{company.address}</td>
                      <td>{formatDate(company.createdAt)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="flex justify-end pt-10 items-center space-x-3">
              <button
                disabled={page === 0}
                className="bg-[#428AF5] text-white p-2 rounded-md disabled:cursor-default disabled:bg-gray-300"
                onClick={() => setPage(page - 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div>
                {companies.payload.page + 1}{" "}
                <span className="text-gray-400">
                  of{" "}
                  {companies.payload.pages < 1
                    ? 1
                    : Math.round(companies.payload.pages)}
                </span>
              </div>
              <button
                disabled={companies.payload.page + 1 >= companies.payload.pages}
                onClick={() => setPage(page + 1)}
                className="bg-[#428AF5] text-white p-2 rounded-md disabled:cursor-default disabled:bg-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
          <CompanyModal
            closeModal={() => setOpenModal(false)}
            companyData={selectedCompany}
            open={openModal}
          />
        </div>
      ) : (
        <div>No companies listed</div>
      )}
    </>
  );
};
