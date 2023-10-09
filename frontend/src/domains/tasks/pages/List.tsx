import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/domains/auth/providers/auth";
import { useGetTeam } from "@/domains/teams/hooks/useGetTeam";
import { TeamVisibility } from "@/domains/teams/type";
import { useGetUsers } from "@/domains/users/hooks/useGetUsers";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CreateTeamDropdown } from "../components/CreateDrowpdown";
import { TaskItem } from "../components/TaskItem";
import { useTasks } from "../hooks/useTasks";

export const TaskList: React.FC = () => {
  const { organization } = useAuth();

  const { teamId } = useParams<{ teamId: string }>();
  const { fetchTasks, data: tasks } = useTasks();
  const { data: users } = useGetUsers(organization?.id as number);
  const { data: team, isLoading } = useGetTeam(teamId);

  const members =
    team?.visibility === TeamVisibility.PUBLIC
      ? users
      : team?.members.map(({ user }) => user);

  useEffect(() => {
    if (!team) return;
    fetchTasks({ team_id: +team.id, status_name: "Backlog" });
  }, [team]);

  return (
    <div className="w-full">
      <div className="bg-secondary py-3 px-5 flex items-center justify-between">
        <p>
          Backlog
          <span className="text-muted-foreground ml-2">{tasks?.length}</span>
        </p>

        <CreateTeamDropdown members={members} teamId={team?.id} />
      </div>
      {isLoading && (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      )}

      {!isLoading && (
        <div>
          {tasks?.map((task) => (
            <TaskItem task={task} key={task.id} members={members} />
          ))}
        </div>
      )}
    </div>
  );
};
