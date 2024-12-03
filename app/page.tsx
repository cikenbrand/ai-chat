import Image from "next/image";
import ChatBox from "@/components/ChatBox";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Chat AI</h1>
      <ChatBox />
    </main>
  );
}
