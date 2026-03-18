import type {
  AssistantAttachment,
  AssistantConversation,
  AssistantConversationSummary,
  AssistantMessage,
} from "@/types/assistant";

const STORE_KEY = "__petmed_assistant_store__";

type AssistantStore = {
  conversations: AssistantConversation[];
};

type GlobalWithStore = typeof globalThis & {
  [STORE_KEY]?: AssistantStore;
};

const globalWithStore = globalThis as GlobalWithStore;

function getStore(): AssistantStore {
  if (!globalWithStore[STORE_KEY]) {
    globalWithStore[STORE_KEY] = {
      conversations: [],
    };
  }

  return globalWithStore[STORE_KEY] as AssistantStore;
}

function createId() {
  return crypto.randomUUID();
}

function nowIso() {
  return new Date().toISOString();
}

export function listConversations(): AssistantConversationSummary[] {
  return getStore()
    .conversations
    .slice()
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map(({ id, title, createdAt, updatedAt }) => ({ id, title, createdAt, updatedAt }));
}

export function createConversation(title = "New Consultation"): AssistantConversation {
  const store = getStore();
  const timestamp = nowIso();
  const conversation: AssistantConversation = {
    id: createId(),
    title,
    createdAt: timestamp,
    updatedAt: timestamp,
    messages: [],
  };

  store.conversations.unshift(conversation);
  return conversation;
}

export function getConversation(id: string): AssistantConversation | undefined {
  return getStore().conversations.find((item) => item.id === id);
}

export function updateConversationTitle(conversation: AssistantConversation, title: string) {
  conversation.title = title;
  conversation.updatedAt = nowIso();
}

export function addMessage(
  conversation: AssistantConversation,
  role: "user" | "assistant",
  content: string,
  attachments?: AssistantAttachment[]
): AssistantMessage {
  const timestamp = nowIso();
  const message: AssistantMessage = {
    id: createId(),
    role,
    content,
    createdAt: timestamp,
    attachments,
  };

  conversation.messages.push(message);
  conversation.updatedAt = timestamp;
  return message;
}

export function updateMessage(conversation: AssistantConversation, messageId: string, content: string) {
  const message = conversation.messages.find((item) => item.id === messageId);
  if (message) {
    message.content = content;
    conversation.updatedAt = nowIso();
  }
}

export function buildAssistantReply(prompt: string, attachments?: AssistantAttachment[]): string {
  const attachmentNote = attachments?.length
    ? `I also received ${attachments.length} attachment${attachments.length > 1 ? "s" : ""}. `
    : "";

  return (
    `${attachmentNote}Based on the details provided, here is a structured summary: ` +
    "Consider key differentials, validate the history, and prioritize diagnostics. " +
    "If needed, I can generate a checklist or protocol-based next steps."
  );
}
