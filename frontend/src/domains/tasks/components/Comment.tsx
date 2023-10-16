import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/domains/auth/providers/auth";
import { getTimeAgoString } from "@/lib/utils";
import { BsReply, BsThreeDots } from "react-icons/bs";
import { CommentApi } from "../type";

export const Comment: React.FC<{ comment: CommentApi; isReply?: boolean }> = ({
  comment,
  isReply = false,
}) => {
  const { user } = useAuth();
  return (
    <div className="w-full flex gap-4">
      {!isReply && (
        <Avatar className="h-6 w-6 bg-transparent border-2 items-center justify-center mt-2.5">
          <span className="text-muted-foreground text-[9px]">
            {comment.author?.username?.slice(0, 2).toUpperCase()}
          </span>
        </Avatar>
      )}
      <div
        className={`flex flex-1  flex-col py-2 px-4 ${
          !isReply && "border rounded"
        }`}
      >
        <div className="flex justify-between items-center">
          <h6 className="text-sm">
            {comment.author.username}
            <span className="text-muted-foreground">
              {getTimeAgoString(comment.created_at)}
            </span>
          </h6>

          <div className="flex items-center gap-2">
            {!isReply && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <BsReply />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reply to comment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {user?.id === comment.author.id && <BsThreeDots />}
          </div>
        </div>
        <p>{comment.content}</p>
        {comment.replies && comment.replies.length > 0 && (
          <Separator className="my-2" />
        )}
        {comment.replies?.map((reply) => (
          <Comment comment={reply} isReply />
        ))}
      </div>
    </div>
  );
};
