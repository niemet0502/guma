import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/domains/auth/providers/auth";
import { TeamVisibility } from "@/domains/teams/type";
import { useGetUsers } from "@/domains/users/hooks/useGetUsers";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa6";
import { RiArrowRightSLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { CommentSection } from "../components/CommentSection";
import { CreateSubTask } from "../components/CreateSubTask";
import { SubTaskItem } from "../components/SubTaskItem";
import { AddReminderDialog } from "../components/reminder/AddReminderDialog";
import { ActivityItem } from "../components/taskdetails/ActivityItem";
import { RightSidebar } from "../components/taskdetails/RightSidebar";
import { useGetTask } from "../hooks/useGetTask";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { ActivityAction } from "../type";

export const TaskDetails: React.FC = () => {
  const { project } = useAuth();
  const { issueId } = useParams<{ issueId: string }>();

  const { data: users } = useGetUsers(project?.id as number);
  const { data: task } = useGetTask(issueId as string);
  const { updateTask } = useUpdateTask();

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [subtasks, setSubtask] = useState(false);

  const members =
    task?.team?.visibility === TeamVisibility.PUBLIC
      ? users
      : task?.team?.members.map(({ user }) => user);

  const handleUpdate = (data: any) => {
    if (!task) return;
    updateTask({ ...data, id: +task.id as number });
  };

  const handleBlur = () => {
    if (titleRef.current) {
      const name = titleRef.current.value;

      if (name !== task?.name) {
        handleUpdate({ name, action: ActivityAction.CHANGED_TITLE });
      }
    }

    if (descriptionRef.current) {
      const description = descriptionRef.current.value;

      if (description !== task?.description) {
        handleUpdate({
          description,
          action: ActivityAction.UPDATED_DESCRIPTION,
        });
      }
    }
  };

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.addEventListener("blur", handleBlur);
    }

    if (descriptionRef.current) {
      descriptionRef.current.addEventListener("blur", handleBlur);
    }

    return () => {
      if (titleRef.current) {
        titleRef.current.removeEventListener("blur", handleBlur);
      }

      if (descriptionRef.current) {
        descriptionRef.current.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  return (
    <div className="h-full border-t overflow-hidden">
      {task && (
        <div className="h-full w-full flex">
          <div className="flex flex-1 flex-col">
            <div className="bg-secondary py-3 px-5 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div>Backlog</div>
                <p className="flex gap-1 items-center">
                  <RiArrowRightSLine className="mt-0.5" />
                  {task.name}
                </p>
              </div>
              <AddReminderDialog taskId={task.id}>
                <Button size="sm" className="ml-2 flex gap-2 items-center">
                  <FaRegClock />
                  Remind me...
                </Button>
              </AddReminderDialog>
            </div>

            <div className="flex px-8 py-6 items-center justify-center overflow-auto ">
              <div className="w-full max-w-[1000px]">
                <div className="w-full">
                  <Textarea
                    ref={titleRef}
                    defaultValue={task?.name}
                    className="border-none font-bold text-xl resize-none"
                  />
                </div>

                <div className="w-full">
                  <Textarea
                    ref={descriptionRef}
                    className="h-[100px] border-none resize-none"
                    placeholder="Add description"
                    defaultValue={task?.description}
                  />
                </div>

                <div className="px-3">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full border-0 mb-2"
                    defaultValue="item-1"
                  >
                    <AccordionItem value="item-1" className="border-0">
                      <div className="flex w-full items-center justify-between">
                        <AccordionTrigger className="hover:no-underline flex items-center gap-1">
                          <h6 className="text-left">Sub-tasks</h6>
                        </AccordionTrigger>
                        <div className="flex ">
                          <span
                            className="mr-2 hover:cursor-pointer text-muted-foreground"
                            onClick={() => setSubtask(true)}
                          >
                            <AiOutlinePlus />
                          </span>
                        </div>
                      </div>
                      <AccordionContent>
                        {task?.subtasks.map((task) => (
                          <SubTaskItem
                            task={task}
                            key={task.id}
                            members={members}
                          />
                        ))}

                        {subtasks && task && (
                          <CreateSubTask
                            task={task}
                            isOpen={subtasks}
                            hide={() => setSubtask(false)}
                          />
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="w-full px-3">
                  <h5 className="mb-4">Activities</h5>
                  {task?.activities.map((activity) => (
                    <ActivityItem activity={activity} key={activity.id} />
                  ))}
                </div>

                <CommentSection task={task} />
              </div>
            </div>
          </div>
          <RightSidebar task={task} users={users} handleUpdate={handleUpdate} />
        </div>
      )}
    </div>
  );
};
