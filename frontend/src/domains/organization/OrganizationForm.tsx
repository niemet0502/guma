import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useApolloClient, useMutation } from "@apollo/client";

import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useAuth } from "../auth/providers/auth";
import { UserProfileEnum } from "../auth/services/types";
import { CREATE_PROJECT } from "./services/queries";

const FormSchema = z.object({
  name: z.string({
    required_error: "Please enter a name.",
  }),
  description: z.string().optional(),
});

export const OrganizationForm: React.FC = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const { updateProject, user, updateUser, logout, project } = useAuth();

  const [createProject, { error }] = useMutation(CREATE_PROJECT);

  const signOut = async () => {
    client.resetStore();
    logout();
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(createProjectInput: z.infer<typeof FormSchema>) {
    const response = await createProject({
      variables: { createProjectInput },
    });

    if (response && response.data.createProject) {
      const { createProject } = response.data;

      updateProject(createProject);
      updateUser({
        ...user,
        username: user?.username as string,
        id: user?.id as string,
        profile_id: UserProfileEnum.ADMIN,
      });

      navigate(`/${createProject.name.toLowerCase()}/documents`);
    }
  }
  return (
    <div className="w-full flex h-screen flex-col">
      <div className="flex items-center justify-between p-6">
        {!project && <p>{user?.email}</p>}
        {project && (
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back to the app
          </Button>
        )}
        <div>
          <Button onClick={signOut} variant="secondary">
            logout
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center flex-1">
        <div className="w-[500px] border h-auto p-6 flex items-center gap-3 flex-col rounded-lg shadow-sm pb-12">
          <h2 className="text-lg">Create a new project</h2>
          <p className="text-center">
            Projects are shared environments where you can work on tasks,
            sprints and modules.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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

              <Button type="submit" className="mb-5">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
