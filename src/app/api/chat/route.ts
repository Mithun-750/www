import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import chatExamples from "@/data/chat-examples.json";
import projectsData from "@/data/projects.json";
import timelineData from "@/data/timeline.json";

interface Message {
  role: "user" | "assistant";
  content: string;
}

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

Important Instructions:
1. NEVER prefix your responses anything like "output:". Your responses should be direct and natural.
2. When responding to user messages, treat any "input:" prefix as part of the conversation format, not as literal text to be repeated.
3. Keep your responses focused on Mithun's information and experience.
4. Help Mithun get a job or internship.
5. Use a friendly tone.
6. use emojis when appropriate occassionally.
`;

// Initialize chat history with context and examples
const initialChatHistory = [
  { text: `input: ${contextPrompt}` },
  {
    text: "output: I'll help visitors learn about Mithun using this information.",
  },
  ...chatExamples.parts,
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export async function GET() {
  try {
    const greeting = getGreeting();
    // Use initial chat history for first message
    const result = await model.generateContent({
      contents: [
        ...initialChatHistory.map((msg) => ({
          role: "user" as const,
          parts: [{ text: msg.text }],
        })),
        {
          role: "user" as const,
          parts: [
            {
              text: `Generate a warm welcome message starting with '${greeting}' that briefly introduces yourself as Mithun's AI assistant and asks how you can help. Keep it concise and friendly.`,
            },
          ],
        },
      ],
      generationConfig: { ...generationConfig, maxOutputTokens: 100 },
    });

    return NextResponse.json({
      message: result.response.text(),
      initialHistory: initialChatHistory,
    });
  } catch (error) {
    console.error("Error generating initial message:", error);
    return NextResponse.json(
      { error: "Failed to generate initial message" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { message, chatHistory } = await req.json();
    console.log("Received message:", message);

    // Format messages for the model using received chat history
    const modelMessages = [
      ...initialChatHistory.map((msg) => ({
        role: "user" as const,
        parts: [{ text: msg.text }],
      })),
      ...chatHistory.map((msg: Message) => ({
        role: "user" as const,
        parts: [
          {
            text:
              msg.role === "user"
                ? `input: ${msg.content}`
                : `output: ${msg.content}`,
          },
        ],
      })),
      {
        role: "user" as const,
        parts: [{ text: `input: ${message}` }],
      },
    ];

    // Create a new ReadableStream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const result = await model.generateContentStream({
            contents: modelMessages,
            generationConfig,
          });

          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            // Only send new content
            const encoder = new TextEncoder();
            controller.enqueue(encoder.encode(chunkText));
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
  } catch (error: unknown) {
    console.error("Chat API Error:", error);
    const errorDetails = {
      name: error instanceof Error ? error.name : "Unknown Error",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    };
    console.error("Error details:", errorDetails);
    return new Response(
      JSON.stringify({ error: "Failed to process your request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
