import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FiSettings } from "react-icons/fi";
import { ActionDropdown } from "./ActionDropdown";
import { SettingsLayout } from "./settings/Layout";

export const DetailsDialog: React.FC = () => {
  return (
    <Dialog>
      <ActionDropdown>
        <DialogTrigger asChild>
          <DropdownMenuItem className="flex items-center gap-2 hover:cursor-pointer">
            <FiSettings /> Team settings
          </DropdownMenuItem>
        </DialogTrigger>
      </ActionDropdown>

      <DialogContent className="md:w-[990px] lg:w-[1190px] md:h-[590px] lg:h-[690px] top-[50%] p-0">
        <div className="h-full w-full border grid gap-4 py-4 flex-2 p-0">
          <SettingsLayout>
            <div>test</div>
          </SettingsLayout>
        </div>
      </DialogContent>
    </Dialog>
  );
};
