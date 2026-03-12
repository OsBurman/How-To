// Message interface — defines the shape of a message board post
export interface Message {
  id: number;
  author: string;
  text: string;
  likes: number;
  liked: boolean;
  postedAt: string;
}
