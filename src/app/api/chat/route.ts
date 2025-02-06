import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import chatExamples from "@/data/chat-examples.json";
import projectsData from "@/data/projects.json";
import timelineData from "@/data/timeline.json";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

// Create a detailed context from projects and timeline
const projectsContext = projectsData.projects
  .map((p) => `${p.title}: ${p.description}`)
  .join("\n");

const timelineContext = timelineData.logs
  .map(
    (log) =>
      `${log.title} at ${log.organization} (${log.period})${
        log.status ? ` - ${log.status}` : ""
      }`
  )
  .join("\n");

const contextPrompt = `You are Mithun's virtual AI assistant. Help visitors learn about Mithun by following these examples and using the following information about his projects and experience:

Projects:
${projectsContext}

Experience and Education:
${timelineContext}
`;

// Initialize chat history with context and examples
let chatHistory = [
  { text: `input: ${contextPrompt}` },
  {
    text: "output: I'll help visitors learn about Mithun using this information.",
  },
  ...chatExamples.parts,
];

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    console.log("Received message:", message);

    // Format messages for the model
    const modelMessages = [
      ...chatHistory.map(msg => ({
        role: "user" as const,
        parts: [{ text: msg.text }]
      })),
      {
        role: "user" as const,
        parts: [{ text: message }]
      }
    ];

    // Create a new ReadableStream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const result = await model.generateContentStream({
            contents: modelMessages,
            generationConfig,
          });

          let responseText = "";

          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            // Only send new content
            const encoder = new TextEncoder();
            controller.enqueue(encoder.encode(chunkText));
            responseText += chunkText;
          }

          // Update chat history
          chatHistory = [
            ...chatHistory,
            { text: message },
            { text: responseText }
          ];

          // Manage history size
          if (chatHistory.length > 100) {
            chatHistory = [...chatHistory.slice(0, 50), ...chatHistory.slice(-50)];
          }

          controller.close();
        } catch (error) {
          console.error("Streaming Error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    return new Response(JSON.stringify({ error: "Failed to process your request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
