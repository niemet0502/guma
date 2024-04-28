import { Button } from "@/components/ui/button";
import { useAuth } from "@/domains/auth/providers/auth";
import { useGetTeam } from "@/domains/teams/hooks/useGetTeam";
import { useEffect } from "react";
import { AiOutlinePlayCircle, AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { CreateSprintDropdown } from "../components/CreateSprintDropdown";
import { SprintItem } from "../components/SprintItem";
import { useSprints } from "../hooks/useSprints";
import { SprintStatusEnum } from "../type";

export const SprintList: React.FC = () => {
  const { project } = useAuth();
  const { teamId } = useParams<{ teamId: string }>();

  const { data: team } = useGetTeam(project?.id as number, teamId);
  const { fetchSprints, data: sprints } = useSprints();

  useEffect(() => {
    if (!team) return;
    fetchSprints(+team.id);
  }, [team]);

  const hasOngoingSprint = sprints?.some(
    ({ status }) => status === SprintStatusEnum.Ongoing
  );

  return (
    <div className="w-full h-full">
      <div className="mb-3 bg-secondary py-3 px-5 flex items-center justify-between sticky top-0">
        <p>
          Sprints
          <span className="text-muted-foreground ml-2">{sprints?.length}</span>
        </p>

        <CreateSprintDropdown team={team}>
          <span className="mr-2 hover:cursor-pointer">
            <AiOutlinePlus />
          </span>
        </CreateSprintDropdown>
      </div>
      <div className="w-full h-full flex flex-col gap-4">
        {sprints?.map((sprint) => (
          <SprintItem
            sprint={sprint}
            key={sprint.id}
            hasOngoingSprint={hasOngoingSprint}
          />
        ))}

        {sprints && sprints.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col gap-3 border bg-secondary rounded p-8 mb-[150px] w-[400px] shadow-xl">
              <div className="flex gap-3 items-center">
                <AiOutlinePlayCircle className="text-3xl mt-2" />{" "}
                <h1 className="text-4xl">Sprints</h1>
              </div>
              <p>There are no sprints for this team yet.</p>

              <p>
                Once you have created sprints for your team they will show up
                here.
              </p>

              <CreateSprintDropdown team={team}>
                <Button className="mt-3">Create a sprints</Button>
              </CreateSprintDropdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
