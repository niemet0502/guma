import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@/domains/auth/services/types";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CreateTaskForm } from "./CreateForm";

export const CreateTeamDropdown: React.FC<{
  members?: User[];
  teamId?: number;
}> = ({ members, teamId }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <span className="mr-2 hover:cursor-pointer text-muted-foreground">
          <AiOutlinePlus />
        </span>
      </DialogTrigger>
      <DialogContent className="lg:w-[800px] sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create a new task</DialogTitle>
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
