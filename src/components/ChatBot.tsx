import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { MessageSquare, X, Send } from "lucide-react";
import MatrixLoader from "./MatrixLoader";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Scroll to bottom when chat opens
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen]);

  // Fetch initial message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const fetchInitialMessage = async () => {
        try {
          setIsLoading(true);
          const response = await fetch("/api/chat");
          if (!response.ok) throw new Error("Failed to get initial message");
          const data = await response.json();
          setMessages([{ role: "assistant", content: data.message }]);
        } catch (error) {
          console.error("Error fetching initial message:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchInitialMessage();
    }
  }, [isOpen, messages.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: input,
          chatHistory: messages 
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");
      if (!response.body) throw new Error("No response body");

      // Create a new message with empty content
      const assistantMessage: Message = { role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMessage]);

      // Setup streaming
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Decode the chunk
        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        // Update the message with the complete text so far
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: "assistant",
            content: accumulatedText,
          };
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatbotRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-secondary-deep rounded-2xl shadow-2xl overflow-hidden border border-primary/20"
          >
            <div className="bg-secondary-deep border-b border-primary/10 p-4 text-primary font-medium flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="bg-gradient-accent p-1.5 rounded-lg">
                  <MessageSquare className="w-4 h-4 text-secondary-deep" />
                </div>
                <span className="text-sm font-medium tracking-wide">
                  Assistant
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-primary/70 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="h-96 overflow-y-auto p-4 bg-gradient-main/30 backdrop-blur-sm">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-4 flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`inline-block max-w-[80%] p-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-gradient-accent text-secondary-deep ml-auto shadow-lg"
                        : "bg-secondary text-primary border border-primary/20 shadow-lg"
                    }`}
                  >
                    <ReactMarkdown
                      className="prose prose-invert max-w-none"
                      components={{
                        a: ({ ...props }) => (
                          <a
                            {...props}
                            className="text-accent-light hover:text-primary underline transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="text-left mb-4">
                  <MatrixLoader />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-4 bg-secondary-deep border-t border-primary/20"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-secondary border border-primary/20 rounded-xl px-4 py-2.5 text-sm text-primary placeholder:text-primary/50 focus:outline-none focus:ring-2 focus:ring-accent-light/50 focus:border-accent-light/50 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-accent text-secondary-deep p-2.5 rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:hover:opacity-50 shadow-lg"
                >
                  <Send size={18} className="transform rotate-45" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-accent p-3 rounded-full text-secondary-deep shadow-lg hover:shadow-xl transition-all"
      >
        <MessageSquare size={24} />
      </motion.button>
    </div>
  );
}
