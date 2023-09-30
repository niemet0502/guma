import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiOutlineCopy } from "react-icons/ai";
import { BiDotsHorizontalRounded, BiUserX } from "react-icons/bi";

export const ActionDropdown: React.FC<{
  isPublic?: boolean;
  children: React.ReactNode;
}> = ({ isPublic, children }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BiDotsHorizontalRounded />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
        {children}
        <DropdownMenuItem className="flex items-center gap-2">
          <AiOutlineCopy /> Copy the link
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isPublic}
          className="flex items-center gap-2"
        >
          <BiUserX />
          Leave the team
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
