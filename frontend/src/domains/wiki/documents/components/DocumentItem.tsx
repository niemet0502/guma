import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTimeAgoString } from "@/lib/utils";
import { AiOutlineDelete, AiOutlineFileText } from "react-icons/ai";
import { BiCopy, BiDotsHorizontalRounded, BiLink } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";
import { DocumentApi } from "../type";

export const DocumentItem: React.FC<{ document: DocumentApi }> = ({
  document,
}) => {
  const { orgaId, teamId } = useParams<{ orgaId: string; teamId: string }>();

  return (
    <NavLink to={`/${orgaId}/team/${teamId}/wiki/doc/${document.id}`}>
      <div className="py-3 px-5 border-b flex gap-2 items-center hover:cursor-pointer ">
        <AiOutlineFileText className="text-muted-foreground" />
        <span className="flex-1">{document.name}</span>
        <div className="flex gap-2 items-center">
          <span>{getTimeAgoString(document.updated_at)}</span>
          <Avatar className="h-6 w-6 bg-transparent hover:cursor-pointer">
            <AvatarFallback className="bg-transparent border-2 ">
              <span className="text-muted-foreground text-xs">
                {document.author?.username.slice(0, 2).toUpperCase()}
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
              <DropdownMenuItem className="flex items-center gap-2">
                <BiCopy className="mt-0.5" />
                Make copy
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <AiOutlineDelete className="mt-0.5" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </NavLink>
  );
};
