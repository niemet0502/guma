import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/domains/auth/providers/auth";
import { useGetLabels } from "@/domains/organization/hooks/useGetLabels";
import { TeamVisibility } from "@/domains/teams/type";
import { useGetUsers } from "@/domains/users/hooks/useGetUsers";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDash, AiOutlineUser } from "react-icons/ai";
import { MdLabelOutline } from "react-icons/md";
import { z } from "zod";
import { taskPriority } from "../constantes";
import { useCreateTask } from "../hooks/useCreateTask";
import { TaskApi } from "../type";
import { formSchema } from "./CreateForm";

export const CreateSubTask: React.FC<{
  isOpen: boolean;
  hide: () => void;
  task: TaskApi;
}> = ({ hide, isOpen, task }) => {
  const { organization } = useAuth();
  const { data: labels } = useGetLabels(organization?.id as number);
  const { data: users } = useGetUsers(organization?.id as number);

  const [open, setOpen] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);
  const [openAssignee, setOpenAssignee] = useState(false);

  const members =
    task?.team?.visibility === TeamVisibility.PUBLIC
      ? users
      : task?.team?.members.map(({ user }) => user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { createTask, error } = useCreateTask(() => {
    form.reset({
      name: "",
      description: "",
      priority: undefined,
      assignee_to: undefined,
      labels: undefined,
    });
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createTask({ ...data, team_id: task.team_id, parent_task_id: +task.id });
  };
  return (
    <div
      className={`w-full shadow-md border px-3 py-2 rounded mt-2 ${
        isOpen ? "animate-accordion-down" : "animate-accordion-up"
      }`}
    >
      <Form {...form}>
        <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Issue title"
                    {...field}
                    className="border-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Add description"
                    className="resize-none border-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <div className="text-red-600">{error.message}</div>}

          <div className="w-full flex px-3 justify-between py-2">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover open={openPriority} onOpenChange={setOpenPriority}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex gap-2 items-center"
                          >
                            <AiOutlineDash className="text-muted-foreground hover:cursor-pointer" />
                            {field.value
                              ? taskPriority.find(
                                  ({ value }) => value === field.value
                                )?.label
                              : "Priority"}
                          </Button>
                        </FormControl>
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
                                value={label}
                                key={value}
                                onSelect={() => {
                                  form.setValue("priority", value);
                                  setOpenPriority(false);
                                }}
                              >
                                <div className="w-full flex justify-between">
                                  <span>{label}</span>

                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4 mt-0.5",
                                      value === field.value
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
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assignee_to"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover open={openAssignee} onOpenChange={setOpenAssignee}>
                      <PopoverTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex gap-2 items-center"
                        >
                          <AiOutlineUser />
                          {field.value
                            ? members?.find(({ id }) => +id === field.value)
                                ?.username
                            : "Assignee"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[180px] p-0 mr-7">
                        <Command>
                          <CommandInput
                            placeholder="Assignee to..."
                            className="h-9"
                          />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {members?.map((member) => (
                              <CommandItem
                                key={member.id}
                                onSelect={() => {
                                  form.setValue("assignee_to", +member.id);
                                  setOpenAssignee(false);
                                }}
                              >
                                {member.username}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    +member.id === field.value
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
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="labels"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-2"
                            role="combobox"
                          >
                            <MdLabelOutline />
                            Label
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[150px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search label..."
                            className="h-9"
                          />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {labels?.map((label) => (
                              <CommandItem
                                value={label.id}
                                key={label.id}
                                onSelect={() => {
                                  if (field.value?.includes(+label.id)) {
                                    field.value?.splice(
                                      field.value?.indexOf(+label.id),
                                      1
                                    );

                                    form.setValue(
                                      "labels",
                                      (field.value || []).filter(
                                        (id) => id !== +label.id
                                      )
                                    );
                                  } else {
                                    form.setValue("labels", [
                                      ...(field.value || []),
                                      +label.id,
                                    ]);
                                  }

                                  setOpen(false);
                                }}
                              >
                                {label.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    (field.value || []).some(
                                      (id) => id === +label.id
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
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={hide}>
                Cancel
              </Button>
              <Button size="sm" type="submit">
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
