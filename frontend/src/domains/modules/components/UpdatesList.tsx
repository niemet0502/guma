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
  showModuleName?: boolean;
}> = ({ updates, children, showModuleName }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-[600px]">
        <DialogHeader>
          <DialogTitle>Updates</DialogTitle>
        </DialogHeader>
        <div className="max-h-[520px] overflow-auto">
          {updates.map((update) => (
            <UpdateItem
              update={update}
              key={update.id}
              showModuleName={showModuleName}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
