import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
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
import { useEffect, useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";
import { BsReply } from "react-icons/bs";
import { useCreateComment } from "../hooks/useCreateComment";
import { useUpdateComment } from "../hooks/useUpdateComment";
import { CommentApi } from "../type";
import { CommentRemoveDialog } from "./CommentRemoveDialog";

export const CommentItem: React.FC<{
  comment: CommentApi;
  isReply?: boolean;
}> = ({ comment, isReply = false }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { addComment } = useCreateComment();
  const { updateComment, isLoading } = useUpdateComment();

  const [hasFocus] = useState(false);
  const [editing, setEditing] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const editInputRef = useRef<HTMLTextAreaElement>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Set focus on the textarea
    }
  };

  useEffect(() => {
    if (!editing) return;
    if (editInputRef.current) {
      editInputRef.current.focus();
      const length = editInputRef.current.value.length;
      editInputRef.current.setSelectionRange(length, length);
    }
  }, [editing]);

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

  const handleSubmitEdit = () => {
    if (editInputRef.current) {
      const content = editInputRef.current.value;

      if (content === "") {
        toast({
          title: "Comment required",
          description: "Please add a comment before submitting",
        });
      } else {
        updateComment({
          id: comment.id,
          content: content as string,
        });
        editInputRef.current.value = "";
        setEditing(false);
        5;
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
        <div className="group hover:cursor-pointer relative flex justify-between items-center px-4">
          <h6 className="text-sm flex gap-2">
            {comment.author.username}
            <span className="text-muted-foreground">
              {getTimeAgoString(comment.created_at)}
            </span>
          </h6>

          <div className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-300flex items-center gap-2">
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
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <AiOutlineEdit onClick={() => setEditing(true)} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit the comment</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <CommentRemoveDialog commentId={comment.id}>
                  <DialogTrigger className="w-full">
                    <BiTrashAlt />
                  </DialogTrigger>
                </CommentRemoveDialog>
              </>
            )}
          </div>
        </div>
        {isLoading}
        {!editing && !isLoading && <p className="px-4">{comment.content}</p>}

        {editing && (
          <div className="flex flex-col">
            <Textarea
              ref={editInputRef}
              defaultValue={comment.content}
              className="border-0 px-4 text-base"
            />

            <Button
              className={`self-end m-2 ${
                hasFocus ? "animate-accordion-down" : "animate-accordion-up"
              }`}
              size="sm"
              onClick={handleSubmitEdit}
            >
              Reply
            </Button>
          </div>
        )}

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
