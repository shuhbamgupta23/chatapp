import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Toolbar,
  Button,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../actions/contactAction";
import { io } from "socket.io-client";


const initialData = { message: "", from: "", to: "" };

const ChatContainer = () => {
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [message, setMessage] =  useState();
  const dispatch = useDispatch();
  const currentContact = JSON.parse(localStorage.getItem("currentUser"))?.name;
  const to = JSON.parse(localStorage.getItem("currentUser"))?._id;
  const from = JSON.parse(localStorage.getItem("userData"))?.result?._id;
  const socket = useRef();

  const chats = JSON.parse(localStorage.getItem("currentUserMessageLog"));
  const data = [];
  if (chats !== null) {
    if (Object.keys(chats).length > 0) {
      Object.keys(chats).forEach((key) =>
        data.push({
          index: key,
          actualData: chats[key],
        })
      );
    }
  }
  useEffect(() => {
    if (currentContact !== "") {
      socket.current = io("http://localhost:5000");
      socket.current.emit("addUser", from);
    }
  }, [from]);

  console.log(socket,"sdasa")
  
  useEffect(() => {
    if(socket.current){
      socket.current.on("msg-recieved", (msg) => {
        console.log(msg);
        setArrivalMessage({mySelf:false, message:msg})
      })
    }
  },[arrivalMessage])

  useEffect(() => {
    arrivalMessage && setMessage((pre)=>[...pre, arrivalMessage])
  },[arrivalMessage])


  const [form, setForm] = useState(initialData);

  const handleMessageChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      ["from"]: from,
      ["to"]: to,
    });
    console.log(form);
  };

  const send = (e) => {
    e.preventDefault();
    socket.current.emit("send-msg",{
      to:to,
      from:from,
      message:form["message"]
    })
    dispatch(sendMessage(form));
  };

  return (
    <Container
      sx={{
        backgroundColor: "#F7F1E5",
        borderRadius: 2,
        padding: "10px 50px",
        width: "70%",
        height: "80vh",
        overflow: "scroll",
      }}
    >
      {currentContact == null ? (
        <Box
          sx={{
            color: "white",
            fontSize: "2rem",
            fontWeight: 600,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: "3rem",
            }}
          >
            Chat App
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontWeight: 500,
              fontSize: "2rem",
            }}
          >
            Select a contact to start conversation
          </Typography>
        </Box>
      ) : (
        <Paper sx={{ height: "100vh", padding: "10px", position: "relative" }}>
          <Typography variant="h4" textAlign="center">
            {currentContact}
          </Typography>
          <Paper sx={{ height: "70vh", padding: "10px" }} elevation="0">
            {data !== null &&
              data.map((msg, i) =>
                msg["actualData"]["mySelf"] === true ? (
                  <Paper
                    key={i}
                    variant="elevation"
                    sx={{
                      width: "100%",
                      minHeight: "2rem",
                      wordBreak: "break-all",
                      padding: "5px",
                      margin: ".5rem",
                      position: "relative",
                    }}
                    elevation="0"
                  >
                    <Typography
                      sx={{
                        borderRadius: "5px",
                        backgroundColor: "lightgray",
                        maxWidth: "50%",
                        wordBreak: "break-all",
                        padding: "5px",
                        margin: ".5rem",
                        position: "absolute",
                        right: "0",
                      }}
                    >
                      {msg["actualData"]["message"]}
                    </Typography>
                  </Paper>
                ) : (
                  <Paper
                    key={i}
                    variant="elevation"
                    sx={{
                      width: "100%",
                      minHeight: "2rem",
                      wordBreak: "break-all",
                      padding: "5px",
                      margin: ".5rem",
                      position: "relative",
                    }}
                    elevation="0"
                  >
                    <Typography
                      sx={{
                        backgroundColor: "lightgray",
                        maxWidth: "50%",
                        borderRadius: "5px",
                        wordBreak: "break-all",
                        padding: "5px",
                        margin: ".5rem",
                        position: "absolute",
                        left: "0",
                      }}
                    >
                      {msg["actualData"]["message"]}
                    </Typography>
                  </Paper>
                )
              )}
          </Paper>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "sticky",
              top: "90%",
              bottom: "0",
            }}
          >
            <TextField
              color="success"
              fullWidth
              sx={{
                backgroundColor: "white",
                mt: "15px",
              }}
              name="message"
              label="Click to type message"
              onChange={handleMessageChange}
            ></TextField>
            <Button
              variant="contained"
              size="large"
              sx={{ ml: "5px" }}
              onClick={send}
            >
              Send
            </Button>
          </Toolbar>
        </Paper>
      )}
    </Container>
  );
};

export default ChatContainer;
