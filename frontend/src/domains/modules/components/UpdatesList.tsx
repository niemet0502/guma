import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Livrableupdate } from "../type";
import { UpdateItem } from "./UpdateItem";

export const UpdatesList: React.FC<{
  updates: Livrableupdate[];
  children: React.ReactElement;
}> = ({ updates, children }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-[600px]">
        <DialogHeader>
          <DialogTitle>Updates</DialogTitle>
        </DialogHeader>
        <div>
          {updates.map((update) => (
            <UpdateItem update={update} key={update.id} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
