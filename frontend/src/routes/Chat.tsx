import React, { useState, useEffect, useRef } from "react";
import createSocket from "@/lib/websocket";
import { useStore } from "@/store/store";
import { DesktopIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SeparatorNav } from "@/components/ui/nav/SeparatorNav";

const ChatComponent = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const user = useStore.getState().user;
  const backend = import.meta.env.VITE_BACKEND;

  useEffect(() => {
    // Scroll to the bottom of the container
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const newSocket = createSocket();
    setSocket(newSocket);

    // Fetch initial messages from the server
    const fetchInitialMessages = async () => {
      try {
        const response = await fetch(`${backend}/messages`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });

        const data = await response.json();

        console.log(data)
        // Set the fetched messages
        setMessages(data);

        // console.log('messages',data.messages)
      } catch (error) {
        console.error("Error fetching initial messages:", error.message);
      }
    };

    fetchInitialMessages();

    newSocket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      const sender = user.email;
      socket.emit("message", { sender, content: inputMessage });
      setInputMessage("");
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

console.log( messages)
  return (
    <TooltipProvider>
      <div className="w-full h-full">
      <SeparatorNav />
        <div
          className="space-y-4 overflow-y-auto overflow-x-hidden"
          style={{ maxHeight: "600px" }}
        >
          {(!messages || messages.length === 0) ? (
            <Alert className="w-fit m-4">
              <DesktopIcon className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                No messages yet. Be the first to send a message!
              </AlertDescription>
            </Alert>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${
                  message.sender === user.email ? "items-end" : "items-start"
                }`}
              >
                {message.sender !== user.email && (
                  <span className="text-xs text-gray-500 mb-1">
                    {message.sender}
                  </span>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded ${
                    message.sender === user.email
                      ? "bg-green-500 text-white float-right"
                      : "bg-gray-300 text-black float-left"
                  }`}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p>{message.content}</p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{formatTimestamp(message.timestamp)}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <div
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center  p-4 bg-background border-primary w-full flex-wrap gap-4"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Send
          </button>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ChatComponent;
