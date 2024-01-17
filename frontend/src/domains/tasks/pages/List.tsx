import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/domains/auth/providers/auth";
import { User } from "@/domains/auth/services/types";
import { useGetTeam } from "@/domains/teams/hooks/useGetTeam";
import { TeamVisibility } from "@/domains/teams/type";
import { useGetUsers } from "@/domains/users/hooks/useGetUsers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CreateTeamDropdown } from "../components/CreateDrowpdown";
import { TaskItem } from "../components/TaskItem";
import { useTasks } from "../hooks/useTasks";

export const TaskList: React.FC = () => {
  const { project } = useAuth();

  const { teamId } = useParams<{ teamId: string }>();
  const { fetchTasks, data: tasks } = useTasks();
  const { data: users } = useGetUsers(project?.id as number);
  const { data: team, isLoading } = useGetTeam(project?.id as number, teamId);

  console.log(project);

  const [members, setMembers] = useState<User[]>();

  useEffect(() => {
    if (!team) return;
    fetchTasks({ team_id: +team.id, status_name: "Backlog" });
    const m =
      team?.visibility === TeamVisibility.PUBLIC
        ? users
        : team?.members.map(({ user }) => user);
    setMembers(m);
  }, [team]);

  console.log(team);

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
          {tasks
            ?.filter(({ parent_task_id }) => !parent_task_id)
            .map((task) => (
              <TaskItem task={task} key={task.id} members={members} />
            ))}
        </div>
      )}
    </div>
  );
};
