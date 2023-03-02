import messageModal from "../models/message.js";

export const sendMessage = async (req, res) => {
  const { from, to, message } = req.body;
  console.log(from, to, message);

  try {
    const newMessage = await messageModal.create({
      chatUsers: [from, to],
      message: message,
      Sender: from,
    });
    return res.status(200).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMessage = async (req, res) => {
  const from = req.params.user1Id.substring(1);
  const to = req.params.user2Id.substring(1);
  console.log(from, to);
  try {
    const newMessage = await messageModal
      .find({
        chatUsers: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
   
    const allMessage = newMessage.map((msg) => {
      return {
        mySelf: msg.Sender.toString() === from,
        message: msg.message,
      };
    });

    return res.status(200).json(allMessage);
  } catch (err) {
    res.status(500).json("Something not good happened");
  }
};
