import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar } from "@/components/ui/avatar";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/domains/auth/providers/auth";
import { useGetLabels } from "@/domains/organization/hooks/useGetLabels";
import { useSprints } from "@/domains/sprints/hooks/useSprints";
import { TeamVisibility } from "@/domains/teams/type";
import { useGetUsers } from "@/domains/users/hooks/useGetUsers";
import { cn, transformDateToMonthDay } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  AiOutlineDash,
  AiOutlinePlayCircle,
  AiOutlinePlus,
  AiOutlineUser,
} from "react-icons/ai";
import { useParams } from "react-router-dom";
import { ActivityItem } from "../components/ActivityItem";
import { Comment } from "../components/Comment";
import { SubTaskItem } from "../components/SubTaskItem";
import { TaskStatusIcon } from "../components/TaskStatusIcon";
import { taskPriority } from "../constantes";
import { useGetStatus } from "../hooks/useGetStatus";
import { useGetTask } from "../hooks/useGetTask";

export const TaskDetails: React.FC = () => {
  const { organization, user } = useAuth();
  const { issueId } = useParams<{ issueId: string }>();

  const { data: users } = useGetUsers(organization?.id as number);
  const { data: task } = useGetTask(issueId as string);
  const { data: labels } = useGetLabels(organization?.id as number);
  const { data: status } = useGetStatus(task?.team_id as number);
  const { data: sprints } = useSprints();

  const [open, setOpen] = useState(false);
  const [openLabel, setOpenLabel] = useState(false);
  const [openPriorityPopover, setOpenPriorityPopover] = useState(false);

  const members =
    task?.team?.visibility === TeamVisibility.PUBLIC
      ? users
      : task?.team?.members.map(({ user }) => user);

  return (
    <div className="h-full border-t overflow-hidden">
      {/* <div className="bg-secondary py-3 px-5 flex items-center gap-1">
        <span>Backlog</span>
        <SlArrowRight className="mt-1 text-xs" />
        <span>{task?.identifier}</span>
      </div> */}

      <div className="h-full w-full flex">
        <div className="flex flex-1 flex-col px-8 py-6 items-center overflow-auto">
          <div className="w-full max-w-[1000px]">
            <div className="w-full">
              <Textarea
                value={task?.name}
                className="border-none font-bold text-xl resize-none"
              />
            </div>

            <div className="w-full">
              <Textarea
                className="h-[100px] border-none resize-none"
                placeholder="Add description "
              />
            </div>

            <div className="px-3">
              <Accordion
                type="single"
                collapsible
                className="w-full border-0 mb-2"
                defaultValue="item-1"
              >
                <AccordionItem value="item-1" className="border-0">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col w-full">
                      <h6 className="text-left">Sub-tasks</h6>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {task?.subtasks.map((task) => (
                      <SubTaskItem
                        task={task}
                        key={task.id}
                        members={members}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="w-full px-3">
              <h5 className="mb-4">Activities</h5>
              {task?.activities.map((activity) => (
                <ActivityItem activity={activity} />
              ))}
            </div>
            <div className="w-full px-3 pt-4 flex flex-col gap-3 mb-12">
              <h5>Comments</h5>

              {task?.comments.map((comment) => (
                <Comment comment={comment} />
              ))}

              <div className="w-full flex gap-4">
                <Avatar className="h-6 w-6 bg-transparent border-2 items-center justify-center mt-0.5">
                  <span className="text-muted-foreground text-[9px]">
                    {user?.username?.slice(0, 2).toUpperCase()}
                  </span>
                </Avatar>
                <div className="flex flex-1 border rounded flex-col">
                  <Textarea
                    className="resize-none border-none"
                    placeholder="Leave a comment"
                  />

                  <Button className="self-end m-2" size="sm">
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[320px] h-full flex flex-col gap-5 border-l px-4 py-8 text-muted-foreground">
          <div className="flex">
            <div className="w-[100px] flex items-center">Status</div>
            <div className="flex-1">
              <Popover>
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
                    <CommandInput
                      placeholder="Change status..."
                      className="h-9"
                    />
                    <CommandEmpty>No status found.</CommandEmpty>
                    <CommandGroup>
                      {status?.map(({ id, name }) => (
                        <CommandItem key={id}>
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
                          taskPriority.find(
                            ({ value }) => value === task.priority
                          )?.label
                        }
                      </span>
                    ) : (
                      "No priority"
                    )}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[150px] p-0 ">
                  <Command>
                    <CommandInput
                      placeholder="Set priority..."
                      className="h-9"
                    />
                    <CommandEmpty>No member found.</CommandEmpty>
                    <CommandGroup>
                      {taskPriority.map(({ label, value }) => (
                        <CommandItem
                          key={value}
                          onSelect={(currentValue) => {
                            const value = currentValue[currentValue.length - 1];

                            // updateTask({ priority: +value, id: +task.id });
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
                            <span className="text-muted-foreground">
                              {value}
                            </span>
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
                    <CommandInput
                      placeholder="Assignee to..."
                      className="h-9"
                    />
                    <CommandEmpty>No user found.</CommandEmpty>
                    <CommandGroup>
                      {members?.map((member) => (
                        <CommandItem
                          key={member.id}
                          onSelect={() => {
                            // updateTask({ id: +task.id, assignee_to: +member.id });
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
                    <CommandInput
                      placeholder="Search label..."
                      className="h-9"
                    />
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
              <Popover>
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
                    <CommandInput
                      placeholder="Add to sprint..."
                      className="h-9"
                    />
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
                          <CommandItem key={sprint.id}>
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
                        ?.filter(
                          ({ end_at }) => !(new Date(end_at) > new Date())
                        )
                        .map((sprint) => (
                          <CommandItem key={sprint.id}>
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
        </div>
      </div>
    </div>
  );
};
