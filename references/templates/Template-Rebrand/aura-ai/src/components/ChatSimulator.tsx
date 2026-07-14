import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, CheckCircle2, Sparkles } from "lucide-react";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
}

const PRESET_RESPONSES: Record<string, string> = {
  "How does self-training work?":
    "Aura connects directly to your Zendesk, Notion, or Git Docs. We crawl and index your files, building a secure vector graph. Every time you update your docs, Aura learns the new changes automatically within seconds!",
  "What integrations do you have?":
    "We support native integrations with Slack, Discord, Zendesk, Intercom, Salesforce, HubSpot, and direct API webhooks. You can connect them with a single click in our dashboard.",
  "Can I customize the branding?":
    "Yes, absolutely! You can customize fonts, colors, custom avatars, widget positions, and the tone of voice of the AI assistant to perfectly match your brand design system.",
};

const SUGGESTIONS = [
  "How does self-training work?",
  "What integrations do you have?",
  "Can I customize the branding?",
];

export default function ChatSimulator() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "ai",
      text: "Hi! I'm Aura. I can automate your B2B customer support at scale. Ask me anything!",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeSuggestions, setActiveSuggestions] = useState<string[]>(SUGGESTIONS);
  const [inputVal, setInputVal] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollChat = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollChat();
  }, [messages, isTyping]);

  const handleSendResponse = (question: string) => {
    // Add user message
    const userMsgId = Math.random().toString();
    setMessages((prev) => [...prev, { id: userMsgId, sender: "user", text: question }]);
    setActiveSuggestions([]);
    setIsTyping(true);

    // Get response
    const answer = PRESET_RESPONSES[question] || PRESET_RESPONSES["How does self-training work?"];

    setTimeout(() => {
      setIsTyping(false);
      const aiMsgId = Math.random().toString();
      setMessages((prev) => [...prev, { id: aiMsgId, sender: "ai", text: answer }]);
      // Filter suggestions to not include what was just asked
      setActiveSuggestions(SUGGESTIONS.filter((s) => s !== question));
    }, 1500);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const query = inputVal.trim();
    setInputVal("");
    
    // Add user message
    const userMsgId = Math.random().toString();
    setMessages((prev) => [...prev, { id: userMsgId, sender: "user", text: query }]);
    setActiveSuggestions([]);
    setIsTyping(true);

    // Fallback response for custom queries
    setTimeout(() => {
      setIsTyping(false);
      const aiMsgId = Math.random().toString();
      setMessages((prev) => [
        ...prev,
        {
          id: aiMsgId,
          sender: "ai",
          text: `That's a great question! Aura AI is designed to integrate seamlessly with your existing helpdesk workflows and answer customer queries using your own knowledge base. Feel free to contact our sales team to see a custom demo with your own data!`,
        },
      ]);
      setActiveSuggestions(SUGGESTIONS);
    }, 1500);
  };

  return (
    <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      {/* ── LEFT SIDE: TEXT DESCRIPTION ── */}
      <div className="lg:col-span-5 flex flex-col text-left">
        <span className="text-[11px] font-mono tracking-[0.25em] text-[#BECB6D] uppercase mb-4">
          02 — Interactive Widget
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold font-serif text-white tracking-tight leading-tight mb-6">
          Conversations that feel like intuition.
        </h2>
        <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 font-light">
          Deploy a self-learning widget that trains itself from your docs, API guides, and ticketing history. Zero prompt tuning required.
        </p>

        {/* Feature Checkpoints */}
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#BECB6D] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white text-sm font-semibold">Self-learning loop</h4>
              <p className="text-white/50 text-xs mt-0.5">Automatically crawls Zendesk, Notion, and Git Docs.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#BECB6D] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white text-sm font-semibold">Fully customizable</h4>
              <p className="text-white/50 text-xs mt-0.5">Match your brand fonts, colors, shapes, and avatars.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#BECB6D] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white text-sm font-semibold">Developer first API</h4>
              <p className="text-white/50 text-xs mt-0.5">Trigger actions, log analytics, and manage sessions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT SIDE: CHAT INTERACTION SIMULATOR ── */}
      <div className="lg:col-span-7 flex flex-col w-full">
        {/* Browser Mock Wrapper */}
        <div className="flex flex-col h-[500px] w-full rounded-2xl border border-white/10 bg-black/45 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              {/* Window dots */}
              <div className="flex gap-1.5 mr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="h-4 w-[1px] bg-white/10" />
              {/* Bot Info */}
              <div className="flex items-center gap-2">
                <img
                  src="/aura-avatar.png"
                  alt="Aura Bot"
                  className="w-6 h-6 rounded-full border border-white/10"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-white/90">Aura Assistant</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BECB6D] animate-pulse" />
                    <span className="text-[9px] font-mono text-white/40">Active Engine</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[9px] font-mono bg-[#BECB6D]/10 border border-[#BECB6D]/20 text-[#BECB6D] px-2 py-0.5 rounded">
              <Sparkles className="w-3 h-3" />
              B2B DEMO
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-4 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[80%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Avatar */}
                <div className="shrink-0">
                  {msg.sender === "ai" ? (
                    <img
                      src="/aura-avatar.png"
                      alt="AI"
                      className="w-7 h-7 rounded-full border border-white/10 bg-white/[0.04] p-0.5"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-white/60" />
                    </div>
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed text-left ${
                    msg.sender === "user"
                      ? "bg-[#BECB6D] text-[#08090c] rounded-tr-none font-medium"
                      : "bg-white/[0.04] border border-white/[0.06] text-white/90 rounded-tl-none font-light"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 mr-auto max-w-[80%]">
                <img
                  src="/aura-avatar.png"
                  alt="AI"
                  className="w-7 h-7 rounded-full border border-white/10 bg-white/[0.04] p-0.5"
                />
                <div className="px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] rounded-tl-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Suggestions and Input Box */}
          <div className="p-6 border-t border-white/10 bg-white/[0.01] flex flex-col gap-4">
            {/* Presets suggestions */}
            <AnimatePresence>
              {activeSuggestions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {activeSuggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSendResponse(s)}
                      className="text-[10px] sm:text-xs font-light text-white/70 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/15 px-3 py-1.5 rounded-full transition-all duration-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Input Box */}
            <form onSubmit={handleCustomSubmit} className="relative w-full flex items-center">
              <input
                type="text"
                placeholder="Ask Aura a question..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 focus:border-white/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none transition-all pr-12 font-light"
              />
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="absolute right-3 p-1.5 rounded-lg bg-[#BECB6D]/10 text-[#BECB6D] hover:bg-[#BECB6D] hover:text-[#08090c] disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#BECB6D] transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
