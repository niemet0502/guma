import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../services/queries";
import { CreateUserInput } from "../services/types";

function useCreateUser() {
  const [createUserMutation, { error }] = useMutation(CREATE_USER);
  const { toast } = useToast();

  const createUser = async (createUserInput: CreateUserInput) => {
    try {
      const response = await createUserMutation({
        variables: { createUserInput },
      });

      // Check the response for success and handle accordingly
      if (response.data && response.data.createUser) {
        // User creation succeeded, show success toast
        toast({
          title: "Registration",
          description: "Your account has been successfully created",
        });
      } else {
        // Handle unexpected response or error
        response.errors?.map(({ message }) => console.log(message));
      }
    } catch (e) {
      // Handle GraphQL errors or HTTP errors here

      toast({
        variant: "destructive",
        description: error?.message,
      });
    }
  };

  return { createUser };
}

export default useCreateUser;
