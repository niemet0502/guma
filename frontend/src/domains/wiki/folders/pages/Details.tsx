import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { DocumentItem } from "../../documents/components/DocumentItem";
import { CreateWikiForm } from "../components/CreateWiki";
import { useGetFolder } from "../hooks/useGetFolder";
import { useRemoveFolder } from "../hooks/useRemoveFolder";

export const FolderDetails: React.FC = () => {
  const { orgaId, folderId } = useParams<{
    orgaId: string;
    folderId: string;
  }>();
  const { data } = useGetFolder(folderId as string);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [opent, setOpent] = useState(false);

  const { removeFolder } = useRemoveFolder();

  const handleDelete = () => {
    removeFolder({ variables: { id: data?.id } });
    toast({
      title: "Success",
      description: "The folder has been successfully removed",
    });
    navigate(-1);
  };
  return (
    <div className="w-full h-full">
      <div className="bg-secondary py-3 px-5 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <NavLink
                    to={`/${orgaId}/team/${data?.team?.name.toLowerCase()}/wiki`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "default p-1"
                        : isPending
                        ? "default p-1"
                        : "default p-1"
                    }
                  >
                    Wiki
                  </NavLink>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage> {data?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-2 flex items-center gap-1">
            <Dialog open={opent} onOpenChange={setOpent} modal={false}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="w-4">
                  <MdOutlineEdit />
                </Button>
              </DialogTrigger>
              <DialogContent className="lg:w-[800px] sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Edit wiki</DialogTitle>
                </DialogHeader>
                <CreateWikiForm onOpenChange={setOpent} wikiToEdit={data} />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger>
                <Button variant="ghost" size="icon" className="w-4">
                  <AiOutlineDelete />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[450px]">
                <DialogHeader>
                  <DialogTitle>
                    You are about to delete {data?.name}
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone all files related to this
                    folder will be deleted as well. Are you sure you want to
                    permanently delete this folder ?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="button" onClick={handleDelete}>
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          {/* <DropdownMenu>
            <DropdownMenuTrigger className="ml-2 mt-1">
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
              <DropdownMenuItem>
                <Button variant="ghost" onClick={handleDelete}>
                  <AiOutlineDelete className="mt-0.5" /> Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="pr-0 hover:cursor-pointer text-muted-foreground"
            >
              <AiOutlinePlus />
            </Button>
          </DialogTrigger>
          <DialogContent className="lg:w-[800px] sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>New wiki</DialogTitle>
            </DialogHeader>
            <CreateWikiForm
              onOpenChange={setOpen}
              folder_id={+data?.id! as number}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div>
        {data?.documents &&
          data.documents.map((document) => (
            <DocumentItem document={document} />
          ))}
      </div>
    </div>
  );
};
