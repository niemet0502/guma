import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./providers/auth";
import { USER_ACCOUNT_AUTH } from "./services/queries";

const formSchema = z.object({
  email: z.string().email({
    message: "Must be an valid email",
  }),
  password: z.string().min(5, {
    message: "Password must be enter",
  }),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignIn({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [userAccountAuth, { error }] = useMutation(USER_ACCOUNT_AUTH);
  const [checked, setChecked] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(createAuthInput: z.infer<typeof formSchema>) {
    const response = await userAccountAuth({
      variables: { createAuthInput },
    });

    if (response && response.data.userAccountAuth) {
      const { user, session } = response.data.userAccountAuth;

      const { project_id, project } = user;

      login(user, session, project);

      if (project && project_id) {
        navigate(
          location.state?.from?.pathname ||
            `/${project.name.toLowerCase()}/notifications`,
          {
            replace: true,
          }
        );
      } else {
        navigate("/create-project");
      }
    }
  }

  useEffect(() => {
    if (checked) {
      form.reset({
        email: "demo@guma.com",
        password: "password",
      });
    } else {
      form.reset({
        email: "",
        password: "",
      });
    }
  }, [checked]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="flex flex-col space-y-2 ">
        <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
        <p className="text-sm text-muted-foreground">
          New here ?{" "}
          <NavLink to="/auth/signup" className="text-primary">
            Sign Up for an account
          </NavLink>
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center">
            <div>
              <FormLabel>Demo account</FormLabel>
              <FormDescription>
                This is an experimental project, check the switch you will be
                connected with a demo account that has some data or create a new
                account.
              </FormDescription>
            </div>
            <Switch
              checked={checked}
              onCheckedChange={() => setChecked((prev) => !prev)}
            />
          </div>

          {error && <div className="text-red-600">{error.message}</div>}
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
