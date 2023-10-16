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
import { NavLink, useParams } from "react-router-dom";
import { taskPriority } from "../constantes";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { TaskStatusIcon } from "./TaskStatusIcon";

export const TaskItem: React.FC<{ task: TaskApi; members?: User[] }> = ({
  task,
  members,
}) => {
  const { orgaId, teamId } = useParams<{ orgaId: string; teamId: string }>();
  const { updateTask } = useUpdateTask();
  const [open, setOpen] = useState(false);
  const [openPriorityPopover, setOpenPriorityPopover] = useState(false);

  return (
    <NavLink to={`/${orgaId}/team/${teamId}/issues/${task.slug}`}>
      <div className="py-3 px-5 border-b flex gap-2 items-center">
        <Popover
          open={openPriorityPopover}
          onOpenChange={setOpenPriorityPopover}
        >
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

                      updateTask({ priority: +value, id: +task.id });
                      setOpenPriorityPopover(false);
                    }}
                  >
                    <div className="w-full flex justify-between">
                      <span>{label}</span>

                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4 mt-0.5",
                          task.priority === value ? "opacity-100" : "opacity-0"
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
        <TaskStatusIcon status={task?.status?.name as string} />
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
                      updateTask({ id: +task.id, assignee_to: +member.id });
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
    </NavLink>
  );
};
