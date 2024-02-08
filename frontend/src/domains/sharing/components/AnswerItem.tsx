import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getTimeAgoString } from "@/lib/utils";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { AnswerApi, CreateVoteInput } from "../type";

export const AnswerItem: React.FC<{
  answer: AnswerApi;
  postVote: (createVoteInput: CreateVoteInput) => void;
}> = ({ answer, postVote }) => {
  const validationCount = answer.votes.filter(
    ({ isvalidated }) => isvalidated
  ).length;
  const invalidationCount = answer.votes.filter(
    ({ isvalidated }) => !isvalidated
  ).length;

  return (
    <div className="w-full border-b">
      <div className="w-full flex gap-5">
        <div className="p-3 flex flex-col gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button
                  className="w-[35px] h-[35px] rounded-full border flex items-center justify-center hover:cursor-pointer"
                  onClick={() =>
                    postVote({ isvalidated: true, answer_id: +answer.id })
                  }
                >
                  <IoMdArrowDropup className="text-2xl" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cette réponse est utile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="text-center">
            {validationCount - invalidationCount}
          </span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button
                  className="w-[35px] h-[35px] rounded-full border flex items-center justify-center hover:cursor-pointer"
                  onClick={() =>
                    postVote({ isvalidated: false, answer_id: +answer.id })
                  }
                >
                  <IoMdArrowDropdown className="text-2xl" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cette réponse n'est pas utile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex-1 pt-3">{answer.content}</div>
      </div>
      <div className="w-full pb-4 pr-6">
        <p className="text-end">
          Répondu par{" "}
          <span className="font-medium">{answer.author?.username}</span>{" "}
          {getTimeAgoString(answer.created_at)}
        </p>
      </div>
    </div>
  );
};
