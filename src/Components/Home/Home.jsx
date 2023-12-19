/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Home.css";
import { backendURL } from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState({
    url: "",
  });

  const [showLink, setShowLink] = useState("Your link will be Shown here");

  const [getLink, setLink] = useState([]);

  const [added, setAdded] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${backendURL}/url`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await response.json();
    if (response.status === 400) {
      toast.error("URL not Valid", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else{
      setShowLink(`${backendURL}/url/${result.shortID}`);
      setAdded(!added)
    }

   

    setData({
      url: "",
    });
  };

  const handleGet = async () => {
    const response = await fetch(`${backendURL}/url`);
    const result = await response.json();
    setLink(result);
  };

  useEffect(() => {
    handleGet();
  }, [added]);


  return (
    <div>
      <div className="urlcontainer">
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="url">Simplify your link</label> <br />
          <input
            type="url"
            name="url"
            value={data.url}
            onChange={handleChange}
            placeholder="Paste your Link"
          />{" "}
          <br />
          <button type="submit">Submit</button>
          {/* <Link to='/url'>Submit</Link> */}
        </form>
        <div className="url">
          <h4>
            <Link to={showLink} target="_blank">
              {showLink}
            </Link>
          </h4>
        </div>
        <div className="tableData">
          <table className="table">
            <thead className="tHead">
              <tr className="tRow">
                <th>Link</th>
                <th>Visited Count</th>
              </tr>
              </thead>
              <tbody>
                {getLink.map((user, i) => (
                  <tr key={i}>
                     <td className="tabData">
                      {" "}
                      <Link
                        to={`${backendURL}/url/${user.shortID}`}
                        target="_blank"
                        className="linkBtn"
                      >{`${backendURL}/url/${user.shortID}`}</Link>
                    </td> 
                    <td>{user.visitedHistory.length} </td>
                  </tr>
                ))}
              </tbody>
          
          </table>
        </div>
      </div>
      <ToastContainer
        newestOnTop={false}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Home;
