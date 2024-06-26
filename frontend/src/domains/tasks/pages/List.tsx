import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/domains/auth/providers/auth";
import { User } from "@/domains/auth/services/types";
import { useGetTeam } from "@/domains/teams/hooks/useGetTeam";
import { TeamVisibility } from "@/domains/teams/type";
import { useGetUsers } from "@/domains/users/hooks/useGetUsers";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { GoIssueDraft } from "react-icons/go";
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

  return (
    <div className="w-full h-full">
      <div className="bg-secondary py-3 px-5 flex items-center justify-between sticky top-0">
        <p>
          Backlog
          <span className="text-muted-foreground ml-2">{tasks?.length}</span>
        </p>

        <CreateTeamDropdown members={members} teamId={team?.id}>
          <span className="mr-2 hover:cursor-pointer text-muted-foreground">
            <AiOutlinePlus />
          </span>
        </CreateTeamDropdown>
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

      {!isLoading && tasks && tasks.length === 0 && (
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-col gap-3 border bg-secondary rounded p-8 mb-[150px] w-[400px] shadow-xl">
            <div className="flex gap-3 items-center">
              <GoIssueDraft className="text-2xl mt-2" />{" "}
              <h1 className="text-4xl">Issues</h1>
            </div>
            <p>There are no issues for this team yet.</p>

            <p>
              Once you have created some issues for your team they will show up
              here.
            </p>
            <CreateTeamDropdown members={members} teamId={team?.id}>
              <Button className="mt-3">Create an issue</Button>
            </CreateTeamDropdown>
          </div>
        </div>
      )}
    </div>
  );
};
