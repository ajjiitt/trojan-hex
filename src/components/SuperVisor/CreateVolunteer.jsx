import React from "react";
import { useState } from "react";
import { getAccountID, intializeContract } from "../../utils/connectWallet";
const CreateVolunteer = () => {
  const [inputs, setinputs] = useState({
    name: "", 
    address: ""
  });
  const contractAddress = '0x21cb42De23aFac678CeD8482E04D4B3699288767';
  const contract = intializeContract(abiArray, contractAddress);
  const adminAddress = getAccountID();

  const onChange = (e) =>{
    setinputs({...inputs, [e.target.name]: e.target.value})
  }

  //form create volunteer
  const createVolunteer = async (address, name) => {
    const createNewVolunteer = await contract.methods.appointVolunteers(address, name).send({from : adminAddress});
    console.log(createNewVolunteer);
  }

  //button to recieve
  const receiveSuppliesFromNgo = async (indexOfSupply) => {
    const getSupplies = await contract.methods.receiveSupples(indexOfSupply).send({from: adminAddress});
    console.log(getSupplies);
  }

  //
  const getAllVolunteers = async (Supervisor_address) =>{
    const getSize = await contract.methods.getSizeOffetchVolunteers(address).call();
    for(let i = 0; i < getSize; i++){
      let volunteer = await contract.methods.fetchVolunteers(Supervisor_address, i).call();
      let volunteer_name = await contract.methods.getVolunteers(volunteer).call();
      console.log(volunteer, volunteer_name);
    }
  } 



  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Add Volunteer to Group/NGO.
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven't heard of them man bun deep.
          </p>
        </div>
        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div className="relative flex-grow w-full">
            <label for="full-name" className="leading-7 text-sm text-gray-600">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative flex-grow w-full">
            <label for="email" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateVolunteer;
