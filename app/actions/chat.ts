// actions/chat.ts
export const sendMessageToApi = async (chatHistory: { role: "user" | "assistant"; content: string }[]) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: chatHistory }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
  
      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error("Error in sendMessageToApi:", error);
      throw error;
    }
  };
  