import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { SprintApi } from "@/domains/tasks/type";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiPlay1 } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";
import { useUpdateSprint } from "../hooks/useUpdateSprint";
import { SprintStatusEnum } from "../type";

export const SprintItem: React.FC<{
  sprint: SprintApi;
  hasOngoingSprint?: boolean;
}> = ({ sprint, hasOngoingSprint }) => {
  const { orgaId, teamId } = useParams<{ orgaId: string; teamId: string }>();
  const { toast } = useToast();
  const { updateSprint } = useUpdateSprint();

  const [open, setOpen] = useState(false);

  const completed = sprint.tasks?.filter(
    ({ status }) => status.state >= 25 && status.state <= 30
  ).length;

  const style =
    sprint.status === SprintStatusEnum.Ongoing
      ? "border border-blue-950"
      : sprint.status === SprintStatusEnum.Pending
      ? "border-dashed"
      : "";

  const completedTasks =
    sprint.tasks?.filter(
      (task) => task.status.state >= 25 && task.status.state <= 30
    ).length || 0;
  const totalTasks = sprint.tasks?.length || 0;

  const completionPercentage =
    (sprint.isCompleted
      ? sprint.unCompletedTasksUponClose / sprint.totalTasksUponClose
      : completedTasks / totalTasks) * 100;

  const onConfirm = () => {
    updateSprint({
      id: sprint.id,
      status: SprintStatusEnum.Ongoing,
    });
    setOpen(false);
    toast({
      title: "Success",
      description: `${sprint.name} started successfully !`,
    });
  };

  return (
    <div
      className={`mx-4 hover:cursor-pointer py-3 px-5 border flex justify-between rounded ${style}`}
    >
      <NavLink
        to={`/${orgaId}/team/${teamId}/sprints/${sprint.id}`}
        className="flex-1"
      >
        <span>{sprint.name}</span>
      </NavLink>
      <div className="flex gap-4 items-center">
        {sprint.isCompleted && <Badge>completed</Badge>}

        <div className="flex items-center gap-2">
          <Progress value={completionPercentage} className="w-[100px]" />
          <span className="flex gap-2 items-center">
            {completionPercentage ? completionPercentage | 0 : 0} %
            <span className="text-muted-foreground text-xs">Success</span>
          </span>
        </div>

        <span className="flex gap-2 items-center">
          {completed}
          <span className="text-muted-foreground text-xs">Completed</span>
        </span>

        <span className="flex gap-2 items-center">
          {sprint.isCompleted
            ? sprint.totalTasksUponClose
            : sprint.tasks?.length}
          <span className="text-muted-foreground text-xs">Scopes</span>
        </span>

        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BsThreeDotsVertical className="text-muted-foreground hover:text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[130px] mr-[20px]">
              {sprint.status !== SprintStatusEnum.Done && (
                <DialogTrigger className="w-full ">
                  <DropdownMenuItem
                    className="flex items-center gap-2 hover:cursor-pointer"
                    disabled={hasOngoingSprint}
                  >
                    <CiPlay1 className="mt-0.5" />
                    Start
                  </DropdownMenuItem>
                </DialogTrigger>
              )}
              <DropdownMenuItem className="flex items-center gap-2">
                <MdOutlineEdit className="mt-0.5" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <AiOutlineDelete className="mt-0.5" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="w-[600px]">
            <DialogHeader>
              <DialogTitle>
                You are about to start the {sprint.name}
              </DialogTitle>
              <DialogDescription>
                By confirming this action, you will initiate the {sprint.name}.
                Once started, the sprint's progress can be tracked and managed.
                Are you ready to begin the sprint?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button type="button" onClick={onConfirm}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
