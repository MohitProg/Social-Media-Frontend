import { Base_Url } from "../../constant";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const socketContext = createContext();
export const useSocketConext = () => useContext(socketContext);

const socketval = io(Base_Url, {
  query: {
    userId: localStorage.getItem("userid"),
  },
});

export const SocketConextProvider = ({ children }) => {
  // state for socket data
  const [socket, setsocket] = useState(socketval);
  const userid = localStorage.getItem("userid");
  const [onlineuser, setOnlineuser] = useState([]);

  useEffect(() => {
    socket.on("welcomemessage", (data) => {
      console.log(data);
      toast.success(data);

      // socket.emit("registerUser", { userid, socketId: socket.id });
    });

    socket.on("onlineuserid", (data) => {
      console.log(data);
      setOnlineuser(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [userid, socketval]);

  return (
    <socketContext.Provider value={{ socket, onlineuser }}>
      {children}
    </socketContext.Provider>
  );
};
