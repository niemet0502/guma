import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRemoveComment } from "../hooks/useRemoveComment";

export const CommentRemoveDialog: React.FC<{
  children: React.ReactElement;
  commentId: number;
}> = ({ children, commentId }) => {
  const { removeComment } = useRemoveComment();

  const onConfirm = () => {
    removeComment({
      variables: { id: commentId },
    });
  };
  return (
    <div>
      <Dialog>
        {children}
        <DialogContent className="w-[550px]">
          <DialogHeader>
            <DialogTitle>
              Are you absolutely sure you want to delet this comment ?
            </DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
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
