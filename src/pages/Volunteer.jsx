import React, { useState, useEffect } from "react";
import abiArray from "../utils/abiArray.json";
import { intializeContract } from "../utils/connectWallet";
const Volunteer = () => {
  const contractAddress = "0xc226b7A0bf726De824Ef44aac09C29Cd1F6172C7";
  const contract = intializeContract(abiArray, contractAddress);
  const sAddress = "0xe3B3f5ace203d5659eEb0133dec972921ca9bB21";
  const [vhrs, setVhrs] = useState(0);
  const [adminAddress, setAdminAddress] = useState(localStorage.account);
  const getHours = async (Supervisor_address, Volunteer_address) => {
    const totalHours = await contract.methods
      .volunteerWorkHours(Supervisor_address, Volunteer_address)
      .call();
    console.log(totalHours);
    setVhrs(totalHours);
  };
  useEffect(() => {
    getHours(sAddress, adminAddress);
  }, []);
  const redeemHours = async (Supervisor_address) => {
    await contract.methods
      .redeemHours(Supervisor_address)
      .send({ from: adminAddress })
      .then((res) => {
        console.log(res);
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
        <img
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="hero"
          src="data:image/png;base64,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"
        />
        <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Great Work! Claim your reward for your precious contribution
          </h1>
          <p class="mb-8 leading-relaxed">No. of Hours Voluntered : {vhrs}</p>
          <div class="flex w-full justify-center items-end"></div>
          <div className="flex">
            <button
              onClick={() => {
                redeemHours(sAddress);
              }}
              className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-6 h-6"
                viewBox="0 0 512 512"
              >
                <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
              </svg>
              <span className="ml-4 flex items-start flex-col leading-none">
                <span className="text-xs text-gray-600 mb-1">HELP</span>
                <span className="title-font font-medium">Claim Rewards</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Volunteer;
