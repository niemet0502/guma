import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/domains/auth/providers/auth";
import { UserProfileEnum } from "@/domains/auth/services/types";
import { useNotifications } from "@/domains/notifications/hook/useNotifications";
import { CreateDialog } from "@/domains/teams/components/CreateDialog";
import { TeamCard } from "@/domains/teams/components/TeamCard";
import { useTeams } from "@/domains/teams/hooks/useTeams";
import { useMemo } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaMap } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineAnalytics } from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";

export const Sidebar: React.FC = () => {
  let { orgaId } = useParams<{ orgaId: string }>();
  const { project, user } = useAuth();
  const { data, isLoading } = useTeams(project?.id as number);

  const { data: notifications } = useNotifications(+user!.id);

  const unreadNotificationsCounter = useMemo(() => {
    if (!notifications) return -1;
    return notifications.filter(({ read }) => !read).length;
  }, [notifications]);

  return (
    <div className="pb-12 h-full w-[220px] flex flex-none sticky top-0 ">
      <div className="w-full space-y-4 py-4">
        <div className="px-2 py-2">
          <h4 className="mb-3 px-2 text-lg font-semibold tracking-tight">
            {project?.name}
          </h4>
          <div className="space-y-1">
            <NavLink
              to={`/${orgaId}/analytics`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "default" : "default"
              }
            >
              <MdOutlineAnalytics className="text-base" />
              Analytics
            </NavLink>
            <NavLink
              to={`/${orgaId}/notifications`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "default" : "default"
              }
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center flex-1">
                  <IoIosNotificationsOutline className="text-base" />
                  Notifications
                </div>
                {unreadNotificationsCounter &&
                unreadNotificationsCounter > 0 ? (
                  <div className="text-xs p-1 bg-secondary rounded-sm">
                    {unreadNotificationsCounter}
                  </div>
                ) : undefined}
              </div>
            </NavLink>

            <NavLink
              to={`/${orgaId}/roadmap`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "default" : "default"
              }
            >
              <FaMap className="text-base" />
              Roadmap
            </NavLink>
            <NavLink
              to={`/${orgaId}/questions`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "default" : "default"
              }
            >
              <FaRegQuestionCircle className="text-base" />
              Forum
            </NavLink>
          </div>
        </div>
        <div className="">
          <div className="flex items-center justify-between">
            <h6 className="my-2 px-4 text-lg font-semibold tracking-tight">
              Equipes
            </h6>

            {user?.profile_id === UserProfileEnum.ADMIN && <CreateDialog />}
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
              <TeamCard team={team} key={team.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
