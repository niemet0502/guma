import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { cn } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
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
  const { login } = useAuth();

  const [userAccountAuth, { error }] = useMutation(USER_ACCOUNT_AUTH);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "mariusniemet@gmail.com",
      password: "passer",
    },
  });

  async function onSubmit(createAuthInput: z.infer<typeof formSchema>) {
    const response = await userAccountAuth({
      variables: { createAuthInput },
    });

    if (response && response.data.userAccountAuth) {
      const { user, session } = response.data.userAccountAuth;

      const { organization_id, organization } = user;

      login(user, session, organization);

      if (organization && organization_id) {
        navigate(`/${organization.name.toLowerCase()}/documents`, {
          replace: true,
        });
      } else {
        navigate("/create-workspace");
      }
    }
  }

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

          {error && <div className="text-red-600">{error.message}</div>}
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
