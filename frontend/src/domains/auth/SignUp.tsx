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
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import useCreateUser from "./hooks/useCreateUser";

const formSchema = z.object({
  email: z.string().email({
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be enter",
  }),
  password_confirmation: z.string().min(5, {
    message: "Password must be enter",
  }),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUp({ className, ...props }: UserAuthFormProps) {
  const { createUser } = useCreateUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    const createUserInput = { email, password };

    createUser(createUserInput);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="flex flex-col space-y-2 ">
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <NavLink to="/auth/signin" className="text-primary">
            Sign in
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
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password confirmation</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
