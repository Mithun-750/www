'use client';

import dynamic from 'next/dynamic';

const ChatBot = dynamic(() => import('./ChatBot'), { ssr: false });

export default function ChatBotWrapper() {
  return <ChatBot />;
}
