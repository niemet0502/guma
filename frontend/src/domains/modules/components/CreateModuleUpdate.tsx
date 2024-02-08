import { Button } from "@/components/ui/button";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateModuleUpdate } from "../hooks/useCreateModuleUpdate";
import { LivrableUpdateEnum } from "../type";
import { ModuleUpdateIcon } from "./ModuleUpdateIcon";

const formSchema = z.object({
  status: z.number(),
  description: z.string().optional(),
});

const statuses = [
  LivrableUpdateEnum.OnTrack,
  LivrableUpdateEnum.AtRisk,
  LivrableUpdateEnum.OffTrack,
];

export const CreateModuleUpdate: React.FC<{
  moduleId: number;
  children: React.ReactElement;
}> = ({ moduleId, children }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [openAssignee, setOpenAssignee] = useState(false);

  const onSuccess = () => {
    toast({
      title: "Success !!",
      description: "Your Update has been successfully posted",
    });

    setOpen(false);
  };

  const { createUpdate } = useCreateModuleUpdate(onSuccess);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { status: statuses[0] },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createUpdate({ ...data, livrable_id: +moduleId });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-[500px] top-[50%]">
        <DialogHeader>
          <DialogTitle>New update</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex-auto">
                    <Popover open={openAssignee} onOpenChange={setOpenAssignee}>
                      <PopoverTrigger asChild className="border-none">
                        <div className="flex gap-2 items-center">
                          <FormLabel>Status</FormLabel>
                          <Button
                            variant="outline"
                            className="flex gap-2 border-none"
                            type="button"
                          >
                            <ModuleUpdateIcon status={+field.value} />
                          </Button>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-[180px] p-0 mr-7">
                        <Command>
                          <CommandInput
                            placeholder="status..."
                            className="h-9"
                          />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {statuses?.map((value) => (
                              <CommandItem
                                key={value}
                                onSelect={() => {
                                  form.setValue("status", +value);
                                  setOpenAssignee(false);
                                }}
                              >
                                <ModuleUpdateIcon status={+value} />
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    +value === field.value
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none h-[120px]" {...field} />
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
                  Annuler
                </Button>
                <Button type="submit">Valider</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
