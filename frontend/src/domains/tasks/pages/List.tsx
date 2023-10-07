import { useGetTeam } from "@/domains/teams/hooks/useGetTeam";
import { TeamVisibility } from "@/domains/teams/type";
import { useGetUsers } from "@/domains/users/hooks/useGetUsers";
import { useParams } from "react-router-dom";
import { CreateTeamDropdown } from "../components/CreateDrowpdown";
import { TaskItem } from "../components/TaskItem";
import { useTasks } from "../hooks/useTasks";

export const TaskList: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { data: tasks } = useTasks();
  const { data: users } = useGetUsers(25);
  const { data: team } = useGetTeam(teamId);

  const members =
    team?.visibility === TeamVisibility.PUBLIC
      ? users
      : team?.members.map(({ user }) => user);

  return (
    <div className="w-full">
      <div className="bg-secondary py-3 px-5 flex items-center justify-between">
        <p>
          Backlog
          <span className="text-muted-foreground ml-2">{tasks?.length}</span>
        </p>

        <CreateTeamDropdown members={members} teamId={team?.id} />
      </div>
      <div>
        {tasks?.map((task) => (
          <TaskItem task={task} key={task.id} members={members} />
        ))}
      </div>
    </div>
  );
};
