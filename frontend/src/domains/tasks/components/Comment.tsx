import { Avatar } from "@/components/ui/avatar";
import { getTimeAgoString } from "@/lib/utils";
import { CommentApi } from "../type";

export const Comment: React.FC<{ comment: CommentApi }> = ({ comment }) => {
  return (
    <div className="w-full  flex gap-4">
      <Avatar className="h-6 w-6 bg-transparent border-2 items-center justify-center mt-2.5">
        <span className="text-muted-foreground text-[9px]">
          {comment.author?.username?.slice(0, 2).toUpperCase()}
        </span>
      </Avatar>
      <div className="flex flex-1 border rounded flex-col py-2 px-4">
        <h6 className="text-sm">
          {comment.author.username}{" "}
          <span className="text-muted-foreground">
            {getTimeAgoString(comment.created_at)}
          </span>
        </h6>
        <p>{comment.content}</p>
      </div>
    </div>
  );
};
