import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CreateForm } from "./CreateForm";

export const CreateDialog: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="mr-2 hover:cursor-pointer">
          <AiOutlinePlus />
        </span>
      </DialogTrigger>
      <DialogContent className="lg:w-[800px] sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create a new team</DialogTitle>
          <DialogDescription>
            Create a new team to manage seperate sprints, issues and documents
          </DialogDescription>
        </DialogHeader>
        <CreateForm onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
