import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { SprintApi } from "@/domains/tasks/type";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateSprint } from "../hooks/useCreateSprint";
import { useUpdateSprint } from "../hooks/useUpdateSprint";
import { SprintStatusEnum } from "../type";

const formSchema = z.object({
  name: z.string().min(4).max(50),
  start_at: z.date(),
  end_at: z.date(),
  goal: z.string().optional(),
});

export const CreateSprintForm: React.FC<{
  teamId?: number;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  sprintToEdit?: SprintApi;
}> = ({ onOpenChange, teamId, sprintToEdit }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: sprintToEdit
      ? {
          ...sprintToEdit,
          start_at: new Date(sprintToEdit.start_at),
          end_at: new Date(sprintToEdit.end_at),
        }
      : {
          start_at: new Date(),
          end_at: addDays(new Date(), 7),
          name: "",
          goal: "",
        },
  });

  const [open, setOpen] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const onSuccess = () => {
    toast({
      title: "Success !",
      description: `Sprint successfully ${
        sprintToEdit ? "updated" : "created"
      }`,
    });
    onOpenChange(false);
  };
  const { createSprint, error } = useCreateSprint(onSuccess);
  const { updateSprint } = useUpdateSprint();

  const startAt = form.watch("start_at");

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    sprintToEdit
      ? updateSprint({ id: sprintToEdit.id, ...data })
      : createSprint({ ...data, team_id: teamId && +teamId });
  };

  const isDisabled =
    sprintToEdit && sprintToEdit.status === SprintStatusEnum.Done;
  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input placeholder="Sprint name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="start_at"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full ">
                <FormLabel>Date de début</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={isDisabled}
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
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(currentValue) => {
                        field.onChange(currentValue);
                        setOpen(false);
                      }}
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
            name="end_at"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full ">
                <FormLabel>Date de fin</FormLabel>
                <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={isDisabled}
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
                          "end_at",
                          addDays(new Date(startAt), parseInt(value))
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
                      disabled={(date) => date < new Date(startAt)}
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
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objectif</FormLabel>
                <FormControl>
                  <Textarea
                    // placeholder="Sprint goal"
                    className="resize-none h-[120px]"
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
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit">{sprintToEdit ? "Save" : "Valider"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
