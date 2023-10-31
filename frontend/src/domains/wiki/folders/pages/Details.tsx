import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { BiDotsHorizontalRounded, BiLink } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { NavLink, useParams } from "react-router-dom";
import { DocumentItem } from "../../documents/components/DocumentItem";
import { useGetFolder } from "../hooks/useGetFolder";
import { useRemoveFolder } from "../hooks/useRemoveFolder";

export const FolderDetails: React.FC = () => {
  const { folderId } = useParams<{ folderId: string }>();

  const { data } = useGetFolder(folderId as string);
  const { removeFolder } = useRemoveFolder();

  const handleDelete = () => {};
  return (
    <div className="w-full">
      <div className="bg-secondary py-3 px-5 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <NavLink to={"/"} className="hover:text-muted-foreground">
            Wiki
          </NavLink>
          <p className="flex gap-1 items-center">
            <RiArrowRightSLine className="mt-0.5" />
            {data?.name}
          </p>
          <DropdownMenu>
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
          </DropdownMenu>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="pr-0 hover:cursor-pointer text-muted-foreground"
        >
          <AiOutlinePlus />
        </Button>
      </div>
      <div>
        {data?.documents?.map((document) => (
          <DocumentItem document={document} />
        ))}
      </div>
    </div>
  );
};
