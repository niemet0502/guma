import { Button } from "@/components/ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import { NavLink, useParams } from "react-router-dom";
import { QuestionItem } from "../components/QuestionItem";
import { useQuestion } from "../hooks/useQuestion";

export const QuestionList: React.FC = () => {
  const { orgaId } = useParams<{ orgaId: string }>();
  const { data: questions } = useQuestion();
  return (
    <div className="w-full">
      <div className="bg-secondary py-3 px-5 flex items-center justify-between">
        <p>
          Questions
          <span className="text-muted-foreground ml-2">
            {questions?.length}
          </span>
        </p>

        <NavLink to={`/${orgaId}/questions/new`}>
          <button className="mr-2 hover:cursor-pointer text-muted-foreground">
            <AiOutlinePlus />
          </button>
        </NavLink>
      </div>

      <div className="w-full flex items-end border-b mt-3 justify-end">
        <div className="bg-secondary p-2 mr-4 rounded-sm">
          <Button size="sm" className="bg-white text-muted-foreground">
            Nouvelles questions
          </Button>
          <Button size="sm" className="bg-white text-muted-foreground">
            Sans réponse
          </Button>
        </div>
      </div>

      <div>
        {(questions || []).map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
};
