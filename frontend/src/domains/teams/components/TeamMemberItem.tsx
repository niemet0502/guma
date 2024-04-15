import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "@/domains/auth/services/types";
import { Avatar } from "@radix-ui/react-avatar";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useRemoveTeamMember } from "../hooks/useRemoveTeamMember";

export const TeamMemberItem: React.FC<{ user: User; memberId: number }> = ({
  user,
  memberId,
}) => {
  const { removeTeamMember } = useRemoveTeamMember();

  const onDelete = () => {
    removeTeamMember({ variables: { id: memberId } });
  };
  return (
    <div className="py-3 border-b flex gap-3 items-center">
      <Avatar className="h-7 w-7 bg-transparent flex rounded-full border-2 items-center  justify-center mt-0.5">
        <span className="text-muted-foreground  text-[9px]">
          {user?.username?.slice(0, 2).toUpperCase()}
        </span>
      </Avatar>
      <div className="flex-1">
        <span className="font-medium">{user.username}</span> <br />
        <span>{user.email}</span>
      </div>
      <div className="flex-1">{user.profile?.name}</div>
      <div className="flex justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" onClick={onDelete}>
                <IoCloseCircleOutline />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove member</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
