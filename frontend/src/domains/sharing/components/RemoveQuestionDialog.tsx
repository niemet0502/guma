import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
import { useNavigate, useParams } from "react-router-dom";
import { useRemoveQuestion } from "../hooks/useRemoveQuestion";

export const QuestionRemoveDialog: React.FC<{
  children: React.ReactElement;
  questionId: number;
}> = ({ children, questionId }) => {
  const { orgaId } = useParams<{ orgaId: string }>();
  const { toast } = useToast();
  const { removeQuestion } = useRemoveQuestion();

  const navigate = useNavigate();

  const onConfirm = () => {
    removeQuestion({
      variables: { id: +questionId },
    });
    toast({
      title: "Success !",
      description: "Your question has been successfully deleted",
    });
    navigate(`/${orgaId}/questions`);
  };
  return (
    <div>
      <Dialog>
        {children}
        <DialogContent className="w-[550px]">
          <DialogHeader>
            <DialogTitle>
              Are you absolutely sure you want to delet this question ?
            </DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button type="button" onClick={onConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
