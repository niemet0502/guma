import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/domains/auth/providers/auth";
import { User } from "@/domains/auth/services/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CheckIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateReminder } from "../../hooks/useCreateReminder";
import { useGetStatus } from "../../hooks/useGetStatus";
import { useUpdateReminder } from "../../hooks/useUpdateReminder";
import { ReminderApi } from "../../type";
import { TaskStatusIcon } from "../TaskStatusIcon";

const formSchema = z.object({
  title: z.string().min(4).max(50),
  send_at: z.date(),
  message: z.string().optional(),
  status_id: z.union([z.string(), z.number()]).optional(),
  visibility: z.boolean().default(false).optional(),
  receivers: z.number().array(),
});

export const AddReminderDialog: React.FC<{
  taskId: number;
  children: React.ReactElement;
  reminderToEdit?: ReminderApi;
  members: User[] | undefined;
  teamId: number;
}> = ({ taskId, children, reminderToEdit, members, teamId }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { data: status } = useGetStatus(+teamId);

  const [openStatus, setOpenStatus] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAssignee, setOpenAssignee] = useState(false);
  const [desiredStatus, setDesiredStatus] = useState(false);

  const onSuccess = () => {
    toast({
      title: "Success !",
      description: `Your reminder has been ${
        reminderToEdit ? "edited" : "set"
      }`,
    });
    setOpen(false);
  };

  const { setReminder, error, reset } = useCreateReminder(onSuccess);
  const { updateReminder } = useUpdateReminder(onSuccess);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: reminderToEdit
      ? {
          ...reminderToEdit,
          send_at: new Date(reminderToEdit.send_at),
          receivers: reminderToEdit.receivers?.map(({ user_id }) => user_id),
        }
      : { receivers: [+user!.id] },
  });

  useEffect(() => {
    reset();
  }, [reset]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);

    reminderToEdit
      ? updateReminder({
          ...data,
          task_id: +taskId,
          id: +reminderToEdit.id,
          status_id: data.status_id ? +data.status_id : undefined,
        })
      : setReminder({
          ...data,
          task_id: +taskId,
          status_id: data.status_id ? +data.status_id : undefined,
        });
  };
  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-[530px] top-[45%]">
        <DialogHeader>
          <DialogTitle>
            {reminderToEdit ? "Modifier le rappel" : "Nouveau rappel"}
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-auto">
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tache importante en retard"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="send_at"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full ">
                    <FormLabel>Me rappeler le</FormLabel>
                    <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Select
                          onValueChange={(value) => {
                            form.setValue(
                              "send_at",
                              addDays(new Date(), parseInt(value))
                            );
                            setOpenEndDate(false);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="7">In a week</SelectItem>
                            <SelectItem value="14">In two weeks</SelectItem>
                          </SelectContent>
                        </Select>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(currentValue) => {
                            field.onChange(currentValue);
                            setOpenEndDate(false);
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="receivers"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <FormLabel>Envoyer a : </FormLabel>
                      <Popover
                        open={openAssignee}
                        onOpenChange={setOpenAssignee}
                      >
                        <PopoverTrigger asChild className="flex-1">
                          <div className="flex gap-2 items-center border-none flex-1">
                            {members
                              ?.filter((member) =>
                                field.value?.includes(+member.id)
                              )
                              .map((member) => (
                                <Badge key={member.id}>{member.username}</Badge>
                              ))}
                          </div>
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
                                    if (field.value?.includes(+member.id)) {
                                      field.value?.splice(
                                        field.value?.indexOf(+member.id),
                                        1
                                      );

                                      form.setValue(
                                        "receivers",
                                        (field.value || []).filter(
                                          (id) => id !== +member.id
                                        )
                                      );
                                    } else {
                                      form.setValue("receivers", [
                                        ...(field.value || []),
                                        +member.id,
                                      ]);
                                    }
                                    setOpenAssignee(false);
                                  }}
                                >
                                  {member.username}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      (field.value || []).some(
                                        (id) => id === +member.id
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
                  </FormItem>
                )}
              />

              <div className="flex items-center border p-3 rounded">
                <div className="space-y-0.5 flex-1">
                  <FormLabel>Definir un statut</FormLabel>
                  <FormDescription>
                    La notification sera envoyée si le statut n'est pas atteint
                    a la date renseignée.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={desiredStatus}
                    onCheckedChange={setDesiredStatus}
                  />
                </FormControl>
              </div>

              {desiredStatus && (
                <FormField
                  control={form.control}
                  name="status_id"
                  rules={{ required: desiredStatus }}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <div className="flex items-center gap-2  p-2 rounded">
                        <FormLabel>Statut</FormLabel>
                        <Popover open={openStatus} onOpenChange={setOpenStatus}>
                          <PopoverTrigger>
                            <div className="hover:cursor-pointer hover:bg-secondary p-2 rounded flex gap-2 items-center mr-10 border">
                              {field.value && status ? (
                                <>
                                  <TaskStatusIcon
                                    status={
                                      status?.find(
                                        ({ id }) => id === field.value
                                      )?.name as string
                                    }
                                  />
                                  <span className="text-muted-foreground text-sm">
                                    {
                                      status?.find(
                                        ({ id }) => id === field.value
                                      )?.name
                                    }
                                  </span>
                                </>
                              ) : (
                                "+ set status"
                              )}
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
                                {status
                                  ?.filter(({ state }) => state <= 25)
                                  .map(({ id, name }) => (
                                    <CommandItem
                                      key={id}
                                      onSelect={() => {
                                        form.setValue("status_id", id);
                                        setOpenStatus(false);
                                      }}
                                    >
                                      <div className="w-full flex justify-between gap-2 items-center">
                                        <TaskStatusIcon status={name} />
                                        <span>{name}</span>

                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4 mt-0.5",
                                            field.value && +field.value === +id
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
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="The message you want to receive"
                        className="resize-none h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && <div className="text-red-600">{error.message}</div>}

              <div className="flex gap-2 items-center justify-end">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit">Apply</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
