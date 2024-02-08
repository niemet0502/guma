import { Button } from "@/components/ui/button";
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
import { Avatar } from "@radix-ui/react-avatar";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useRef } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { RiArrowRightSLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { AnswerItem } from "../components/AnswerItem";
import { QuestionRemoveDialog } from "../components/RemoveQuestionDialog";
import { useCreateAnswer } from "../hooks/useCreateAnswer";
import { useGetQuestion } from "../hooks/useGetQuestion";
import { useVoteAnswer } from "../hooks/useVoteAnswer";
import { CreateVoteInput } from "../type";

export const QuestionDetails: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { questionId } = useParams<{ questionId: string }>();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { data: question } = useGetQuestion(questionId!);
  const { postVote } = useVoteAnswer();
  const { createAnswer } = useCreateAnswer();

  const handleVote = (createVoteInput: CreateVoteInput) => {
    postVote(createVoteInput);
    toast({
      title: "Votre vote a été poster",
    });
  };

  const handleAnswer = () => {
    if (textAreaRef.current) {
      const content = textAreaRef.current.value;

      console.log(content);

      if (content === "") {
        toast({
          title: "Content required",
          description: "Please add a content before submitting",
        });
      } else {
        createAnswer({
          content: content as string,
          question_id: +question!.id,
        });
        textAreaRef.current.value = "";
      }
    }
  };

  return (
    <div className="w-full">
      <div className="bg-secondary py-3 px-5 flex gap-1 items-center">
        <p>Questions</p>
        <p className="flex gap-1 items-center">
          <RiArrowRightSLine className="mt-0.5" /> {question?.title}
        </p>
        {question && (
          <QuestionRemoveDialog questionId={question!.id}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <DialogTrigger>
                    <button className="ml-2">
                      <BiTrashAlt />
                    </button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete the question</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </QuestionRemoveDialog>
        )}
      </div>
      {question && (
        <div>
          <div className="px-5 mt-5 flex flex-col gap-4 pb-5 border-b">
            <h1 className="text-2xl font-medium">{question?.title}</h1>
            <div className="flex gap-2">
              <p>
                Posé{" "}
                <span className="font-medium">
                  {" "}
                  {getTimeAgoString(question.created_at)}{" "}
                </span>
              </p>
              <p>
                Vue <span className="font-medium"> {question.view} fois </span>
              </p>
            </div>
          </div>
          <div className="px-5 mt-4 border-b pb-5">
            <p>{question.content}</p>
          </div>
          <div className="p-5">
            <h2 className="font-medium text-xl mb-4">
              {question.answers.length} Réponse(s)
            </h2>
          </div>
          {question.answers.map((answer) => (
            <AnswerItem answer={answer} key={answer.id} postVote={handleVote} />
          ))}

          <h2 className="font-medium text-xl m-5">Votre réponse</h2>
          <div className="flex items-center justify-center  mb-7">
            <div className="max-w-[1200px] w-full flex gap-4 py-3  ">
              <Avatar className="h-6 w-6 bg-transparent flex rounded-full border-2 items-center  justify-center mt-0.5">
                <span className="text-muted-foreground  text-[9px]">
                  {user?.username?.slice(0, 2).toUpperCase()}
                </span>
              </Avatar>
              <div className="flex flex-1 border rounded flex-col">
                <Textarea
                  ref={textAreaRef}
                  className="resize-none border-none"
                />

                <Button
                  className="self-end m-2"
                  size="sm"
                  onClick={handleAnswer}
                >
                  Répondre
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
