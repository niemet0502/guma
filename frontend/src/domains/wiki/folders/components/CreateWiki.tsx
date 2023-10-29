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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateDocument } from "../../documents/hooks/useCreateDocument";
import { useCreateFolder } from "../hooks/useCreateFolder";

const formSchema = z.object({
  type: z.string().min(1).max(1),
  name: z.string(),
});

export const CreateWikiForm: React.FC<{
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  team_id: number;
}> = ({ onOpenChange, team_id }) => {
  const { toast } = useToast();

  const { createFolder } = useCreateFolder();
  const { createDocument } = useCreateDocument();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "1",
    },
  });

  const selectedType = form.watch("type");

  const nameLabel = selectedType === "1" ? "Document" : "Folder";

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const { type, name } = data;

    if (type === "1") {
      createDocument({ name, team_id }, () => {
        toast({
          title: "Success !",
          description: "Document successfully created",
        });

        onOpenChange(false);
      });
    } else {
      createFolder({ name, team_id }, () => {
        toast({
          title: "Success !",
          description: "Folder successfully created",
        });
        onOpenChange(false);
      });
    }
  };

  return (
    <div className="grid ">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Document</SelectItem>
                    <SelectItem value="2">Folder</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder={`${nameLabel} title`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2 ">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Redirect after the creation</Label>
          </div>

          <div className="flex justify-end gap-2 mt-3">
            <Button
              variant="outline"
              type="button"
              //   onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
