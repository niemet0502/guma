import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/domains/auth/providers/auth";
import { AiOutlinePlus } from "react-icons/ai";
import { LuActivity } from "react-icons/lu";
import { CreateModuleDialog } from "../components/CreateModuleDialog";
import { ModuleItem } from "../components/ModuleItem";
import { UpdatesList } from "../components/UpdatesList";
import { useGetRoadmap } from "../hooks/useGetRoadmap";

export const Roadmap: React.FC = () => {
  const { project } = useAuth();

  const { data: teams, isLoading } = useGetRoadmap(+project?.id!);
  const teamsData = teams?.map(({ id, name }) => ({ id, name }));
  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-secondary py-3 px-5 flex items-center justify-between">
        <p>Roadmap</p>

        <div className="flex items-center gap-2">
          {teams && (
            <UpdatesList
              updates={teams
                .flatMap(({ livrables }) => livrables)
                .flatMap(({ updates }) => updates)}
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
          {teamsData && (
            <CreateModuleDialog teamsData={teamsData}>
              <span className="mr-2 hover:cursor-pointer text-muted-foreground">
                <AiOutlinePlus />
              </span>
            </CreateModuleDialog>
          )}
        </div>
      </div>

      <div className="w-full flex flex-1 ">
        <div className="w-1/3 border-r">
          {isLoading && (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          )}
          {!isLoading &&
            teams &&
            teams
              .flatMap(({ livrables }) => livrables)
              .map((module) => <ModuleItem key={module.id} module={module} />)}
        </div>
        <div className="w-2/3 "></div>
      </div>
    </div>
  );
};
