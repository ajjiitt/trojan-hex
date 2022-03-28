import React from "react";
import abiArray from "../../utils/abiArray.json";
import { intializeContract, getAccountID } from "../../utils/connectWallet";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const CreateSupply = () => {
  const contractAddress = "0xc226b7A0bf726De824Ef44aac09C29Cd1F6172C7";
  const contract = intializeContract(abiArray, contractAddress);
  const adminAddress = localStorage.account;
  const [inputs, setinputs] = useState({
    typeOfSupply: "",
    supervisor: "",
    quantity: "",
  });
  const [requests, setRequests] = useState([]);
  const onChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const createRequest = async (typeOfSupply, supervisor, amount) => {
    const newRequest = await contract.methods
      .createSupplyRequest(typeOfSupply, supervisor, amount)
      .send({ from: adminAddress });
    console.log(newRequest);
    location.reload();
  };

  const sendSupplies = async (index) => {
    console.log(index);
    const initiateSupply = await contract.methods
      .sendSupplies(index)
      .send({ from: adminAddress });
    console.log(initiateSupply);
  };
  const getRequest = async () => {
    let requestarr = [];
    //update address
    const getSize = await contract.methods
      .getSizeOffetchRequests(adminAddress)
      .call();
    console.log(getSize);
    for (let i = 0; i < getSize; i++) {
      console.log(getSize, "CAME TILL HERE");
      let request = await contract.methods.requests(adminAddress, i).call();
      console.log(request);
      if (request.requestState === "0") {
        requestarr.push({ ...request, state: "Created", index: i });
      } else if (request.requestState === "1") {
        requestarr.push({ ...request, state: "Dispatched", index: i });
      } else if (request.requestState === "2") {
        requestarr.push({ ...request, state: "Successful", index: i });
      }
    }
    setRequests(requestarr);
  };
  useEffect(() => {
    getRequest();
  }, []);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Add Supply to an event via NGO/GROUP.
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              haven't heard of them man bun deep.
            </p>
          </div>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div className="relative flex-grow w-full">
              <label
                for="full-name"
                className="leading-7 text-sm text-gray-600"
              >
                Type Of Supply
              </label>
              <input
                type="text"
                id="typeOfSupply"
                name="typeOfSupply"
                value={inputs.typeOfSupply}
                onChange={(e) => onChange(e)}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative flex-grow w-full">
              <label
                for="full-name"
                className="leading-7 text-sm text-gray-600"
              >
                Supervisor
              </label>
              <input
                type="text"
                id="supervisor"
                name="supervisor"
                value={inputs.supervisor}
                onChange={(e) => onChange(e)}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative flex-grow w-full">
              <label for="email" className="leading-7 text-sm text-gray-600">
                Quantity
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={inputs.quantity}
                onChange={(e) => onChange(e)}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              onClick={() => {
                createRequest(
                  inputs.typeOfSupply,
                  inputs.supervisor,
                  inputs.quantity
                );
              }}
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </section>
      <div className="md:mx-auto md:10/12 lg:w-8/12 mb-10">
        <div className="flex justify-between mb-5">
          <Link class="mt-3 text-indigo-500 inline-flex items-center" to="/ngo">
            Manage NGO
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
          <Link
            class="mt-3 text-indigo-500 inline-flex items-center"
            to="/ngo/manage"
          >
            Manage Supply
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                Supervisor
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                Type
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                Quantity/Amount
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                Request State
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                Dispatch
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((r, i) => (
                <tr key={i}>
                  <td className="px-4 py-3">{r.supervisor}</td>
                  <td className="px-4 py-3">{r.supplyType}</td>
                  <td className="px-4 py-3">{r.amount}</td>
                  <td className="px-4 py-3">{r?.state}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        sendSupplies(r.index);
                      }}
                      class="flex mx-auto mt-16 text-white bg-green-500 border-0 px-8 focus:outline-none hover:bg-green-800 rounded text-lg"
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <p className="flex items-center justify-center text-lg text-black">
                No Data Found
              </p>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CreateSupply;
