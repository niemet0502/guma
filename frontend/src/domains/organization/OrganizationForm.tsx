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
import { useMutation } from "@apollo/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  size: z.string({
    required_error: "Please select a size.",
  }),
  description: z.string().optional(),
});

export const OrganizationForm: React.FC = () => {
  const { updateProject, user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [createProject, { error }] = useMutation(CREATE_PROJECT);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      size: "",
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
        <p>{user?.email}</p>
        <p>logout</p>
      </div>
      <div className="flex items-center justify-center flex-1">
        <div className="w-[500px] border h-auto p-6 flex items-center gap-3 flex-col rounded-lg shadow-sm pb-12">
          <h2 className="text-lg font-medium">Nouveau projet</h2>
          <p className="text-center">
            Environnements partagés où les équipes peuvent travailler sur des
            taches, des itérations et documentation.
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
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How large is your organization ?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="just me">just me</SelectItem>
                        <SelectItem value="1-5">1-5</SelectItem>
                        <SelectItem value="5-25">5-25</SelectItem>
                        <SelectItem value="25-100">25-100</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <Label htmlFor="picture">Logo</Label>
              <Input id="picture" type="file" /> */}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none h-[80px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && <div className="text-red-600">{error.message}</div>}

              <Button type="submit" className="mb-5">
                Valider
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
