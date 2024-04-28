import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateModule } from "../hooks/useCreateModule";

const formSchema = z.object({
  name: z.string().min(4).max(50),
  start_at: z.date(),
  end_at: z.date(),
  team_id: z.string(),
  status: z.number().optional(),
  description: z.string().optional(),
});
export const CreateModuleDialog: React.FC<{
  teamId?: number;
  teamsData?: { id: number; name: string }[];
  children: React.ReactNode;
}> = ({ teamId, teamsData, children }) => {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const onSuccess = () => {
    toast({
      title: "Success !",
      description: `Module successfully created`,
    });
    setOpen(false);
  };

  const { createLivrable } = useCreateModule(onSuccess);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { team_id: teamId?.toString() },
  });

  const startAt = form.watch("start_at");

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createLivrable({ ...data, team_id: +data.team_id });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-[45%] lg:w-[800px] sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create a new module</DialogTitle>
        </DialogHeader>
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
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Module name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {teamsData && (
                <FormField
                  control={form.control}
                  name="team_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a team" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teamsData?.map(({ id, name }) => (
                            <SelectItem value={`${id}`} key={id}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="start_at"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full ">
                    <FormLabel>Start date</FormLabel>
                    <Popover
                      open={openStartDate}
                      onOpenChange={setOpenStartDate}
                    >
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
                    <FormLabel>End date</FormLabel>
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Module description"
                        className="resize-none h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* {error && <div className="text-red-600">{error.message}</div>} */}
              <div className="flex gap-2 items-center justify-end">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {/* {sprintToEdit ? "Save" : "Create"} */}
                  Create module
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
