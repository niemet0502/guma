import { Drag } from "@/components/dnd/drag";
import { Drop } from "@/components/dnd/drop";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { TaskCard } from "@/domains/tasks/components/TaskCard";
import { TaskStatusIcon } from "@/domains/tasks/components/TaskStatusIcon";
import { useGetStatus } from "@/domains/tasks/hooks/useGetStatus";
import { useUpdateTask } from "@/domains/tasks/hooks/useUpdateTask";
import { ActivityAction, SprintApi } from "@/domains/tasks/type";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { RiArrowRightSLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import {
  calculateIssueListPosition,
  isPositionChanged,
  remainingWorkingDays,
} from "../helper";
import { SprintStatusEnum } from "../type";
import { CompleteSprintDialog } from "./CompleteSprintDialog";

export const OngoingSprint: React.FC<{ sprint: SprintApi }> = ({ sprint }) => {
  const { data: status } = useGetStatus(sprint.team_id);
  const { updateTask } = useUpdateTask();

  const handleDragEnd = (result: DropResult) => {
    const { draggableId, source, destination } = result;

    if (!isPositionChanged(source, destination)) return;

    const issueId = Number(draggableId);

    const position = calculateIssueListPosition(
      sprint.tasks!,
      destination,
      source,
      issueId
    );

    updateTask({
      id: issueId,
      position,
      status_id: +destination?.droppableId!,
      action: ActivityAction.CHANGED_STATUS,
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-3  py-3 px-5 flex items-center gap-1 sticky top-0 justify-between">
        <div className="flex items-center">
          <NavLink to={`/ `} className="hover:text-muted-foreground w-auto p-0">
            Sprints
          </NavLink>
          <p className="flex gap-1 items-center">
            <RiArrowRightSLine className="mt-0.5" />
            {sprint?.name}
          </p>
        </div>
        {sprint.status === SprintStatusEnum.Ongoing && (
          <div className="flex gap-2 items-center">
            <span className="text-muted-foreground">
              {remainingWorkingDays(sprint.end_at)} work days
            </span>
            <CompleteSprintDialog sprint={sprint}>
              <DialogTrigger className="w-full">
                <Button size="sm" variant="secondary">
                  Complete sprint
                </Button>
              </DialogTrigger>
            </CompleteSprintDialog>
          </div>
        )}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="w-full h-full flex overflow-x-auto">
          <Drop id="droppable" type="droppable-category" className="flex">
            {status
              ?.filter(({ name }) => name !== "Backlog")
              .map((statut, index) => (
                <Drag key={statut.id} id={statut.id} index={index} isDraggable>
                  <div className="w-[330px] p-2 flex flex-col gap-3 h-full ">
                    <div className="flex gap-2 items-center">
                      <TaskStatusIcon status={statut.name} />
                      {statut.name}
                    </div>

                    <Drop
                      key={statut.id}
                      id={statut.id}
                      type="droppable-item"
                      className="h-full"
                    >
                      <div className="flex flex-col gap-3">
                        {sprint.tasks
                          ?.filter(({ status }) => status.id === statut.id)
                          .map((task, index) => (
                            <Drag
                              key={task.id}
                              id={task.id}
                              index={index}
                              draggableId={task.id.toString()}
                              isDraggable
                            >
                              <TaskCard task={task} key={task.id} />
                            </Drag>
                          ))}
                      </div>
                    </Drop>
                  </div>
                </Drag>
              ))}
          </Drop>
        </div>
      </DragDropContext>
    </div>
  );
};
