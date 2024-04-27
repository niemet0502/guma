import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TaskStatusIcon } from "@/domains/tasks/components/TaskStatusIcon";
import { TaskStatusApi } from "@/domains/tasks/type";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

export const TeamWorkflowIteam: React.FC<{
  status: TaskStatusApi;
  isDefault?: boolean;
}> = ({ status, isDefault = false }) => {
  return (
    <div className=" p-2 rounded flex items-center gap-2">
      <div className="mt-0.5">
        <TaskStatusIcon status={status.name} />
      </div>
      <div className="flex-1">{status.name}</div>
      <div>
        {!isDefault && (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    size="sm"
                    variant="ghost"
                    // onClick={() => setEditing((prev) => !prev)}
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
                  <Button
                    size="sm"
                    variant="ghost"
                    // onClick={onDelete}
                  >
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
      </div>
    </div>
  );
};
