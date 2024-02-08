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
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/domains/auth/providers/auth";
import { User } from "@/domains/auth/services/types";
import { useModules } from "@/domains/modules/hooks/useModules";
import { useGetLabels } from "@/domains/organization/hooks/useGetLabels";
import { useSprints } from "@/domains/sprints/hooks/useSprints";
import { TeamVisibility } from "@/domains/teams/type";
import { cn, transformDateToMonthDay } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import {
  AiOutlineDash,
  AiOutlinePlayCircle,
  AiOutlinePlus,
  AiOutlineUser,
} from "react-icons/ai";
import { GoProjectRoadmap } from "react-icons/go";
import { taskPriority } from "../../constantes";
import { useGetStatus } from "../../hooks/useGetStatus";
import { ActivityAction, TaskApi } from "../../type";
import { TaskStatusIcon } from "../TaskStatusIcon";

export const RightSidebar: React.FC<{
  task: TaskApi;
  users?: User[];
  handleUpdate: (data: any) => void;
}> = ({ task, users, handleUpdate }) => {
  const { project } = useAuth();

  const { data: labels } = useGetLabels(project?.id as number);
  const { data: status } = useGetStatus(task?.team_id as number);
  const { fetchSprints, data: sprints } = useSprints();
  const { fetchModules, data: modules } = useModules();

  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openLabel, setOpenLabel] = useState(false);
  const [openPriorityPopover, setOpenPriorityPopover] = useState(false);
  const [openSprint, setOpenSprint] = useState(false);
  const [openLivrable, setOpenLivrable] = useState(false);

  const members =
    task?.team?.visibility === TeamVisibility.PUBLIC
      ? users
      : task?.team?.members.map(({ user }) => user);

  useEffect(() => {
    fetchSprints(task.team_id);
    fetchModules(task.team_id);
  }, [task]);

  return (
    <div className="w-[320px] h-full flex flex-col gap-5 border-l px-4 py-8 text-muted-foreground">
      <div className="flex">
        <div className="w-[100px] flex items-center">Status</div>
        <div className="flex-1">
          <Popover open={openStatus} onOpenChange={setOpenStatus}>
            <PopoverTrigger>
              <div className="hover:cursor-pointer hover:bg-secondary p-2 rounded flex gap-2 items-center mr-10">
                <TaskStatusIcon status={task?.status?.name as string} />
                <span className="text-muted-foreground text-sm">
                  {task?.status?.name}
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] ">
              <Command>
                <CommandInput placeholder="Change status..." className="h-9" />
                <CommandEmpty>No status found.</CommandEmpty>
                <CommandGroup>
                  {status
                    ?.filter(({ state }) => state <= 25)
                    .map(({ id, name }) => (
                      <CommandItem
                        key={id}
                        onSelect={() => {
                          handleUpdate({
                            status_id: +id,
                            action: ActivityAction.CHANGED_STATUS,
                          });
                          setOpenStatus(false);
                        }}
                      >
                        <div className="w-full flex justify-between gap-2 items-center">
                          <TaskStatusIcon status={name} />
                          <span>{name}</span>

                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4 mt-0.5",
                              task?.status_id && task?.status_id === +id
                                ? "opacity-100"
                                : "opacity-0"
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
      <div className="flex">
        <div className="w-[100px] flex items-center">Priority</div>
        <div className="flex-1">
          <Popover
            open={openPriorityPopover}
            onOpenChange={setOpenPriorityPopover}
          >
            <PopoverTrigger>
              <div className="hover:cursor-pointer hover:bg-secondary p-2 rounded flex gap-2 items-center">
                <AiOutlineDash />
                {task?.priority ? (
                  <span>
                    {
                      taskPriority.find(({ value }) => value === task.priority)
                        ?.label
                    }
                  </span>
                ) : (
                  "No priority"
                )}
              </div>
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

                        handleUpdate({
                          priority: +value,
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
                            task?.priority === value
                              ? "opacity-100"
                              : "opacity-0"
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
        </div>
      </div>
      <div className="flex">
        <div className="w-[100px]  flex items-center">Assignee</div>
        <div className="flex-1 items-center mr-10">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="hover:cursor-pointer hover:bg-secondary p-2 rounded flex gap-2 items-center">
                <AiOutlineUser />
                {task?.assignee ? (
                  <span className="text-muted-foreground text-sm">
                    {task.assignee.username}
                  </span>
                ) : (
                  "Unassigned"
                )}
              </div>
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
                        handleUpdate({
                          assignee_to: +member.id,
                          action: ActivityAction.ASSIGNED,
                        });
                        setOpen(false);
                      }}
                    >
                      {member.username}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          task?.assignee_to === member.id
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
      </div>
      <div className="flex">
        <div className="w-[100px] ">Labels</div>
        <div className="flex flex-1 items-center flex-wrap gap-2 mr-10">
          {task?.labels.map(({ label, id }) => (
            <Badge variant="outline" key={id}>
              {label.name}
            </Badge>
          ))}
          <Popover open={openLabel} onOpenChange={setOpenLabel}>
            <PopoverTrigger asChild>
              <div className="hover:cursor-pointer hover:bg-secondary p-2 rounded flex gap-2 items-center text-sm">
                <AiOutlinePlus />
                Add label
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] p-0">
              <Command>
                <CommandInput placeholder="Search label..." className="h-9" />
                <CommandEmpty>No label found.</CommandEmpty>
                <CommandGroup>
                  {labels?.map(({ id, name }) => (
                    <CommandItem
                      value={id}
                      key={id}
                      onSelect={() => {
                        // if (field.value?.includes(+label.id)) {
                        //   field.value?.splice(
                        //     field.value?.indexOf(+label.id),
                        //     1
                        //   );

                        //   form.setValue(
                        //     "labels",
                        //     (field.value || []).filter(
                        //       (id) => id !== +label.id
                        //     )
                        //   );
                        // } else {
                        //   form.setValue("labels", [
                        //     ...(field.value || []),
                        //     +label.id,
                        //   ]);
                        // }

                        setOpen(false);
                      }}
                    >
                      {name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          (task?.labels || []).some(
                            ({ label }) => +label.id === +id
                          )
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
      </div>
      <div className="flex">
        <div className="w-[100px] flex items-center">Author</div>
        <div className="flex-1">
          <div className="hover:cursor-pointer hover:bg-secondary p-2 rounded flex gap-2 items-center mr-10">
            <AiOutlineUser />
            <span className="text-muted-foreground text-sm">
              {task?.assignee?.username}
            </span>
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex">
        <div className="w-[100px] flex items-center">Sprint</div>
        <div className="flex-1">
          <Popover open={openSprint} onOpenChange={setOpenSprint}>
            <PopoverTrigger>
              <div className="hover:cursor-pointer hover:bg-secondary p-2 rounded flex gap-2 items-center">
                {!task?.sprint_id && (
                  <>
                    <AiOutlinePlus />
                    Add to sprint
                  </>
                )}

                {task?.sprint_id && (
                  <>
                    <AiOutlinePlayCircle />
                    {sprints?.find(({ id }) => id === task.sprint_id)?.name}
                  </>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Add to sprint..." className="h-9" />
                <CommandEmpty>No sprint found.</CommandEmpty>
                <CommandGroup className="flex flex-col gap-2">
                  <CommandItem>
                    No sprint
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        !task?.sprint_id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                </CommandGroup>
                <Separator />
                <CommandGroup className="flex flex-col gap-2">
                  {sprints
                    ?.filter(({ end_at }) => new Date(end_at) > new Date())
                    .map((sprint) => (
                      <CommandItem
                        key={sprint.id}
                        onSelect={() => {
                          handleUpdate({
                            sprint_id: sprint.id,
                            action: ActivityAction.ADDED_SPRINT,
                          });
                          setOpenSprint(false);
                        }}
                      >
                        <div className="flex gap-2 items-center">
                          <span>{sprint.name}</span>
                          <span className="text-muted-foreground text-xs mt-0.5">
                            {transformDateToMonthDay(sprint.start_at)}{" "}
                            {transformDateToMonthDay(sprint.end_at)}
                          </span>
                        </div>
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            task?.sprint_id === sprint.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                </CommandGroup>
                <Separator />
                <CommandGroup>
                  {sprints
                    ?.filter(({ end_at }) => !(new Date(end_at) > new Date()))
                    .map((sprint) => (
                      <CommandItem
                        key={sprint.id}
                        onSelect={() => {
                          handleUpdate({
                            sprint_id: sprint.id,
                            action: ActivityAction.ADDED_SPRINT,
                          });
                          setOpenSprint(false);
                        }}
                      >
                        <div className="flex gap-2 items-center">
                          <span>{sprint.name}</span>
                          <span className="text-muted-foreground text-xs mt-0.5">
                            {transformDateToMonthDay(sprint.start_at)}
                            {transformDateToMonthDay(sprint.end_at)}
                          </span>
                        </div>
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            task?.sprint_id === sprint.id
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
      </div>

      <div className="flex">
        <div className="w-[100px] flex items-center">Livrable</div>
        <div className="flex-1">
          <Popover open={openLivrable} onOpenChange={setOpenLivrable}>
            <PopoverTrigger>
              <div className="hover:cursor-pointer hover:bg-secondary p-2 rounded flex gap-2 items-center">
                {!task?.livrable_id && (
                  <>
                    <AiOutlinePlus />
                    Add to livrable
                  </>
                )}

                {task?.livrable_id && (
                  <>
                    <GoProjectRoadmap />
                    {task.livrable?.name}
                  </>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Add to sprint..." className="h-9" />
                <CommandEmpty>No livrable found.</CommandEmpty>
                <CommandGroup className="flex flex-col gap-2">
                  <CommandItem
                    onSelect={() => {
                      handleUpdate({
                        livrable_id: undefined,
                        action: ActivityAction.ADDED_PROJECT,
                      });
                      setOpenLivrable(false);
                    }}
                  >
                    No livrable
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        !task?.livrable_id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                </CommandGroup>
                <Separator />
                <CommandGroup>
                  {modules?.map((module) => (
                    <CommandItem
                      key={module.id}
                      onSelect={() => {
                        handleUpdate({
                          livrable_id: +module.id,
                          action: ActivityAction.ADDED_PROJECT,
                        });
                        setOpenLivrable(false);
                      }}
                    >
                      <div className="flex gap-2 items-center">
                        <span>{module.name}</span>
                      </div>
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          task?.livrable_id === +module.id
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
      </div>
    </div>
  );
};
