import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@/domains/auth/services/types";
import { useState } from "react";
import { CreateTaskForm } from "./CreateForm";

export const CreateTeamDropdown: React.FC<{
  members?: User[];
  teamId?: number;
  children: React.ReactNode;
}> = ({ members, teamId, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:w-[800px] sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Nouvelle tache</DialogTitle>
        </DialogHeader>
        <CreateTaskForm
          onOpenChange={setOpen}
          members={members}
          teamId={teamId}
        />
      </DialogContent>
    </Dialog>
  );
};
