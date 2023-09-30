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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@apollo/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useAuth } from "../auth/providers/auth";
import { UserProfileEnum } from "../auth/services/types";
import { CREATE_ORGANIZATION } from "./services/queries";

const FormSchema = z.object({
  name: z.string({
    required_error: "Please enter a name.",
  }),
  size: z.string({
    required_error: "Please select a size.",
  }),
});

export const OrganizationForm: React.FC = () => {
  const { updateOrganization, user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [createOrganization, { error }] = useMutation(CREATE_ORGANIZATION);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      size: "",
    },
  });

  async function onSubmit(createOrganizationInput: z.infer<typeof FormSchema>) {
    const response = await createOrganization({
      variables: { createOrganizationInput },
    });

    if (response && response.data.createOrganization) {
      const { createOrganization } = response.data;

      updateOrganization(createOrganization);
      updateUser({
        ...user,
        id: user?.id as string,
        profile_id: UserProfileEnum.ADMIN,
      });

      navigate(`/${createOrganization.name.toLowerCase()}/documents`);
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
          <h2 className="text-lg">Create a new organization</h2>
          <p className="text-center">
            Organization are shared environments where teams can work on
            projects, cycles and tasks.
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

              <Label htmlFor="picture">Logo</Label>
              <Input id="picture" type="file" />

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
