import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Toolbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { getMessage } from "../../actions/contactAction";
import { getAllUser, searchFriend } from "../../actions/userAction";
let initialState = { from: "", to: "" };
const Contact = ({ buttonClick, allContact }) => {
  let to = JSON.parse(localStorage.getItem("currentUser"))?._id;
  let from = JSON.parse(localStorage.getItem("userData"))?.result?._id;
  const dispatch = useDispatch();
  let [form, setForm] = useState(initialState);
  const [searchTag, setSearchTag] = useState("");
  const handleContactClick = (i) => {
    setForm({ ...form, ["to"]: to, ["from"]: from });
    dispatch({ type: "currentUser", payload: allContact[i] });
    buttonClick(JSON.parse(localStorage.getItem("currentUser"))?.name);
    dispatch(getMessage(form));
  };

  dispatch(getAllUser());
  const handleSearchChange = (e) => {
    setSearchTag(e.target.value);
  };
  const handleSearchClick = () => {
    dispatch(searchFriend(searchTag));
  };

  return (
    <Container
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        padding: "10px 50px",
        width: "30%",
        height: "80vh",
        mr: "10px",
        overflow: "scroll",
      }}
    >
      <Toolbar>
        <TextField
          color="success"
          name="searchName"
          label="Search your friends"
          fullWidth
          onChange={handleSearchChange}
        />
        <Button
          variant="contained"
          size="large"
          sx={{ ml: "10px" }}
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </Toolbar>
      {(allContact !== null || allContact !== undefined) &&
        allContact?.map((contact, i) => {
          return (
            contact["_id"] !== from && (
              <Button
                color="primary"
                sx={{
                  margin: "5px 0",
                  backgroundColor: "black",
                  textTransform: "none",
                }}
                variant="contained"
                size="large"
                fullWidth
                onClick={() => handleContactClick(i)}
              >
                {contact["name"]}
              </Button>
            )
          );
        })}
    </Container>
  );
};

export default Contact;
