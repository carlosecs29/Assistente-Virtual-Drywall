
export enum MessageAuthor {
  USER = 'user',
  ASSISTANT = 'assistant',
}

export interface ChatMessage {
  author: MessageAuthor;
  content: string;
}
