import React from "react";
import Contact from "../Chat/Contact";
import ChatContact from "../Chat/ChatContainer";
import {  Toolbar } from "@mui/material";

const Main = () => {

  return (
    <Toolbar>
      <Contact />
      <ChatContact />
    </Toolbar>
  );
};

export default Main;
