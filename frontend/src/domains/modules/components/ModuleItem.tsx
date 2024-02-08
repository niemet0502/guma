import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Avatar } from "@radix-ui/react-avatar";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { GoProjectRoadmap } from "react-icons/go";
import { NavLink, useParams } from "react-router-dom";
import { LivrableApi, LivrableStatusEnum } from "../type";
import { ModuleStatusIcon } from "./ModuleStatusIcon";
import { ModuleUpdateIcon } from "./ModuleUpdateIcon";
import { UpdatesList } from "./UpdatesList";

const status = [
  LivrableStatusEnum.Planned,
  LivrableStatusEnum.InProgress,
  LivrableStatusEnum.Pause,
  LivrableStatusEnum.Completed,
];

export const statusLabel = ["Planned", "In Progress", "Paused", "Completed"];

export const ModuleItem: React.FC<{ module: LivrableApi }> = ({ module }) => {
  const { orgaId } = useParams<{ orgaId: string }>();
  const [open, setOpen] = useState(false);
  const completedTasksCount = module.tasks.filter(
    ({ status }) => status.state >= 25 && status.state <= 30
  ).length;
  return (
    <div className="w-full px-5 py-3 flex justify-between border-b hover:bg-slate-50 hover:cursor-pointer">
      <NavLink
        to={`/${orgaId}/team/${module.team?.name.toLowerCase()}/modules/${
          module.id
        }`}
      >
        <div className="flex items-center gap-2">
          <GoProjectRoadmap className="mt-1" />
          <span className="font-medium">{module.name}</span>
        </div>
      </NavLink>
      <div className="flex items-center gap-2">
        {module.updates && module.updates.length > 0 && (
          <UpdatesList updates={module.updates}>
            <ModuleUpdateIcon
              status={module.updates[0].status}
              showStatusLabel={false}
            />
          </UpdatesList>
        )}
        {((completedTasksCount / module.tasks.length) * 100) | 0}%
        <Avatar className="h-6 w-6 bg-transparent flex rounded-full border-2 items-center  justify-center ">
          <span className="text-muted-foreground  text-[9px]">
            {module.author?.username?.slice(0, 2).toUpperCase()}
          </span>
        </Avatar>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            <div className="hover:cursor-pointer rounded flex gap-2 items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <ModuleStatusIcon status={module.status} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{statusLabel[module.status]}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[160px] p-0 ">
            <Command>
              <CommandInput placeholder="Set status..." className="h-9" />
              <CommandEmpty>No member found.</CommandEmpty>
              <CommandGroup>
                {status.map((value) => (
                  <CommandItem
                    key={value}
                    // onSelect={(currentValue) => {
                    //   const value = currentValue[currentValue.length - 1];

                    //   handleUpdate({
                    //     priority: +value,
                    //     action: ActivityAction.SET_PRIORITY,
                    //   });
                    //   setOpen(false);
                    // }}
                  >
                    <div className="w-full flex justify-between">
                      <div className="flex gap-1">
                        <ModuleStatusIcon status={value} />
                        <span className="text-muted-foreground">
                          {statusLabel[value]}
                        </span>
                      </div>

                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4 mt-0.5",
                          module.status === value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
