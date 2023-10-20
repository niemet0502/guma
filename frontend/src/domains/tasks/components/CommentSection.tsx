import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/domains/auth/providers/auth";
import { useRef } from "react";
import { TaskApi } from "../type";
import { CommentItem } from "./CommentItem";

export const CommentSection: React.FC<{ task: TaskApi }> = ({ task }) => {
  const { user } = useAuth();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = () => {
    console.log(textAreaRef.current?.value);
  };
  return (
    <div className="w-full px-3 pt-4 flex flex-col gap-3 mb-12">
      <h5>Comments</h5>

      {task?.comments.map((comment) => (
        <CommentItem comment={comment} key={comment.id} />
      ))}

      <div className="w-full flex gap-4">
        <Avatar className="h-6 w-6 bg-transparent border-2 items-center justify-center mt-0.5">
          <span className="text-muted-foreground text-[9px]">
            {user?.username?.slice(0, 2).toUpperCase()}
          </span>
        </Avatar>
        <div className="flex flex-1 border rounded flex-col">
          <Textarea
            ref={textAreaRef}
            className="resize-none border-none"
            placeholder="Leave a comment..."
          />

          <Button className="self-end m-2" size="sm" onClick={onSubmit}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};
