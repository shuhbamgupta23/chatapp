import React from "react";
import Contact from "../Chat/Contact";
import ChatContact from "../Chat/ChatContainer";
import { Toolbar } from "@mui/material";
import { useState } from "react";

const Main = ({allContact}) => {
  const [currentContact, setContact] = useState("");
  const buttonClick = (data) => {
    setContact(data);
  };
 
  
  return (
    <Toolbar>
      <Contact buttonClick = {buttonClick} allContact = {allContact} />
      <ChatContact currentContact = {currentContact}/>
    </Toolbar>
  );
};

export default Main;
