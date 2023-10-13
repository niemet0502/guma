import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { User } from "@/domains/auth/services/types";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { TaskApi } from "../type";

export const SubTaskItem: React.FC<{ task: TaskApi; members?: User[] }> = ({
  task,
  members,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-1 gap-2 flex items-center text-sm">
      <span className="text-muted-foreground">{task.identifier}</span>
      <span className="flex-1">{task.name}</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Avatar className="h-7 w-7 bg-transparent hover:cursor-pointer">
            {/* <AvatarImage src="/avatars/01.png" alt="@shadcn" /> */}
            <AvatarFallback className="bg-transparent border-2 ">
              {task.assignee ? (
                <span className="text-muted-foreground text-sm">
                  {task.assignee.username.slice(0, 2).toUpperCase()}
                </span>
              ) : (
                <AiOutlineUser />
              )}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-[180px] p-0 mr-7">
          <Command>
            <CommandInput placeholder="Assignee to..." className="h-9" />
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {members?.map((member) => (
                <CommandItem
                  key={member.id}
                  onSelect={() => {
                    //   updateTask({ id: +task.id, assignee_to: +member.id });
                    setOpen(false);
                  }}
                >
                  {member.username}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      task.assignee_to === member.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
