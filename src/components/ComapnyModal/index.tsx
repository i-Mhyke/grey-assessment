import React from "react";
import { ICompanyData } from "../../types";
import { currencyFormatter, formatDate } from "../../utils";

interface ICompanyModalProps {
  companyData?: ICompanyData;
  open: boolean;
  closeModal: () => void;
}

export const CompanyModal = ({
  companyData,
  open,
  closeModal,
}: ICompanyModalProps) => {
  return (
    <>
      {open ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-black/25 focus:outline-none">
            <div className="relative w-full max-w-lg my-6 mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">
                    {companyData?.company_name}
                  </h3>
                  <button
                    className="bg-gray-500 rounded-full w-8 h-8 p-0 border-0 flex items-center justify-center text-white"
                    onClick={() => closeModal()}
                  >
                    X
                  </button>
                </div>
                <div className="relative p-6 flex-auto bg-gray-50">
                  <div className="flex justify-between mb-4 items-center">
                    <p className="font-semibold">Email:</p>
                    <p className="text-gray-700">{companyData?.email}</p>
                  </div>
                  <div className="flex justify-between mb-4 items-center">
                    <p className="font-semibold">Address:</p>
                    <p className="text-gray-700">{companyData?.address}</p>
                  </div>
                  <div className="flex justify-between mb-4 items-center">
                    <p className="font-semibold">Date Created:</p>
                    <p className="text-gray-700">
                      {companyData && formatDate(companyData?.createdAt)}
                    </p>
                  </div>
                  <div className="flex justify-between mb-4 items-center">
                    <p className="font-semibold">No. of staff:</p>
                    <p className="text-gray-700">
                      {companyData?.number_of_staff}
                    </p>
                  </div>
                  <div className="flex justify-between mb-4 items-center">
                    <p className="font-semibold">Country:</p>
                    <p className="text-gray-700">{companyData?.country}</p>
                  </div>
                  <div className="flex justify-between mb-4 items-center">
                    <p className="font-semibold">Net Worth:</p>
                    <p className="text-gray-700">
                      {companyData &&
                        currencyFormatter({
                          amount: companyData.net_worth,
                          currency: companyData.worth_currency,
                        })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
