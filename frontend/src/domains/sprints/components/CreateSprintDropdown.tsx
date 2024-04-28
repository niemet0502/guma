import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TeamApi } from "@/domains/teams/type";
import { useState } from "react";
import { CreateSprintForm } from "./CreateForm";

export const CreateSprintDropdown: React.FC<{
  children: React.ReactNode;
  team?: TeamApi;
}> = ({ children, team }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:w-[800px] sm:max-w-[625px] top-[45%]">
        <DialogHeader>
          <DialogTitle>Create a new sprint</DialogTitle>
          <DialogDescription>
            Create a new team to manage seperate sprints, issues and documents
          </DialogDescription>
        </DialogHeader>
        <CreateSprintForm onOpenChange={setOpen} teamId={team?.id} />
      </DialogContent>
    </Dialog>
  );
};
