export type AssistantRole = "user" | "assistant";

export type AssistantAttachment = {
  id: string;
  name: string;
  type: "file" | "audio";
  contentType: string;
};

export type AssistantMessage = {
  id: string;
  role: AssistantRole;
  content: string;
  createdAt: string;
  attachments?: AssistantAttachment[];
};

export type AssistantConversation = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: AssistantMessage[];
};

export type AssistantConversationSummary = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};
