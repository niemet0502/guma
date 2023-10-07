import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, transformDateToMonthDay } from "@/lib/utils";
import * as React from "react";
import { useState } from "react";
import { AiOutlineDash, AiOutlineUser } from "react-icons/ai";
import { TaskApi } from "../type";

import { Badge } from "@/components/ui/badge";
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
import { CheckIcon } from "@radix-ui/react-icons";
import { taskPriority } from "../constantes";

export const TaskItem: React.FC<{ task: TaskApi; members?: User[] }> = ({
  task,
  members,
}) => {
  const [open, setOpen] = useState(false);
  const [openPriorityPopover, setOpenPriorityPopover] = useState(false);

  const [value, setValue] = useState(
    task.assignee ? task.assignee.username : ""
  );

  const [priority, setPriority] = useState<number | null>(task.priority);

  return (
    // <NavLink to="/">
    <div className="py-3 px-5 border-b flex gap-2 items-center">
      <Popover open={openPriorityPopover} onOpenChange={setOpenPriorityPopover}>
        <PopoverTrigger>
          <AiOutlineDash className="text-muted-foreground hover:cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent className="w-[150px] p-0 ">
          <Command>
            <CommandInput placeholder="Set priority..." className="h-9" />
            <CommandEmpty>No member found.</CommandEmpty>
            <CommandGroup>
              {taskPriority.map(({ label, value }) => (
                <CommandItem
                  key={value}
                  onSelect={(currentValue) => {
                    const value = currentValue[currentValue.length - 1];

                    setPriority(+value === priority ? null : +value);
                    setOpenPriorityPopover(false);
                  }}
                >
                  <div className="w-full flex justify-between">
                    <span>{label}</span>

                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4 mt-0.5",
                        priority === value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <span className="text-muted-foreground">{task.identifier}</span>
      <span className="flex-1">{task.name}</span>

      {task.labels.map(({ label, id }) => (
        <Badge variant="outline" key={id}>
          {label.name}
        </Badge>
      ))}
      <span>{transformDateToMonthDay(task.created_at)}.</span>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Avatar className="h-7 w-7 bg-transparent hover:cursor-pointer">
            {/* <AvatarImage src="/avatars/01.png" alt="@shadcn" /> */}
            <AvatarFallback className="bg-transparent border-2 ">
              <AiOutlineUser />
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-[180px] p-0 mr-7">
          <Command>
            <CommandInput placeholder="Assignee to..." className="h-9" />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {members?.map((member) => (
                <CommandItem
                  key={member.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {member.username}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === member.username ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
    // </NavLink>
  );
};
