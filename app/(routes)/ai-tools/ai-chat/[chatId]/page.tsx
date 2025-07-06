"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import EmptyState from "../_components/EmptyState";
import Markdown from "react-markdown";
import axios from "axios";
import { useParams } from "next/navigation";
type messages = {
  content: string;
  role: string;
  type: string;
};
function AiChat() {
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [messagesList, setMessagesList] = useState<messages[]>([]);
  const {chatId} =useParams()
  const onSend = async () => {
    setLoading(true);
    setMessagesList((prev) => [
      ...prev,
      {
        content: userInput,
        role: "user",
        type: "text",
      },
    ]);
    const result = await axios.post("/api/ai-career-chat-agent", {
      userInput: userInput,
    });
    console.log(result?.data);
    setMessagesList((prev) => [...prev, result?.data]);
    setUserInput("");
    setLoading(false);
  };
  useEffect(() => {
    messagesList?.length>0&& updateMessagesList()

  }, [messagesList]);

  const updateMessagesList=async()=>{
      const result=await axios.put("/api/history",{
        content:messagesList,
        recordId:chatId
      });
      console.log(result)
  }
  console.log("Get Messages:", messagesList);
  return (
    <div className="px-10 md:px-24 lg:px-36 xl:px-48 h-[75vh] overflow-auto ">
      <div className="flex items-center justify-between gap-8">
        <div>
          <h2 className="font-bold text-bold text-lg">AI Career Q/A Chat</h2>
          <p className="text-gray-500">
            Smarter career decisions start here-get tailored advice.
          </p>
        </div>
        <Button>+ New Chat</Button>
      </div>
      <div className="flex flex-col h-[75vh]">
        {messagesList?.length <= 0 && (
          <div className="mt-5">
            {/* Empty State Options */}
            <EmptyState
              SelectedQuetion={(question: string) => setUserInput(question)}
            />
          </div>
        )}

        <div className="flex-1">
          {/* Message list */}
          {messagesList?.map((message, index) => (
            <div key={index}>
              <div
                className={`flex mb-2 ${
                  message.role == "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg gap-2 ${
                    message.role == "user"
                      ? "bg-gray-200 text-black rounded-lg"
                      : "bg-gray-50 text-black"
                  }`}
                >
                  <Markdown>{message.content}</Markdown>
                </div>
              </div>
              {loading && messagesList?.length - 1 == index && (
                <div className="flex justify-start p-3 rounded-lg bg-gray-50 text-black mb-2">
                  <LoaderCircle className="animate-spin" /> Thinking...
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center gap-6 absolute bottom-5 w-[50%]">
          {/*  Input Field */}
          <Input
            placeholder="Type here"
            required
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
          />
          <Button onClick={onSend} disabled={loading}>
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AiChat;
