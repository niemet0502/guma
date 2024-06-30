import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/domains/auth/providers/auth";
import { useGetTeam } from "@/domains/teams/hooks/useGetTeam";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { GoProjectRoadmap } from "react-icons/go";
import { LuActivity } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { CreateModuleDialog } from "../components/CreateModuleDialog";
import { ModuleItem } from "../components/ModuleItem";
import { UpdatesList } from "../components/UpdatesList";
import { useModules } from "../hooks/useModules";

export const ModulesList: React.FC = () => {
  const { project } = useAuth();
  const { teamId } = useParams<{ teamId: string }>();
  const { data: team, isLoading } = useGetTeam(project?.id as number, teamId);
  const { fetchModules, data: modules } = useModules();

  useEffect(() => {
    if (!team) return;
    fetchModules(+team.id);
  }, [team]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-secondary py-3 px-5 flex items-center justify-between">
        <p>
          Modules
          <span className="text-muted-foreground ml-2">{modules?.length}</span>
        </p>

        <div className="flex items-center gap-2">
          {modules && (
            <UpdatesList
              updates={modules?.flatMap(({ updates }) => updates)}
              showModuleName
            >
              <Button
                size="sm"
                variant="outline"
                className="flex gap-1 items-center"
              >
                <LuActivity /> Updates
              </Button>
            </UpdatesList>
          )}
          {team && (
            <CreateModuleDialog teamId={+team.id}>
              <button className="mr-2 hover:cursor-pointer text-muted-foreground">
                <AiOutlinePlus />
              </button>
            </CreateModuleDialog>
          )}
        </div>
      </div>

      <div className="w-full flex flex-1">
        {(isLoading || (modules && modules.length > 0)) && (
          <>
            <div className="w-1/3 border-r">
              {isLoading && (
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                </div>
              )}
              {!isLoading &&
                modules &&
                modules.map((module) => (
                  <ModuleItem key={module.id} module={module} />
                ))}
            </div>
            <div className="w-2/3 "></div>
          </>
        )}

        {!isLoading && modules && modules.length === 0 && team && (
          <div className="h-full w-full flex items-center justify-center">
            <div className="flex flex-col gap-3 border bg-secondary rounded p-8 mb-[150px] w-[400px] shadow-xl">
              <div className="flex gap-3 items-center">
                <GoProjectRoadmap className="text-3xl mt-2" />{" "}
                <h1 className="text-4xl">Modules</h1>
              </div>
              <p>There are no modules for this team yet.</p>

              <p>
                Once you have created modules for your team they will show up
                here.
              </p>

              <CreateModuleDialog teamId={+team.id}>
                <Button className="mt-3">Create a module</Button>
              </CreateModuleDialog>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
