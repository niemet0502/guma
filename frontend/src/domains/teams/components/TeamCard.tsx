import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/domains/auth/providers/auth";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GoIssueDraft } from "react-icons/go";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { NavLink, useParams } from "react-router-dom";
import { TeamApi, TeamVisibility } from "../type";

export const TeamCard: React.FC<{ team: TeamApi }> = ({ team }) => {
  let { orgaId } = useParams<{ orgaId: string }>();
  const { user } = useAuth();

  if (
    team.visibility === TeamVisibility.PRIVATE &&
    !(user?.id && team.members.some(({ user_id }) => user_id === +user?.id))
  ) {
    return null;
  }

  return (
    <div className="w-full border-b pb-1">
      <div className="px-4 flex items-center justify-between">
        <h5 className="my-2  text-base  font-semibold tracking-tight">
          {team.name}
        </h5>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <BiDotsHorizontalRounded />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Team settings</DropdownMenuItem>
            <DropdownMenuItem>Copy the link</DropdownMenuItem>
            <DropdownMenuItem>Leave the team</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-1 pl-4 pr-3">
        <NavLink
          to={`/${orgaId}/team/${team.name}/issues`}
          className={({ isActive, isPending }) =>
            isActive ? "active" : isPending ? "default" : "default"
          }
        >
          <GoIssueDraft className="text-base" />
          Issues
        </NavLink>
        <NavLink
          to={`/${orgaId}/team/${team.name}/documents`}
          className={({ isActive, isPending }) =>
            isActive ? "active" : isPending ? "default" : "default"
          }
        >
          <HiOutlineDocumentDuplicate className="text-base" />
          Documents
        </NavLink>

        <NavLink
          to={`/${orgaId}/team/${team.name}/sprints`}
          className={({ isActive, isPending }) =>
            isActive ? "active" : isPending ? "default" : "default"
          }
        >
          <AiOutlinePlayCircle />
          Sprints
        </NavLink>
      </div>
    </div>
  );
};
