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
  const { project } = useAuth();
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
      project_id: project ? (+project?.id as number) : undefined,
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
                <FormLabel>Nom</FormLabel>
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
                <FormLabel>Identifiant</FormLabel>
                <FormControl>
                  <Input placeholder="e.g ENG" {...field} />
                </FormControl>
                <FormDescription>
                  Il est utilisé comme identifiant (e.g. ENG-123)
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
                  <FormLabel>Equipe privée</FormLabel>
                  <FormDescription>
                    Les équipes privées ne sont visibles que par leurs membres
                    et l'administrateur.
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

          <DialogFooter className="mt-3">
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};
