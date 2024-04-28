import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TeamApi } from "@/domains/teams/type";
import { useState } from "react";
import { CreateWikiForm } from "./CreateWiki";

export const CreateWikiDropdown: React.FC<{
  children: React.ReactNode;
  team?: TeamApi;
}> = ({ children, team }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:w-[800px] sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>New wiki</DialogTitle>
        </DialogHeader>
        <CreateWikiForm onOpenChange={setOpen} team_id={+team?.id! as number} />
      </DialogContent>
    </Dialog>
  );
};
