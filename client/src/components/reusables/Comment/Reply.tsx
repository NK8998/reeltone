import { User } from "@clerk/nextjs/server";

interface ReplyProps {
  filmdId: number;
  commentId: number;
  user: User;
}

export default function Reply({ filmdId, commentId, user }: ReplyProps) {}
