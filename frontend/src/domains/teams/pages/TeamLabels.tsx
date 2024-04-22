import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/domains/auth/providers/auth";
import { useGetLabels } from "@/domains/organization/hooks/useGetLabels";
import { LabelApi } from "@/domains/organization/services/type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TeamLabelItem } from "../components/TeamLabelItem";
import { useAddTeamLabel } from "../hooks/useAddTeamLabel";
import { useGetTeam } from "../hooks/useGetTeam";

export const TeamLabels: React.FC = () => {
  const { project } = useAuth();
  const { teamId } = useParams<{ teamId: string }>();

  const { data: team } = useGetTeam(project?.id as number, teamId);
  const { data: labels, refetch } = useGetLabels(undefined, +team?.id!);
  const { createLabel } = useAddTeamLabel();

  const [addNewLabel, setAddNewLabel] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!team) return;
    refetch();
  }, [team]);

  const submit = () => {
    console.log(team);
    console.log(label);

    if (!label || !team) return;

    createLabel({ team_id: +team.id, name: label });
    setLabel("");
    setAddNewLabel(false);
  };
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-xl flex flex-col gap-4">
        <div className="border-b p-2">
          <h1 className="text-2xl">Labels</h1>
          <p className="mt-1">Manage team specific labels</p>
        </div>
        <div className="flex justify-end mt-4">
          <Button type="button" onClick={() => setAddNewLabel(true)}>
            Add a label
          </Button>
        </div>

        {addNewLabel && (
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
              onClick={() => setAddNewLabel(false)}
            >
              Cancel
            </Button>
            <Button variant="default" onClick={submit}>
              Save
            </Button>
          </div>
        )}

        {labels?.map((label: LabelApi) => (
          <TeamLabelItem key={label.id} label={label} />
        ))}
      </div>
    </div>
  );
};
