import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/domains/auth/providers/auth";
import { CreateDialog } from "@/domains/teams/components/CreateDialog";
import { TeamCard } from "@/domains/teams/components/TeamCard";
import { useTeams } from "@/domains/teams/hooks/useTeams";
import { GoIssueDraft } from "react-icons/go";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { NavLink, useParams } from "react-router-dom";

export const Sidebar: React.FC = () => {
  let { orgaId } = useParams<{ orgaId: string }>();
  const { organization } = useAuth();
  const { data, isLoading } = useTeams(organization?.id as number);

  return (
    <div className="pb-12 h-full w-[250px] flex flex-none sticky top-0">
      <div className="w-full space-y-4 py-4">
        <div className="px-3 py-2">
          <h3 className="mb-3 px-4 text-lg font-semibold tracking-tight">
            Workspace [logo]
          </h3>
          <div className="space-y-1">
            <NavLink
              to={`/${orgaId}/notifications`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "default" : "default"
              }
            >
              <IoIosNotificationsOutline className="text-base" />
              Notifications
            </NavLink>

            <NavLink
              to={`/${orgaId}/documents`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "default" : "default"
              }
            >
              <HiOutlineDocumentDuplicate className="text-base" />
              Documents
            </NavLink>
            <NavLink
              to="/create-workspace"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "default" : "default"
              }
            >
              <GoIssueDraft className="text-base" />
              Issues
            </NavLink>
          </div>
        </div>
        <div className="">
          <div className="flex items-center justify-between">
            <h6 className="my-2 px-4 text-lg font-semibold tracking-tight">
              Teams
            </h6>

            <CreateDialog />
          </div>
          <div>
            {isLoading && (
              <>
                <div className="my-2 px-4">
                  <Skeleton className="h-4  w-full" />
                </div>
                <div className="space-y-2 pl-4 pr-4">
                  {Array(3)
                    .fill(null)
                    .map((i) => (
                      <Skeleton className="ml-6 h-4" key={i} />
                    ))}
                </div>
              </>
            )}
            {data?.map((team) => (
              <TeamCard team={team} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
