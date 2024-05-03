import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { transformDateFullText } from "@/lib/utils";
import { BsDot } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { GoProjectRoadmap } from "react-icons/go";
import { LuActivity } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";
import { NavLink, useParams } from "react-router-dom";
import { CreateModuleUpdate } from "../components/CreateModuleUpdate";
import { ModuleDocumentItem } from "../components/ModuleDocumentItem";
import { statusLabel } from "../components/ModuleItem";
import { ModuleStatusIcon } from "../components/ModuleStatusIcon";
import { ModuleTasksList } from "../components/ModuleTasksList";
import { UpdatesList } from "../components/UpdatesList";
import { useGetModule } from "../hooks/useGetModule";

export const ModuleDetails: React.FC = () => {
  const { orgaId, teamId, moduleId } = useParams<{
    orgaId: string;
    teamId: string;
    moduleId: string;
  }>();

  const { data: module } = useGetModule(+moduleId!);

  const completedTasksCount = module?.tasks.filter(
    ({ status }) => status.state >= 25 && status.state <= 30
  ).length;

  const startedTasksCount = module?.tasks.filter(
    ({ status }) => status.state >= 5 && status.state <= 20
  ).length;

  return (
    <div className="w-full h-full flex">
      <div className="w-2/3">
        <div className="bg-secondary w-full py-3 px-5  items-center justify-between flex flex-1  border-b">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <NavLink
                    to={`/${orgaId}/team/${teamId}/modules`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "default p-1"
                        : isPending
                        ? "default p-1"
                        : "default p-1"
                    }
                  >
                    Livrables
                  </NavLink>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage> {module?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className=" flex gap-2 items-center">
            {module && (
              <>
                <UpdatesList updates={module.updates}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex gap-1 items-center"
                  >
                    <LuActivity /> Updates
                  </Button>
                </UpdatesList>
                <CreateModuleUpdate moduleId={module.id}>
                  <Button size="sm" className="flex gap-1">
                    <TbEdit />
                    <span>New</span>
                    <span>update</span>
                  </Button>
                </CreateModuleUpdate>
              </>
            )}
          </div>
        </div>
        <div className="w-full">
          {module && (
            <ModuleTasksList tasks={module.tasks} teamId={module.team_id} />
          )}
        </div>
      </div>
      <div className="w-1/3 flex flex-col border-l">
        <div className="py-3 px-5 border-b">
          <div className="flex gap-2 items-center">
            <GoProjectRoadmap className="text-2xl" />
            <span className="text-lg font-medium">{module?.name}</span>
          </div>
          <p className="text-sm mt-2">{module?.description}</p>
        </div>

        <div>
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1" className="py-3 px-5">
              <AccordionTrigger className="hover:no-underline">
                <span className="text-base">Properties</span>
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <div className="flex py-2  gap-3">
                  <div className="w-[75px]">Status:</div>
                  <div className="flex gap-2 items-c">
                    <ModuleStatusIcon status={module?.status!} />
                    <span className="font-medium">
                      {statusLabel[module?.status!]}
                    </span>
                  </div>
                </div>
                <div className="flex py-2 gap-3">
                  <div className="w-[75px]">Author:</div>
                  <div className="flex items-center gap-2 font-medium">
                    <Avatar className="h-6 w-6 bg-transparent flex rounded-full border-2 items-center  justify-center mt-0.5">
                      <span className="text-muted-foreground  text-[9px]">
                        {module?.author?.username?.slice(0, 2).toUpperCase()}
                      </span>
                    </Avatar>
                    <span>{module?.author?.username}</span>
                  </div>
                </div>
                <div className="flex py-2 gap-3">
                  <div className="w-[75px]">Start at:</div>
                  <div className="flex items-center gap-2 font-medium">
                    <CiCalendarDate />
                    <span>{transformDateFullText(module?.start_at!)}</span>
                  </div>
                </div>
                <div className="flex py-2 gap-3">
                  <div className="w-[75px]">End at:</div>
                  <div className="flex items-center gap-2 font-medium">
                    <CiCalendarDate />
                    <span>{transformDateFullText(module?.end_at!)}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1" className="py-3 px-5">
              <AccordionTrigger className="hover:no-underline">
                <span className="text-base">Progress</span>
              </AccordionTrigger>
              <AccordionContent className="text-sm">
                <div className="flex mt-2">
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="h-2 w-2 bg-gray-500 mt-1"></div>
                      Scope
                    </div>
                    <span className="mt-1 ml-2">{module?.tasks.length}</span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="h-2 w-2 bg-yellow-700 mt-1"></div>
                      Started
                    </div>
                    <span className="mt-1 ml-2 flex gap-1 items-center">
                      {startedTasksCount} <BsDot />
                    </span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="h-2 w-2 bg-blue-700 mt-1"></div>
                      Completed
                    </div>
                    <span className="mt-1 ml-2 flex gap-1 items-center">
                      {completedTasksCount} <BsDot />
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1" className="py-3 px-5">
              <AccordionTrigger className="hover:no-underline">
                <span>
                  <span className="text-base"> Documents</span>{" "}
                  {module?.documents.length}{" "}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                {module?.documents.map((document) => (
                  <ModuleDocumentItem key={document.id} document={document} />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
