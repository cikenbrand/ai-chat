"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendMessageToApi } from "@/app/actions/chat";

// Zod schema untuk validate form
const chatSchema = z.object({
  message: z
    .string()
    .min(1, "Mesej tidak boleh kosong")
    .max(500, "Mesej terlalu panjang"),
});

const ChatBox = () => {
  type ChatMessage = { role: "user" | "assistant"; content: string };

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const form = useForm({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: "",
    },
  });

  const sendMessage = async (values: { message: string }) => {
    const { message } = values;

    // Add user message to chat history
    const updatedHistory = [
      ...chatHistory,
      { role: "user" as "user", content: message }, // Betulkan type di sini
    ];

    setChatHistory(updatedHistory);

    try {
      const reply = await sendMessageToApi(updatedHistory); // Pass full history
      if (reply) {
        setChatHistory((prev) => [
          ...prev,
          { role: "assistant" as "assistant", content: reply }, // Betulkan type di sini juga
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      form.reset(); // Reset input
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="border border-gray-300 rounded p-4 mb-4 h-[400px] overflow-y-auto bg-white">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`mb-2 ${
              chat.role === "user"
                ? "text-right text-blue-600"
                : "text-left text-gray-700"
            }`}
          >
            <p>{chat.content}</p>
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(sendMessage)} className="flex gap-2">
          <FormField
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Tanya sesuatu..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Hantar</Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatBox;
