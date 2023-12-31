"use client";

import {
  fetchUserTokensById,
  generateChatResponse,
  subtractTokens,
} from "@/utils/action";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { fadeIn } from "@/variants";
import { motion } from "framer-motion";

const Chat = () => {
  const { userId } = useAuth();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { mutate, isPending } = useMutation({
    mutationFn: async (query) => {
      const currentTokens = await fetchUserTokensById(userId);

      if (currentTokens < 100) {
        toast.error("Token balance too low....");
        return;
      }

      const response = await generateChatResponse([...messages, query]);

      if (!response) {
        toast.error("Something went wrong...");
        return;
      }
      setMessages((prev) => [...prev, response.message]);
      const newTokens = await subtractTokens(userId, response.tokens);
      toast.success(`${newTokens} tokens remaining...`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { role: "user", content: text };
    mutate(query);
    setMessages((prev) => [...prev, query]);
    setText("");
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        {messages.map(({ role, content }, index) => {
          const avatar = role == "user" ? "👤" : "🤖";
          const bcg = role === "user" ? "bg-base-200" : "bg-base-100";

          return (
            <div
              key={index}
              className={`${bcg} flex py-6 -mx-8 px-8 text-xl leading-loose border-b border-base-300`}
            >
              <span className="mr-4">{avatar}</span>
              <p className="max-w-3xl">{content}</p>
            </div>
          );
        })}
        {isPending ? <span className="loading"></span> : null}
      </div>

      <motion.form
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        animate="show"
        exit="hidden"
        onSubmit={handleSubmit}
        className="max-w-4xl pt-12"
      >
        <div className="join w-full">
          <input
            type="text"
            placeholder="Message MaToursGPT"
            className="placeholder:text-sm pl-2 md:input input-bordered join-item w-full md:placeholder:text-lg  "
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className=" sm:text-sm btn btn-primary join-item text-md  "
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Please Wait..." : "Ask Question"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default Chat;
