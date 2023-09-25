import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GoIssueDraft } from "react-icons/go";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { TeamApi } from "../type";

export const TeamCard: React.FC<{ team: TeamApi }> = ({ team }) => {
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
        <Button variant="ghost" className="w-full gap-2 justify-start">
          <GoIssueDraft className="text-base" />
          Issues
        </Button>
        <Button variant="ghost" className="w-full gap-2 justify-start">
          <HiOutlineDocumentDuplicate className="text-base" />
          Documents
        </Button>
        <Button variant="ghost" className="w-full gap-2 justify-start">
          <AiOutlinePlayCircle />
          Sprints
        </Button>
      </div>
    </div>
  );
};
