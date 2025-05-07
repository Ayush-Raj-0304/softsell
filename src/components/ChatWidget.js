"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiSend, FiChevronDown } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Example questions for quick access
const exampleQuestions = [
  "How do I sell my software license?",
  "What types of software licenses can I sell?",
  "How does the license verification process work?",
  "What are the fees for selling a license?",
  "How do I transfer a license to a buyer?",
  "Is it legal to resell my software license?",
  "How long does the selling process take?",
  "What payment methods do you accept?",
  "How do you protect buyers and sellers?",
  "Can I sell multiple licenses at once?",
];

// Fallback response in case of API errors
const FALLBACK_RESPONSE = "I apologize, but I'm having trouble connecting to our system right now. Please try again in a moment, or contact our support team for immediate assistance.";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "bot",
      text: "Hello! How can I help you today?",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showExamples, setShowExamples] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const SOFTWARE_CONTEXT = "You are a helpful assistant for SoftSell, a software license resale platform. Respond to user questions about selling, transferring, or valuing software licenses.";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const addMessage = (text, sender) => {
    const newMessage = {
      id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`, // unique
      text,
      sender,
      time: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };


  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setShowExamples(false);
    setIsLoading(true);

    // ✅ Immediately show the user message
    addMessage(userMessage, "user");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, { sender: "user", text: `${SOFTWARE_CONTEXT} ${userMessage}` }],
        })
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      addMessage(data.response, "bot");
    } catch (error) {
      console.error("Error:", error);
      addMessage(FALLBACK_RESPONSE, "bot");
    } finally {
      setIsLoading(false);
    }
  };


  const handleQuestionClick = async (question) => {
    setInput(""); // clear it so the input UI stays clean
    setShowExamples(false);
    setIsLoading(true);

    // ✅ Immediately show the user question
    addMessage(question, "user");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, { sender: "user", text: `${SOFTWARE_CONTEXT} ${question}` }],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      addMessage(data.response, "bot");
    } catch (error) {
      console.error("Error:", error);
      addMessage(FALLBACK_RESPONSE, "bot");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[60]"
      >
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-14 h-14 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg flex items-center justify-center backdrop-blur-sm"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 max-h-[calc(100vh-140px)] glass backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col overflow-hidden z-[60] border border-white/20 dark:border-white/10"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-2">
                <FiMessageSquare size={20} />
                <h3 className="font-extralight tracking-tight leading-tight text-lg">SoftSell Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-3xl hover:bg-blue-500 transition-colors"
                aria-label="Close chat"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      y: -2
                    }}
                    className={`max-w-[80%] rounded-3xl p-3 ${message.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0 text-sm font-extralight tracking-tight leading-tight">{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc pl-4 mb-2 text-sm font-extralight tracking-tight leading-tight">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal pl-4 mb-2 text-sm font-extralight tracking-tight leading-tight">{children}</ol>
                        ),
                        li: ({ children }) => (
                          <li className="mb-1 text-sm font-extralight tracking-tight leading-tight">{children}</li>
                        ),
                        code: ({ children }) => (
                          <code className="bg-gray-700 rounded-3xl px-1 py-0.5 text-sm font-mono font-extralight tracking-tight leading-tight">{children}</code>
                        ),
                        pre: ({ children }) => (
                          <pre className="bg-gray-700 rounded-3xl p-2 overflow-x-auto mb-2 text-sm font-mono font-extralight tracking-tight leading-tight">{children}</pre>
                        ),
                        a: ({ href, children }) => (
                          <a href={href} className="text-blue-400 hover:text-blue-300 underline font-extralight tracking-tight leading-tight" target="_blank" rel="noopener noreferrer">
                            {children}
                          </a>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-light tracking-tight leading-tight">{children}</strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic font-extralight tracking-tight leading-tight">{children}</em>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-gray-600 pl-4 italic my-2 font-extralight tracking-tight leading-tight">{children}</blockquote>
                        ),
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                    <div
                      className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"
                        }`}
                    >
                      {message.time.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      y: -2
                    }}
                    className="bg-gray-100 rounded-3xl p-3"
                  >
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {showExamples && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <div className="mb-2 flex items-center text-sm text-gray-400 font-extralight tracking-tight leading-tight">
                    <FiChevronDown className="mr-1" />
                    <span>Try asking:</span>
                  </div>
                  <div className="space-y-2">
                    {exampleQuestions.map((question, index) => (
                      <motion.button
                        key={index}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                          y: -2,
                        }}
                        onClick={() => handleQuestionClick(question)}
                        className="w-full text-left p-3 bg-white text-gray-900 hover:bg-gray-100 text-sm rounded-3xl transition-colors border border-gray-300 shadow-sm font-extralight tracking-tight leading-tight"
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-gray-800/95 backdrop-blur-md border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70 backdrop-blur-sm text-gray-900"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading}
                  className="p-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-3xl disabled:opacity-50"
                  aria-label="Send message"
                >
                  <FiSend size={18} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget; 