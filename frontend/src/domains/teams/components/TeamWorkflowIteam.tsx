import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TaskStatusIcon } from "@/domains/tasks/components/TaskStatusIcon";
import { TaskStatusApi } from "@/domains/tasks/type";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useRemoveStatus } from "../hooks/useRemoveStatus";
import { useUpdateStatus } from "../hooks/useUpdateStatus";

export const TeamWorkflowIteam: React.FC<{
  status: TaskStatusApi;
  isDefault?: boolean;
}> = ({ status, isDefault = false }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(status.name);

  const { updateTaskStatus } = useUpdateStatus();
  const { removeStatus } = useRemoveStatus();

  const submit = () => {
    if (!name) return;
    updateTaskStatus({ id: +status.id, name });
    setEditing(false);
  };

  const onDelete = () => {
    removeStatus({ variables: { id: +status.id } });
  };

  return (
    <div className=" p-2 rounded flex items-center gap-2">
      <div className="mt-0.5">
        <TaskStatusIcon status={status.name} />
      </div>
      <div className="flex-1">
        {!editing && <span>{status.name}</span>}
        {editing && (
          <Input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        )}
      </div>
      <div>
        {!isDefault && !editing && (
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
                  <p>Edit {status.name} label</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button size="sm" variant="ghost" onClick={onDelete}>
                    <FaRegTrashCan />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove {status.name} label</p>
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
