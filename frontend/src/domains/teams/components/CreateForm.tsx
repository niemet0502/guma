import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/domains/auth/providers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import * as z from "zod";
import { useCreateTeam } from "../hooks/useCreateTeam";
import { TeamVisibility } from "../type";

const formSchema = z.object({
  name: z.string().min(4).max(50),
  identifier: z.string().min(3).max(8),
  visibility: z.boolean().default(false).optional(),
});

export const CreateForm: React.FC<{
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ onOpenChange }) => {
  const { organization } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const name = form.watch("name");

  const onSuccess = () => {
    toast({
      title: "Success !",
      description: "Team successfully created",
    });
    onOpenChange(false);
  };
  const { createTeam, error } = useCreateTeam(onSuccess);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createTeam({
      ...data,
      visibility: data.visibility
        ? TeamVisibility.PRIVATE
        : TeamVisibility.PUBLIC,
      organization_id: organization ? (+organization?.id as number) : undefined,
    });
  };

  useEffect(() => {
    if (name && name.length > 4) return;
    form.setValue("identifier", name ? name.toUpperCase() : "");
  }, [name]);

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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g Engineering" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Identifier</FormLabel>
                <FormControl>
                  <Input placeholder="e.g ENG" {...field} />
                </FormControl>
                <FormDescription>
                  This is used as the identifier (e.g. ENG-123)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Private team</FormLabel>
                  <FormDescription>
                    Private teams are visible only for their members and admin.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {error && <div className="text-red-600">{error.message}</div>}

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};
