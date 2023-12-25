import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const OcrDataForm = () => {
  //Object is defined to decide the format of data to be recieved as state
  const userData = {
    idNumber: "",
    fname: "",
    lname: "",
    doBirth: "",
    doIssue: "",
    doExpiry: "",
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(userData);

  //this will set the user data according to the input in the input table
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  //this will submit the form and update the data of the user according to the id and the data filled in input tabs
  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("/create", user)
      .then(() => {
        toast.success("Saved Successfully", { position: "top-right" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`/getOne/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <div>
      {/* Form */}
      <form className="max-w-md mx-auto" onSubmit={submitForm}>
        <div className="mb-2">
          <label
            htmlFor="idNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            ID Number:
          </label>
          <input
            type="text"
            onChange={inputChangeHandler}
            id="idNumber"
            name="idNumber"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter ID Number"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="fname"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            First Name:
          </label>
          <input
            type="text"
            onChange={inputChangeHandler}
            id="fname"
            name="fname"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter First Name"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="lname"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Last Name:
          </label>
          <input
            type="text"
            onChange={inputChangeHandler}
            id="lname"
            name="lname"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Last Name"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="doBirth"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Date of Birth:
          </label>
          <input
            type="text"
            onChange={inputChangeHandler}
            id="doBirth"
            name="doBirth"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Date of Birth"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="doIssue"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Date of Issue:
          </label>
          <input
            type="text"
            onChange={inputChangeHandler}
            id="doIssue"
            name="doIssue"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Date of Issue"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="doExpiry"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Date of Expiry:
          </label>
          <input
            type="text"
            onChange={inputChangeHandler}
            id="doExpiry"
            name="doExpiry"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Date of Expiry"
          />
        </div>
        <div className="mb-2 flex justify-between">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
          <Link
            to={"/"}
            type="back"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default OcrDataForm;