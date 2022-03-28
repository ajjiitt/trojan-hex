import React from "react";
import { useState, useEffect } from "react";
import abiArray from "../../utils/abiArray.json";
import { getAccountID, intializeContract } from "../../utils/connectWallet";
import { Link } from "react-router-dom";
const AddHours = () => {
  const [inputs, setinputs] = useState({
    address: "",
    amount: 0,
  });

  let getId;

  const [adminAddress, setAdminAddress] = useState(localStorage.account);
  const [volunters, setVolunters] = useState([]);
  const [requests, setRequests] = useState([]);
  const contractAddress = "0xc226b7A0bf726De824Ef44aac09C29Cd1F6172C7";
  const contract = intializeContract(abiArray, contractAddress);
  console.log(adminAddress);

  const onChange = (e) => {
    // console.log
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addCommunityHours = async (address, amount) => {
    const addedHours = await contract.methods
      .addHours(address, amount)
      .send({ from: adminAddress });
    console.log(addedHours);
    location.reload()
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Add Work Hours to Volunteers
            </h1>
          </div>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div className="relative flex-grow w-full">
              <label
                for="full-name"
                className="leading-7 text-sm text-gray-600"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={inputs.address}
                onChange={(e) => onChange(e)}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative flex-grow w-full">
              <label for="email" className="leading-7 text-sm text-gray-600">
                No of hours
              </label>
              <input
                type="text"
                id="name"
                name="amount"
                value={inputs.amount}
                onChange={(e) => onChange(e)}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              onClick={() => {
                addCommunityHours(inputs.address, inputs.amount);
              }}
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddHours;
