import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/domains/auth/providers/auth";
import { getTimeAgoString } from "@/lib/utils";
import { useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";
import { BsReply, BsThreeDots } from "react-icons/bs";
import { useCreateComment } from "../hooks/useCreateComment";
import { CommentApi } from "../type";
import { CommentRemoveDialog } from "./CommentRemoveDialog";

export const CommentItem: React.FC<{
  comment: CommentApi;
  isReply?: boolean;
}> = ({ comment, isReply = false }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { addComment } = useCreateComment();

  const [hasFocus, setHasFocus] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Set focus on the textarea
    }
  };

  // useEffect(() => {
  //   const checkFocus = () => {
  //     if (inputRef.current) {
  //       setHasFocus(inputRef.current === document.activeElement);
  //     }
  //   };

  //   document.addEventListener("focus", checkFocus, true);
  //   document.addEventListener("blur", checkFocus, true);

  //   return () => {
  //     document.removeEventListener("focus", checkFocus, true);
  //     document.removeEventListener("blur", checkFocus, true);
  //   };
  // }, []);

  const handleSubmit = () => {
    if (inputRef.current) {
      const content = inputRef.current.value;

      if (content === "") {
        toast({
          title: "Comment required",
          description: "Please add a comment before submitting",
        });
      } else {
        addComment({ content: content as string, parent_id: comment.id });
        inputRef.current.value = "";
      }
    }
  };
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
        className={`flex flex-1  flex-col py-2  ${
          !isReply && "border rounded"
        }`}
      >
        <div className="flex justify-between items-center px-4">
          <h6 className="text-sm flex gap-2">
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
                    <BsReply onClick={handleButtonClick} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reply to comment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {user?.id === comment.author.id && (
              <CommentRemoveDialog commentId={comment.id}>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="sm">
                      <BsThreeDots />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[100px] mr-28">
                    <DropdownMenuItem>
                      <div className="flex gap-1 items-center">
                        <AiOutlineEdit className="mt-0.5" /> Edit
                      </div>
                    </DropdownMenuItem>
                    <DialogTrigger className="w-full">
                      <DropdownMenuItem>
                        <div className="flex gap-1 items-center w-full">
                          <BiTrashAlt className="mt-0.5" /> Delete
                        </div>
                      </DropdownMenuItem>
                    </DialogTrigger>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CommentRemoveDialog>
            )}
          </div>
        </div>
        <p className="px-4">{comment.content}</p>
        {comment.replies && comment.replies.length > 0 && (
          <Separator className="my-2" />
        )}
        {comment.replies?.map((reply) => (
          <CommentItem comment={reply} isReply />
        ))}

        {!isReply && (
          <>
            <Separator className="my-2" />
            <div className="flex flex-col px-2">
              <Textarea
                ref={inputRef}
                placeholder="Leave a reply..."
                className="resize-none border-0 pt-2 pb-0"
              />

              {/* {(hasFocus) && ( */}
              <Button
                className={`self-end m-2 ${
                  hasFocus ? "animate-accordion-down" : "animate-accordion-up"
                }`}
                size="sm"
                onClick={handleSubmit}
              >
                Reply
              </Button>
              {/* )} */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
