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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as z from "zod";
import { useCreateQuestion } from "../hooks/useCreateQuestion";

export const formSchema = z.object({
  title: z.string().min(10),
  content: z.string().min(20, {
    message: "Descripton must be at least 20 characters.",
  }),
});

export const AskQuestion: React.FC = () => {
  const { orgaId } = useParams<{ orgaId: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { createQuestion, error } = useCreateQuestion();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const question = await createQuestion(data);

    navigate(`/${orgaId}/questions/${question.id}`);
    toast({
      title: "Success",
      description: "Votre question a été crée",
    });
  };

  return (
    <div className="w-full  h-full flex flex-col gap-10">
      <div className="w-full bg-secondary py-3 px-5 flex items-center justify-between">
        <p>Nouvelle question</p>
      </div>

      <div className="max-w-[800px] w-full self-center  h-full">
        <Form {...form}>
          <form
            className="flex flex-col gap-4 h-full justify-between"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Quels sont les détails de votre problème ?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none min-h-[350px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && <div className="text-red-600">{error.message}</div>}

            <div className="flex justify-end gap-2 self-end mb-5">
              <Button variant="outline" type="button">
                Annuler
              </Button>
              <Button type="submit">Valider</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
