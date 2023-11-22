import { TaskCard } from "@/domains/tasks/components/TaskCard";
import { TaskStatusIcon } from "@/domains/tasks/components/TaskStatusIcon";
import { useGetStatus } from "@/domains/tasks/hooks/useGetStatus";
import { SprintApi } from "@/domains/tasks/type";
import { RiArrowRightSLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

export const OngoingSprint: React.FC<{ sprint: SprintApi }> = ({ sprint }) => {
  const { data: status } = useGetStatus(sprint.team_id);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-3 bg-secondary py-3 px-5 flex items-center gap-1 sticky top-0">
        <NavLink to={`/ `} className="hover:text-muted-foreground w-auto p-0">
          Sprints
        </NavLink>
        <p className="flex gap-1 items-center">
          <RiArrowRightSLine className="mt-0.5" />
          {sprint?.name}
        </p>
      </div>
      <div className="w-full h-full flex overflow-x-auto">
        {status?.map((statut) => (
          <div key={statut.id} className="w-[330px] p-2 flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <TaskStatusIcon status={statut.name} />
              {statut.name}
            </div>

            <div className="flex flex-col gap-3">
              {sprint.tasks
                ?.filter(({ status }) => status.id === statut.id)
                .map((task) => (
                  <TaskCard task={task} key={task.id} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
