import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/domains/auth/providers/auth";
import { useGetTeam } from "@/domains/teams/hooks/useGetTeam";
import { Dialog } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { CreateSprintForm } from "../components/CreateForm";
import { SprintItem } from "../components/SprintItem";
import { useSprints } from "../hooks/useSprints";
import { SprintStatusEnum } from "../type";

export const SprintList: React.FC = () => {
  const { organization } = useAuth();
  const { teamId } = useParams<{ teamId: string }>();

  const { data: team } = useGetTeam(organization?.id as number, teamId);
  const { fetchSprints, data: sprints } = useSprints();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!team) return;
    fetchSprints(+team.id);
  }, [team]);

  const hasOngoingSprint = sprints?.some(
    ({ status }) => status === SprintStatusEnum.Ongoing
  );

  return (
    <div className="w-full">
      <div className="mb-3 bg-secondary py-3 px-5 flex items-center justify-between sticky top-0">
        <p>
          Sprints
          <span className="text-muted-foreground ml-2">{sprints?.length}</span>
        </p>

        <Dialog open={open} onOpenChange={setOpen} modal={false}>
          <DialogTrigger asChild>
            <span className="mr-2 hover:cursor-pointer">
              <AiOutlinePlus />
            </span>
          </DialogTrigger>
          <DialogContent className="lg:w-[800px] sm:max-w-[625px] top-[45%]">
            <DialogHeader>
              <DialogTitle>Create a new sprint</DialogTitle>
              <DialogDescription>
                Create a new team to manage seperate sprints, issues and
                documents
              </DialogDescription>
            </DialogHeader>
            <CreateSprintForm onOpenChange={setOpen} teamId={team?.id} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full flex flex-col gap-4">
        {sprints?.map((sprint) => (
          <SprintItem
            sprint={sprint}
            key={sprint.id}
            hasOngoingSprint={hasOngoingSprint}
          />
        ))}
      </div>
    </div>
  );
};
