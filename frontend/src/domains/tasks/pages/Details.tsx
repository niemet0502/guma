import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/domains/auth/providers/auth";
import { TeamVisibility } from "@/domains/teams/type";
import { useGetUsers } from "@/domains/users/hooks/useGetUsers";
import { useParams } from "react-router-dom";
import { ActivityItem } from "../components/ActivityItem";
import { SubTaskItem } from "../components/SubTaskItem";
import { useGetTask } from "../hooks/useGetTask";

export const TaskDetails: React.FC = () => {
  const { organization } = useAuth();
  const { issueId } = useParams<{ issueId: string }>();

  const { data: users } = useGetUsers(organization?.id as number);
  const { data: task } = useGetTask(issueId as string);

  const members =
    task?.team?.visibility === TeamVisibility.PUBLIC
      ? users
      : task?.team?.members.map(({ user }) => user);

  return (
    <div className="h-full border-t">
      {/* <div className="bg-secondary py-3 px-5 flex items-center gap-1">
        <span>Backlog</span>
        <SlArrowRight className="mt-1 text-xs" />
        <span>{task?.identifier}</span>
      </div> */}

      <div className="h-full w-full flex">
        <div className="flex flex-1 flex-col px-8 py-6 items-center">
          <div className="w-full max-w-[1000px]">
            <div className="w-full">
              <Textarea
                value={task?.name}
                className="border-none font-bold text-xl"
              />
            </div>

            <div className="w-full">
              <Textarea
                className="h-[100px] border-none"
                placeholder="Add description "
              />
            </div>

            <div className="px-3">
              <Accordion
                type="single"
                collapsible
                className="w-full border-0"
                defaultValue="item-1"
              >
                <AccordionItem value="item-1" className="border-0">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col w-full">
                      <h6 className="text-left">Sub-tasks</h6>
                      <Separator className="my-4" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {task?.subtasks.map((task) => (
                      <SubTaskItem
                        task={task}
                        key={task.id}
                        members={members}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="w-full px-3 ">
              <h5 className="mb-4">Activities</h5>
              {task?.activities.map((activity) => (
                <ActivityItem activity={activity} />
              ))}
            </div>
          </div>
        </div>
        <div className="bg-secondary w-[320px] 2xl:w-[400px] border-l">
          testing
        </div>
      </div>
    </div>
  );
};
