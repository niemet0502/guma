import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { taskPriority } from "@/domains/tasks/constantes";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { AiOutlineDash, AiOutlineUser } from "react-icons/ai";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { ActivityAction, TaskApi } from "../type";

export const TaskCard: React.FC<{ task: TaskApi }> = ({ task }) => {
  const [openPriorityPopover, setOpenPriorityPopover] = useState(false);
  const { updateTask } = useUpdateTask();

  return (
    <div className="border shadow-lg rounded-sm h-[116px] hover:cursor-pointer p-3 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{task.identifier}</span>
        <Avatar className="h-7 w-7 bg-transparent hover:cursor-pointer">
          {/* <AvatarImage src="/avatars/01.png" alt="@shadcn" /> */}
          <AvatarFallback className="bg-transparent border-2 border-gray-700">
            {task.assignee ? (
              <span className="text-muted-foreground text-sm">
                {task.assignee.username.slice(0, 2).toUpperCase()}
              </span>
            ) : (
              <AiOutlineUser />
            )}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="text-ellipsis overflow-hidden ...">{task.name}</div>
      <div className="flex items-center gap-2 overflow-hidden">
        <Popover
          open={openPriorityPopover}
          onOpenChange={setOpenPriorityPopover}
        >
          <PopoverTrigger>
            <Button
              size="sm"
              className="px-1 py-2 h-3 hover:cursor-pointer"
              variant="outline"
            >
              {task.priority ? (
                taskPriority.find(({ value }) => value === task.priority)?.label
              ) : (
                <AiOutlineDash className="text-muted-foreground " />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[150px]  p-0">
            <Command>
              <CommandInput placeholder="Set priority..." className="h-9" />
              <CommandEmpty>No member found.</CommandEmpty>
              <CommandGroup>
                {taskPriority.map(({ label, value }) => (
                  <CommandItem
                    key={value}
                    onSelect={(currentValue) => {
                      const value = currentValue[currentValue.length - 1];

                      updateTask({
                        priority: +value,
                        id: +task.id,
                        action: ActivityAction.SET_PRIORITY,
                      });
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

        {task.labels.map(({ label, id }) => (
          <Badge variant="outline" key={id}>
            {label.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};
