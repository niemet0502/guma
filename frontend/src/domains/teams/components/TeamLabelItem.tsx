import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LabelApi } from "@/domains/organization/services/type";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useUpdateTeamLabel } from "../hooks/useUpdateTeamLabel";

export const TeamLabelItem: React.FC<{ label: LabelApi }> = ({ label }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(label.name);

  const { updateLabel } = useUpdateTeamLabel();

  const submit = () => {
    if (!name) return;
    updateLabel({ id: +label.id, name });
    setEditing(false);
  };
  return (
    <div className="border p-2 rounded flex items-center justify-between">
      <div>
        {!editing && <span>{label.name}</span>}

        {editing && (
          <Input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        )}
      </div>
      <div className="flex items-center gap-2 ">
        {!editing && (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditing((prev) => !prev)}
                  >
                    <MdEdit />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit {label.name} label</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button size="sm" variant="ghost">
                    <FaRegTrashCan />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove {label.name} label</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
        {editing && (
          <>
            <Button
              variant="ghost"
              className="border"
              type="button"
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
            <Button variant="default" onClick={submit}>
              Save
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
