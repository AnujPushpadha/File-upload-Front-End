import "./Style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddModel from "../../components/AddModel";
import Button from "@mui/material/Button";
import Data from "../../components/Data";

const Home = () => {
  //logout code

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };
  const [state, setState] = useState({
    open: false,

    name: "",
    code: "",
  });

  const [down, setdown] = useState("");
  const [file, setfile] = useState();
  const fileupload = (event) => {
    setfile(event.target.files);
  };

  let token = localStorage.getItem("accessToken");

  const [array, setarray] = useState([]);

  useEffect(() => {
    const url = "https://file-upload-4grn.onrender.com/file/data";
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setarray(response.data.items);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [array]);

  const openAddModel = () => {
    setState({ open: true });
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onClose = () => {
    setState({ open: false });
  };

  const handleDelete = (_id) => {
    const url = `https://file-upload-4grn.onrender.com/file/delete/${_id}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const Link = (link) => {
    setdown(link);
  };

  return (
    <div>
      <div>
        <Button variant="contained" onClick={openAddModel}>
          Add Products
        </Button>
        <Button variant="contained" onClick={handleLogout} color="secondary">
          Logout
        </Button>
      </div>
      <AddModel
        open={state.open}
        onClose={onClose}
        onChange={onChange}
        value={state}
        Link={Link}
        fileupload={fileupload}
        file={file}
      />

      <Data array={array} handleDelete={handleDelete} link={down} />
    </div>
  );
};

export default Home;
