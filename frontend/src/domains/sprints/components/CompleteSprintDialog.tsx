import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { SprintApi } from "@/domains/tasks/type";
import { DialogClose } from "@radix-ui/react-dialog";
import { useCompleteSprint } from "../hooks/useCompleteSprint";
import { CompleteSprintInput } from "../type";

export const CompleteSprintDialog: React.FC<{
  children: React.ReactElement;
  sprint: SprintApi;
}> = ({ children, sprint }) => {
  const { completeSprint } = useCompleteSprint();
  const { toast } = useToast();

  const onConfirm = () => {
    const input = {
      id: sprint.id,
      isCompleted: openIssues.length === 0,
      destination: 2,
      unCompletedTasksIds: openIssues.map(({ id }) => +id),
      totalTasksCounter: sprint.tasks?.length,
    } as CompleteSprintInput;
    completeSprint(input);

    toast({
      title: "Success",
      description: "Your sprint has been completed successfully",
    });
  };

  const openIssues = sprint.tasks?.filter(
    ({ status }) => status.name !== "Done"
  );
  const completedIssues = sprint.tasks?.length - openIssues.length;
  return (
    <div>
      <Dialog>
        {children}
        <DialogContent className="w-[550px]">
          <DialogHeader>
            <DialogTitle>Complete {sprint.name}</DialogTitle>
          </DialogHeader>
          <div>
            {openIssues.length === 0 && (
              <div>
                <p>
                  This sprint contains {completedIssues} issue. <br />
                  That's all of them - well done!
                </p>
              </div>
            )}

            {openIssues.length > 0 && (
              <>
                <p>The sprint contains: </p>
                <ul className="list-disc m-1 pl-6">
                  <li>{completedIssues}completed issues</li>
                  <li>{openIssues.length} open issue</li>
                </ul>
              </>
            )}
          </div>
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
