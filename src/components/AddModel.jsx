import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import swal from "sweetalert";
const AddModel = (props) => {
  // console.log(props.value);
  let token = localStorage.getItem("accessToken");
  const file = props.file;

  // console.log("a");
  const addfile = () => {
    const fileInput = document.querySelector("#fileInput");
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("name", props.value.name);
    formData.append("code", props.value.code);
    // console.log(file);
    axios
      .post("https://file-upload-4grn.onrender.com/file/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        props.Link(res.data.path);
        swal({
          text: res.data.path,
          icon: "success",
        });
        props.onClose();
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        swal({
          text: err.response.data.msg,
          icon: "error",
        });
      });
  };
  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="name"
            value={props.name}
            onChange={props.onChange}
            placeholder=" Name"
            required
          />
          <br />
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="code"
            value={props.code}
            onChange={props.onChange}
            placeholder="Code"
            required={true}
          />

          <br />
          <br />
          <Button variant="contained" component="label">
            {" "}
            Upload
            <input
              id="standard-basic"
              type="file"
              name="file"
              // value={props.file}
              onChange={props.fileupload}
              // id="fileInput"
              placeholder="File"
              hidden
              required
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={addfile}>Add Product</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddModel;
