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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/domains/auth/providers/auth";
import { User } from "@/domains/auth/services/types";
import { useGetLabels } from "@/domains/organization/hooks/useGetLabels";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDash, AiOutlineUser } from "react-icons/ai";
import { MdLabelOutline } from "react-icons/md";
import * as z from "zod";
import { taskPriority } from "../constantes";
import { useCreateTask } from "../hooks/useCreateTask";

export const formSchema = z.object({
  name: z.string().min(4),
  priority: z.number().optional(),
  labels: z.number().array().optional(),
  assignee_to: z.number().optional(),
  description: z
    .string()
    .min(5, {
      message: "Descripton must be at least 10 characters.",
    })
    .max(460, {
      message: "Descripton must not be longer than 30 characters.",
    })
    .optional(),
});

export const CreateTaskForm: React.FC<{
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  members?: User[];
  teamId?: number;
}> = ({ onOpenChange, members, teamId }) => {
  const { project } = useAuth();
  const { data: labels } = useGetLabels(project?.id as number, teamId);
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);
  const [openAssignee, setOpenAssignee] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSuccess = () => {
    toast({
      title: "Success !",
      description: "Task successfully created",
    });
    onOpenChange(false);
  };

  const { createTask, error } = useCreateTask(onSuccess);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createTask({ ...data, team_id: teamId && +teamId });
  };

  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form
          className="flex flex-col gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Issue title" {...field} />
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add description"
                    className="resize-none h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <div className="text-red-600">{error.message}</div>}

          <div className="mt-3 flex gap-2">
            <FormField
              control={form.control}
              name="labels"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
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

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover open={openPriority} onOpenChange={setOpenPriority}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
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
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create issue</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
