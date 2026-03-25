"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "react-oidc-context";
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useLocale } from "@/lib/i18n";

type ApiConversation = {
  conv_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  message_count?: number;
  last_message_at?: string | null;
};

type ApiMessage = {
  message_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  created_at: string;
  updated_at: string;
  query_id?: string | null;
};

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
  attachments?: { id: string; name: string; type: "file" }[];
};

type ConversationGroup = {
  label: string;
  items: ApiConversation[];
};

type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event) => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

type SpeechRecognitionResult = {
  isFinal: boolean;
  0: { transcript: string };
};

type SpeechRecognitionResultList = {
  length: number;
  [index: number]: SpeechRecognitionResult;
};

type SpeechRecognitionEvent = Event & {
  resultIndex: number;
  results: SpeechRecognitionResultList;
};

const EMPTY_MESSAGES: Message[] = [];
function groupConversations(
  conversations: ApiConversation[],
  labels: { today: string; previous: string; earlier: string }
): ConversationGroup[] {
  const now = new Date();

  const groups: Record<string, ApiConversation[]> = {
    [labels.today]: [],
    [labels.previous]: [],
    [labels.earlier]: [],
  };

  conversations.forEach((conversation) => {
    const created = new Date(conversation.created_at);
    const diffDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      groups[labels.today].push(conversation);
    } else if (diffDays <= 7) {
      groups[labels.previous].push(conversation);
    } else {
      groups[labels.earlier].push(conversation);
    }
  });

  return Object.entries(groups)
    .filter(([, items]) => items.length > 0)
    .map(([label, items]) => ({ label, items }));
}

function buildAttachmentPreview(file?: File | null) {
  if (!file) {
    return undefined;
  }

  return [
    {
      id: crypto.randomUUID(),
      name: file.name,
      type: "file" as const,
    },
  ];
}

function getAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem("access_token");
}

async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getAccessToken();
  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(path, {
    ...options,
    headers,
  });
}

export default function AssistantPage() {
  const router = useRouter();
  const auth = useAuth();
  const [conversations, setConversations] = useState<ApiConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(EMPTY_MESSAGES);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [conversationType, setConversationType] = useState<"chat" | "medical_treatment">("chat");
  const [moreOpen, setMoreOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();
  const skipNextRefreshRef = useRef(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const inputSnapshotRef = useRef("");
  const speechFinalRef = useRef("");

  const groupedConversations = useMemo(
    () =>
      groupConversations(conversations, {
        today: t.assistant.history.today,
        previous: t.assistant.history.previous7Days,
        earlier: t.assistant.history.earlier,
      }),
    [conversations, t.assistant.history]
  );

  const refreshConversations = useCallback(async () => {
    const params = new URLSearchParams({ limit: "40" });
    if (conversationType === "medical_treatment") {
      params.set("conversation_type", "medical_treatment");
    }
    const response = await apiFetch(`/api/assistant/conversations?${params.toString()}`);
    if (!response.ok) {
      return;
    }
    const data = (await response.json()) as { items: ApiConversation[] };
    setConversations(data.items);
    if (!activeConversationId && data.items.length > 0) {
      setActiveConversationId(data.items[0].conv_id);
    }
  }, [activeConversationId, conversationType]);

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      router.replace("/login");
    }
  }, [auth.isAuthenticated, auth.isLoading, router]);

  useEffect(() => {
    if (auth.isLoading || !auth.isAuthenticated) {
      return;
    }
    if (skipNextRefreshRef.current) {
      skipNextRefreshRef.current = false;
      return;
    }
    refreshConversations();
  }, [auth.isAuthenticated, auth.isLoading, refreshConversations]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeConversationId) {
        setMessages(EMPTY_MESSAGES);
        return;
      }

      const response = await apiFetch(`/api/assistant/conversations/${activeConversationId}`);
      if (!response.ok) {
        setMessages(EMPTY_MESSAGES);
        return;
      }

      const data = (await response.json()) as { messages?: ApiMessage[] };
      const items = data.messages ?? [];
      setMessages(
        items.map((item) => ({
          id: item.message_id,
          role: item.role,
          content: item.content,
          createdAt: item.created_at,
        }))
      );
    };

    fetchMessages();
  }, [activeConversationId]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleNewConversation = async (mode?: "medical_treatment") => {
    const params = new URLSearchParams({ limit: "40" });
    if (mode) {
      params.set("conversation_type", mode);
    }
    const response = await apiFetch(`/api/assistant/conversations?${params.toString()}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: t.assistant.newConversationTitle }),
    });
    if (!response.ok) {
      return;
    }
    const data = (await response.json()) as ApiConversation;
    setConversations((prev) => [data, ...prev]);
    setActiveConversationId(data.conv_id);
    setMessages(EMPTY_MESSAGES);
  };

  const switchConversationType = (type: "chat" | "medical_treatment", createNew = false) => {
    setConversationType(type);
    setActiveConversationId(null);
    setMessages(EMPTY_MESSAGES);
    if (createNew) {
      skipNextRefreshRef.current = true;
      void handleNewConversation(type === "medical_treatment" ? "medical_treatment" : undefined);
      return;
    }
  };

  const uploadDocument = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", file.name);
    const response = await apiFetch("/api/assistant/documents", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as { doc_id: string };
    return data.doc_id;
  };

  const handleSend = async () => {
    const question = input.trim();
    if (!question && !selectedFile) {
      return;
    }

    setIsSending(true);

    let conversationId = activeConversationId;
    if (!conversationId) {
      const createResponse = await apiFetch("/api/assistant/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: question.slice(0, 44) || t.assistant.newConversationTitle }),
      });
      if (createResponse.ok) {
        const created = (await createResponse.json()) as ApiConversation;
        conversationId = created.conv_id;
        setConversations((prev) => [created, ...prev]);
        setActiveConversationId(created.conv_id);
      }
    }

    const attachmentsPreview = buildAttachmentPreview(selectedFile);
    const optimisticUserMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: question || t.assistant.sharedAttachments,
      createdAt: new Date().toISOString(),
      attachments: attachmentsPreview,
    };

    const optimisticAssistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticUserMessage, optimisticAssistantMessage]);

    let documentIds: string[] | null = null;
    if (selectedFile) {
      const docId = await uploadDocument(selectedFile);
      if (docId) {
        documentIds = [docId];
      }
    }

    setInput("");
    setSelectedFile(null);

    const payload = {
      question: question || t.assistant.sharedAttachments,
      conversation_id: conversationId,
      document_ids: documentIds,
    };

    const response = await apiFetch("/api/assistant/queries/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok || !response.body) {
      setIsSending(false);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    const appendChunk = (chunk: string) => {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === optimisticAssistantMessage.id
            ? { ...message, content: `${message.content}${chunk}` }
            : message
        )
      );
    };

    let done = false;
    while (!done) {
      // eslint-disable-next-line no-await-in-loop
      const { value, done: streamDone } = await reader.read();
      done = streamDone;
      buffer += decoder.decode(value || new Uint8Array(), { stream: !streamDone });

      let lineBreakIndex = buffer.indexOf("\n");
      while (lineBreakIndex >= 0) {
        const rawLine = buffer.slice(0, lineBreakIndex).trimEnd();
        buffer = buffer.slice(lineBreakIndex + 1);

        if (rawLine.startsWith("data:")) {
          const data = rawLine.replace(/^data:/, "").trim();
          if (data === "[DONE]") {
            done = true;
            break;
          }
          appendChunk(data);
        }

        lineBreakIndex = buffer.indexOf("\n");
      }
    }

    setIsSending(false);
    refreshConversations();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const startListening = () => {
    if (isListening) {
      return;
    }

    const SpeechRecognition =
      (window as Window & { SpeechRecognition?: SpeechRecognitionConstructor }).SpeechRecognition ||
      (window as Window & { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    inputSnapshotRef.current = input;
    speechFinalRef.current = "";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const transcript = result[0]?.transcript ?? "";
        if (result.isFinal) {
          speechFinalRef.current += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const base = inputSnapshotRef.current.trim();
      const combined = `${base}${base ? " " : ""}${speechFinalRef.current}${interimTranscript}`.trim();
      setInput(combined);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
      inputSnapshotRef.current = "";
      speechFinalRef.current = "";
    };

    recognition.onerror = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (!isListening || !recognitionRef.current) {
      return;
    }
    recognitionRef.current.stop();
  };

  const handleLogout = async () => {
    await auth.removeUser();
    const cognitoDomain =
      process.env.NEXT_PUBLIC_COGNITO_DOMAIN ||
      "https://ap-northeast-1exxgd47ar.auth.ap-northeast-1.amazoncognito.com";
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "3al3l0i924diqhrus97bijos2o";
    const logoutUri = encodeURIComponent(window.location.origin);
    const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`;
    window.location.href = logoutUrl;
  };

  if (auth.isLoading) {
    return <div className="assistant-loading">{t.auth.login.loading}</div>;
  }

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <div className="assistant-app">
      <div className="assistant-mobile-bar">
        <button
          type="button"
          className="assistant-menu-toggle"
          aria-label={t.assistant.actions.openSidebar}
          onClick={() => setIsSidebarOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <Link href="/" className="assistant-mobile-brand" aria-label={t.assistant.actions.goHome}>
          <Image src="/logo.svg" alt="PetMed logo" width={28} height={28} />
          <span>PetMed</span>
        </Link>
      </div>

      {isSidebarOpen && (
        <button
          type="button"
          className="assistant-backdrop"
          aria-label={t.assistant.actions.closeSidebar}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`assistant-sidebar${isSidebarOpen ? " is-open" : ""}`}>
        <div className="assistant-brand-row">
          <Link href="/" className="assistant-brand" aria-label={t.assistant.actions.goHome}>
            <Image src="/logo.svg" alt="PetMed logo" width={38} height={38} />
            <span>PetMed</span>
          </Link>

          <button
            type="button"
            className="assistant-sidebar-close"
            aria-label={t.assistant.actions.closeSidebar}
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="assistant-nav">
          <button
            type="button"
            className={`assistant-pill${conversationType === "chat" ? " active" : ""}`}
            onClick={() => switchConversationType("chat")}
          >
            <Image src="/chat-1.svg" alt="" width={16} height={16} aria-hidden="true" />
            <span>{t.assistant.nav.chatAssistant}</span>
          </button>
          <button
            type="button"
            className={`assistant-pill${conversationType === "medical_treatment" ? " active" : ""}`}
            onClick={() => switchConversationType("medical_treatment", true)}
          >
            <Image src="/chat-2.svg" alt="" width={16} height={16} aria-hidden="true" />
            <span>{t.assistant.nav.medicalReferences}</span>
          </button>
        </nav>

        <button
          type="button"
          className="assistant-new"
          onClick={() =>
            handleNewConversation(conversationType === "medical_treatment" ? "medical_treatment" : undefined)
          }
        >
          {t.assistant.actions.newConsultation}
        </button>

        <div className="assistant-history">
          {groupedConversations.map((group) => (
            <div key={group.label} className="assistant-history-group">
              <p>{group.label}</p>
              <ul>
                {group.items.map((conversation) => (
                  <li key={conversation.conv_id}>
                    <button
                      type="button"
                      className={conversation.conv_id === activeConversationId ? "active" : undefined}
                      onClick={() => setActiveConversationId(conversation.conv_id)}
                    >
                      <span className="assistant-item-icon" aria-hidden="true" />
                      <span>{conversation.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="assistant-plan">
          <div>
            <p className="assistant-plan-title">{t.assistant.plan.title}</p>
            <p className="assistant-plan-copy">{t.assistant.plan.copy}</p>
          </div>
          <button type="button" className="assistant-upgrade">
            {t.assistant.plan.upgrade}
          </button>
        </div>

        <div className="assistant-profile">
          <div className="assistant-avatar">SJ</div>
          <div>
            <p>Dr. Sarah Miller</p>
            <span>VMD, Chief Medical</span>
          </div>
          <button type="button" className="assistant-gear" aria-label={t.assistant.actions.settings}>
            ⚙
          </button>
        </div>
      </aside>

      <main className="assistant-main">
        <header className="assistant-top">
          <div className="assistant-title">
            <div className="assistant-title-icon">
              <Image src="/AI.svg" alt="" width={20} height={20} aria-hidden="true" />
            </div>
            <div>
              <p>{t.assistant.header.title}</p>
              <span className="assistant-status-inline">
                <span className="assistant-status-dot" aria-hidden="true" />
                {isSending ? t.assistant.header.composing : t.assistant.header.activeNow}
              </span>
            </div>
          </div>

          <div className="assistant-top-actions">
            <div className="lang-switch" role="group" aria-label={t.assistant.actions.languageToggle}>
              <button
                type="button"
                className={locale === "en" ? "active" : ""}
                aria-pressed={locale === "en"}
                onClick={() => setLocale("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={locale === "ja" ? "active" : ""}
                aria-pressed={locale === "ja"}
                onClick={() => setLocale("ja")}
              >
                JA
              </button>
            </div>
            <div className="assistant-more">
              <button
                type="button"
                aria-label={t.assistant.actions.more}
                onClick={() => setMoreOpen((prev) => !prev)}
              >
                ⋮
              </button>
              {moreOpen ? (
                <div className="assistant-more-menu" role="menu">
                  <button type="button" onClick={handleLogout} role="menuitem">
                    {t.auth.login.signOut}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <section className="assistant-chat">
          {messages.length === 0 ? (
            <div className="assistant-empty">
              <h2>{t.assistant.empty.title}</h2>
              <p>{t.assistant.empty.copy}</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`assistant-bubble ${message.role === "assistant" ? "assistant" : "user"}`}
              >
                <p>{message.content}</p>
                {message.attachments?.length ? (
                  <div className="assistant-attachments">
                    {message.attachments.map((attachment) => (
                      <span key={attachment.id}>
                        {t.assistant.actions.fileLabel} {attachment.name}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))
          )}

          <form
            className="assistant-input"
            onSubmit={(event) => {
              event.preventDefault();
              handleSend();
            }}
          >
            <div className="assistant-input-box">
              <div className="assistant-input-actions">
                <label className="assistant-attach" htmlFor="assistant-file">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M7 12.5 14.2 5.3a4 4 0 1 1 5.7 5.7l-8.1 8.1a5.5 5.5 0 0 1-7.8-7.8l8.5-8.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="sr-only">{t.assistant.actions.uploadFile}</span>
                </label>
                <input id="assistant-file" type="file" onChange={handleFileChange} hidden />
                {isListening ? (
                  <button
                    type="button"
                    className="assistant-audio"
                    onClick={stopListening}
                    aria-label={t.assistant.actions.stopDictation}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M12 4a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V7a3 3 0 0 1 3-3Zm5 8a5 5 0 0 1-10 0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 17v3m-4 0h8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="assistant-audio"
                    onClick={startListening}
                    aria-label={t.assistant.actions.startDictation}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M12 4a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V7a3 3 0 0 1 3-3Zm5 8a5 5 0 0 1-10 0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 17v3m-4 0h8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <input
                type="text"
                placeholder={t.assistant.input.placeholder}
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />

              <button
                type="submit"
                className="assistant-send"
                aria-label={t.assistant.actions.send}
                disabled={isSending}
              >
                ➤
              </button>
            </div>

            {selectedFile && (
              <div className="assistant-uploads">
                <div className="assistant-upload-chip">
                  <span>
                    {t.assistant.actions.fileLabel} {selectedFile.name}
                  </span>
                  <button type="button" onClick={() => setSelectedFile(null)}>
                    {t.assistant.actions.remove}
                  </button>
                </div>
              </div>
            )}

            <p className="assistant-disclaimer">{t.assistant.disclaimer}</p>
          </form>
        </section>
      </main>
    </div>
  );
}
