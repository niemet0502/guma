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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateReminder } from "../../hooks/useCreateReminder";

const formSchema = z.object({
  title: z.string().min(4).max(50),
  send_at: z.date(),
  message: z.string().optional(),
});

export const AddReminderDialog: React.FC<{
  taskId: number;
  children: React.ReactElement;
}> = ({ taskId, children }) => {
  const { toast } = useToast();
  const [openEndDate, setOpenEndDate] = useState(false);
  const [open, setOpen] = useState(false);

  const onSuccess = () => {
    toast({ title: "Success !", description: "Your reminder has been set" });
    setOpen(false);
  };

  const { setReminder, error, reset } = useCreateReminder(onSuccess);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    reset();
  }, [reset]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);

    setReminder({ ...data, task_id: +taskId });
  };
  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-[530px]">
        <DialogHeader>
          <DialogTitle>Remind me about this issue on</DialogTitle>
        </DialogHeader>
        <div>
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
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Remind me at</FormLabel>
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <div className="text-red-600">{error.message}</div>}

              <div className="flex gap-2 items-center justify-end">
                <Button variant="outline" type="button">
                  Cancel
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
