import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiDotsHorizontalRounded, BiLink } from "react-icons/bi";
import { BsFolder2 } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useRemoveFolder } from "../hooks/useRemoveFolder";
import { FolderApi } from "../type";

export const FolderItem: React.FC<{ folder: FolderApi }> = ({ folder }) => {
  const { orgaId, teamId } = useParams<{ orgaId: string; teamId: string }>();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  const { removeFolder } = useRemoveFolder();

  const handleDelete = () => {
    removeFolder({ variables: { id: folder.id } });
    toast({
      title: "Success !!",
      description: "Your Folder has been successfully removed",
    });
  };

  return (
    <>
      <div className="py-3 px-5 border-b flex gap-2 items-center hover:cursor-pointer ">
        <BsFolder2 />
        <span className="flex-1">{folder.name}</span>
        <div className="flex gap-2 items-center">
          <Avatar className="h-6 w-6 bg-transparent hover:cursor-pointer">
            <AvatarFallback className="bg-transparent border-2 ">
              <span className="text-muted-foreground text-xs">
                {folder.author?.username.slice(0, 2).toUpperCase()}
              </span>
            </AvatarFallback>
          </Avatar>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BiDotsHorizontalRounded className="text-muted-foreground hover:text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[160px] mr-[20px]">
              <DropdownMenuItem className="flex items-center gap-2">
                <MdOutlineEdit className="mt-0.5" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <BiLink className="mt-0.5" />
                Copy the link
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2  w-full m-0 justify-start"
                  onClick={handleDelete}
                >
                  <AiOutlineDelete className="mt-0.5" /> Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">Name</div>
            <div className="grid grid-cols-4 items-center gap-4">Username</div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
    // <NavLink to={`/${orgaId}/team/${teamId}/wiki/folder/${folder.id}`}>

    // </NavLink>
  );
};
