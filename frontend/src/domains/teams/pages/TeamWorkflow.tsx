import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/domains/auth/providers/auth";
import { useGetStatus } from "@/domains/tasks/hooks/useGetStatus";
import { TaskStatusApi } from "@/domains/tasks/type";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { TeamWorkflowIteam } from "../components/TeamWorkflowIteam";
import { useCreateTaskStatus } from "../hooks/useCreateTaskStatus";
import { useGetTeam } from "../hooks/useGetTeam";

const getNewStatusState = (statuses: TaskStatusApi[]): number => {
  const index = statuses.findIndex(({ state }) => state === 25);

  return statuses[index - 1].state + 1;
};

export const TeamWorkflow: React.FC = () => {
  const { project } = useAuth();
  const { teamId } = useParams<{ teamId: string }>();
  const { data: team } = useGetTeam(project?.id as number, teamId);
  const { data: statuses, refetch } = useGetStatus(team?.id as number);

  const [isCreating, setIsCreating] = useState(false);
  const [label, setLabel] = useState("");

  const { createTaskStatus } = useCreateTaskStatus();

  useEffect(() => {
    if (!team) return;
    refetch();
  }, []);

  const submit = () => {
    if (!label || !team || !statuses) return;
    const state = getNewStatusState(statuses);

    createTaskStatus({ team_id: +team.id, name: label, state });
    setLabel("");
    setIsCreating(false);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl ">
        <div className="border-b p-2 mb-4">
          <h1 className="text-2xl">Team workflow</h1>
          <p className="mt-1">Manage team workflow</p>
        </div>

        <p>
          Workflows define the type and order of statuses that issues go through
          from start to completion. Here you can customize and re-order the
          available workflow statuses.
        </p>

        <div className="flex flex-col gap-3 mt-6">
          <div className="">
            <div className="bg-secondary border p-2 rounded">
              Backlog (default){" "}
            </div>
            {statuses
              ?.filter(({ state }) => state === 5 || state === 10)
              .map((status) => (
                <TeamWorkflowIteam key={status.id} status={status} isDefault />
              ))}
          </div>

          <div className="">
            <div className="bg-secondary border p-2 rounded flex justify-between items-ce\">
              <p>Started</p>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsCreating(true)}
              >
                <AiOutlinePlus />
              </Button>
            </div>
            {statuses
              ?.filter(
                ({ state }) =>
                  state !== 5 && state !== 10 && state !== 30 && state !== 25
              )
              .map((status) => (
                <TeamWorkflowIteam key={status.id} status={status} />
              ))}

            {isCreating && (
              <div className="flex gap-2 p-2 border rounded">
                <Input
                  type="text"
                  value={label}
                  onChange={({ target }) => setLabel(target.value)}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  className="border"
                  type="button"
                  onClick={() => setIsCreating(false)}
                >
                  Cancel
                </Button>
                <Button variant="default" onClick={submit}>
                  Save
                </Button>
              </div>
            )}
          </div>
          <div className="">
            <div className="bg-secondary border p-2 rounded">
              Completed (default)
            </div>
            {statuses
              ?.filter(({ state }) => state === 30 || state === 25)
              .map((status) => (
                <TeamWorkflowIteam key={status.id} status={status} isDefault />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
