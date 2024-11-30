import { useEffect, useRef, useState } from "react";

function App() {
  const [message, setMessage] = useState([]);
  const [inputMessage, setInputMessage] = useState(""); // Separate input message state
  const wsRef = useRef();

  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      setMessage((m) => [...m, event.data]);
    };
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        })
      );
    };

    // Cleanup WebSocket on unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black p-5 flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-20 border border-opacity-5 m-10 flex-col">
        <div className="p-2">
          {message.map((messages, index) => (
            <div key={index} className="m-2">
              <span className="text-black border rounded-md p-3 inline-block bg-white">
                {messages}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Input */}
      <div className="flex absolute bottom-10 -translate-x-1/2 left-1/2 w-[90%]">
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          id="messageInput"
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          onClick={() => {
            wsRef.current.send(
              JSON.stringify({
                type: "chat",
                payload: {
                  message: inputMessage,
                },
              })
            );
            setInputMessage(""); // Clear the input field after sending
          }}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;