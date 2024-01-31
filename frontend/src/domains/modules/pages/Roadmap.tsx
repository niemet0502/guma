import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/domains/auth/providers/auth";
import { ModuleItem } from "../components/ModuleItem";
import { useGetRoadmap } from "../hooks/useGetRoadmap";

export const Roadmap: React.FC = () => {
  const { project } = useAuth();

  const { data: modules, isLoading } = useGetRoadmap(+project?.id!);
  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-secondary py-3 px-5 flex items-center justify-between">
        <p>Roadmap</p>

        {/* <CreateModuleDialog teamId={team?.id!} /> */}
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
            modules &&
            modules.map((module) => (
              <ModuleItem key={module.id} module={module} />
            ))}
        </div>
        <div className="w-2/3 "></div>
      </div>
    </div>
  );
};
