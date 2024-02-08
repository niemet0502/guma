import { TaskItem } from "@/domains/tasks/components/TaskItem";
import { useGetStatus } from "@/domains/tasks/hooks/useGetStatus";
import { TaskApi } from "@/domains/tasks/type";
import { useMemo } from "react";

export const ModuleTasksList: React.FC<{
  tasks: TaskApi[];
  teamId: number;
}> = ({ tasks, teamId }) => {
  const { data: statuses } = useGetStatus(teamId);

  const filteredStatuses = useMemo(() => {
    if (!statuses) return;
    return statuses.filter((status) =>
      tasks.some((task) => task.status_id === +status.id)
    );
  }, [statuses]);

  return (
    <div>
      {filteredStatuses?.map(({ id, name }) => (
        <div key={id}>
          <div className="w-full bg-secondary py-3 px-5 flex items-center ">
            <p>{name}</p>
          </div>
          {tasks
            .filter(({ status_id }) => status_id === +id)
            .map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
        </div>
      ))}
    </div>
  );
};
