import { Badge } from "@/components/ui/badge";
import { TaskItem } from "@/domains/tasks/components/TaskItem";
import { TaskStatusIcon } from "@/domains/tasks/components/TaskStatusIcon";
import { transformDateToMonthDay } from "@/lib/utils";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiArrowRightSLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { OngoingSprint } from "../components/OngoingSprint";
import { useGetSprint } from "../hooks/useGetSprint";

export const SprintDetails: React.FC = () => {
  const { sprintId } = useParams<{ sprintId: string }>();

  const { data: sprint } = useGetSprint(sprintId as string);

  if (sprint && !sprint.isCompleted) {
    return <OngoingSprint sprint={sprint} />;
  }

  return (
    <div className="w-full">
      {sprint && (
        <>
          <div className="mb-3 bg-secondary py-3 px-5 flex items-center justify-between sticky top-0">
            <div className="flex items-center gap-1">
              <p>Sprints</p>
              <RiArrowRightSLine className="mt-0.5" />
              {sprint?.name}
            </div>
          </div>

          <div className="px-5 flex flex-col gap-2 mb-3">
            <div className="flex items-center gap-3">
              <Badge variant="secondary">completed</Badge>
              <p className="flex items-center gap-2">
                {transformDateToMonthDay(sprint?.start_at!)}{" "}
                <FaArrowRightLong />
                {transformDateToMonthDay(sprint?.end_at!)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span>{sprint.name}</span>
              <span>
                {((sprint.unCompletedTasksUponClose /
                  sprint.totalTasksUponClose) *
                  100) |
                  0}
                %
              </span>

              <span className="flex gap-2 items-center">
                {sprint.tasks.length}
                <span className="text-muted-foreground text-xs">Completed</span>
              </span>

              <span className="flex gap-2 items-center">
                {sprint.isCompleted
                  ? sprint.totalTasksUponClose
                  : sprint.tasks?.length}
                <span className="text-muted-foreground text-xs">Scopes</span>
              </span>
            </div>
          </div>

          <div className="bg-secondary py-3 px-5 flex items-center gap-2">
            <TaskStatusIcon status={"Done" as string} />
            <p>Done</p>
            <span className="text-muted-foreground ">
              {sprint.tasks?.length}
            </span>
          </div>

          <div>
            {sprint.tasks.map((task) => (
              <TaskItem task={task} key={task.id} members={[]} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
