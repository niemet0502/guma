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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAuth } from "@/domains/auth/providers/auth";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as z from "zod";
import { useGetTeam } from "../hooks/useGetTeam";
import { useRemoveTeam } from "../hooks/useRemoveTeam";
import { useUpdateTeam } from "../hooks/useUpdateTeam";
import { TeamVisibility } from "../type";

const formSchema = z.object({
  name: z.string().min(4).max(50),
  identifier: z.string().min(3).max(8),
  visibility: z.boolean().default(false).optional(),
});

export const TeamGeneralSettings: React.FC = () => {
  const { project } = useAuth();
  const { orgaId, teamId } = useParams<{ orgaId: string; teamId: string }>();
  const { data: team } = useGetTeam(project?.id as number, teamId);
  const { updateTeam, error } = useUpdateTeam();
  const { removeTeam } = useRemoveTeam();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!team) return;
    form.reset({
      ...team,
      visibility: team.visibility === TeamVisibility.PRIVATE ? true : false,
    });
  }, [team]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    updateTeam({
      ...data,
      id: +team?.id!,
      visibility: data.visibility
        ? TeamVisibility.PRIVATE
        : TeamVisibility.PUBLIC,
    });
  };

  const onDelete = () => {
    if (!team) return;
    removeTeam({ variables: { id: +team.id } });
    navigate(`/${orgaId}/notifications`);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="border-b p-2">
          <h1 className="text-2xl">Testing</h1>
          <p className="mt-1">Manage team settings</p>
        </div>

        <div className=" p-2 flex flex-col gap-4">
          <div className="grid gap-4 py-4 border-b">
            <Form {...form}>
              <form
                className="flex flex-col gap-2 mb-6"
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
                          Private teams are visible only for their members and
                          admin.
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

                <DialogFooter className="mt-2">
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </div>

          <div className="my-4">
            <h4 className="text-lg mb-2 font-medium">Delete team</h4>
            <p>
              <span className="font-medium">Warning:</span> Deleting the team
              will also permanently delete any issues associated with it. This
              can't be undone and your data cannot be recovered
            </p>

            <Button
              type="button"
              variant="destructive"
              className=" mt-5"
              onClick={onDelete}
            >
              Delete team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
