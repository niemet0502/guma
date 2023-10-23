import { useAuth } from "@/domains/auth/providers/auth";
import { useGetTeam } from "@/domains/teams/hooks/useGetTeam";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { SprintItem } from "../components/SprintItem";
import { useSprints } from "../hooks/useSprints";

export const SprintList: React.FC = () => {
  const { organization } = useAuth();
  const { teamId } = useParams<{ teamId: string }>();

  const { data: team } = useGetTeam(organization?.id as number, teamId);
  const { fetchSprints, data: sprints } = useSprints();

  useEffect(() => {
    if (!team) return;
    fetchSprints(+team.id);
  }, [team]);

  return (
    <div className="w-full">
      <div className="mb-3 bg-secondary py-3 px-5 flex items-center justify-between">
        <p>
          Sprints
          <span className="text-muted-foreground ml-2">{sprints?.length}</span>
        </p>

        <span className="mr-2 hover:cursor-pointer text-muted-foreground">
          <AiOutlinePlus />
        </span>
      </div>
      <div className="w-full flex flex-col gap-4">
        {sprints?.map((sprint) => (
          <SprintItem sprint={sprint} />
        ))}
      </div>
    </div>
  );
};
