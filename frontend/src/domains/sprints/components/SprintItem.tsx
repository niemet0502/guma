import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SprintApi } from "@/domains/tasks/type";
import { NavLink, useParams } from "react-router-dom";
import { SprintStatusEnum } from "../type";

export const SprintItem: React.FC<{ sprint: SprintApi }> = ({ sprint }) => {
  const { orgaId, teamId } = useParams<{ orgaId: string; teamId: string }>();

  const completed = sprint.tasks?.filter(
    ({ status }) => status.name === "Done"
  ).length;

  const style =
    sprint.status === SprintStatusEnum.Ongoing
      ? "border border-blue-950"
      : sprint.status === SprintStatusEnum.Pending
      ? "border-dashed"
      : "";

  const completedTasks =
    sprint.tasks?.filter((task) => task.status.name === "Done").length || 0;
  const totalTasks = sprint.tasks?.length || 0;

  const completionPercentage =
    (sprint.isCompleted
      ? sprint.unCompletedTasksUponClose / sprint.totalTasksUponClose
      : completedTasks / totalTasks) * 100;

  return (
    <NavLink to={`/${orgaId}/team/${teamId}/sprints/${sprint.id}`}>
      <div
        className={`mx-4 hover:cursor-pointer py-3 px-5 border flex justify-between rounded ${style}`}
      >
        <span>{sprint.name}</span>
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
        </div>
      </div>
    </NavLink>
  );
};
