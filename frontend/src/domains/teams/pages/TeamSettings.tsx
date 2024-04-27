import { RiArrowRightSLine } from "react-icons/ri";
import { NavLink, Outlet, useParams } from "react-router-dom";

export const TeamSettings: React.FC = () => {
  let { orgaId, teamId } = useParams<{ orgaId: string; teamId: string }>();

  return (
    <div className="w-full h-full">
      <div className="bg-secondary py-3 px-5 flex items-center sticky top-0 z-10">
        <p>Guma</p>
        <RiArrowRightSLine className="mt-0.5" />
        <p>Settings</p>
      </div>

      <div className="w-full h-full flex">
        <div className=" w-80 border-r px-3 py-3  sticky left-0">
          <NavLink
            to={`/${orgaId}/team/${teamId}/settings/general`}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "default" : "default"
            }
          >
            General
          </NavLink>
          <NavLink
            to={`/${orgaId}/team/${teamId}/settings/members`}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "default" : "default"
            }
          >
            Members
          </NavLink>

          <NavLink
            to={`/${orgaId}/team/${teamId}/settings/workflow`}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "default" : "default"
            }
          >
            Workflow
          </NavLink>

          {/* <NavLink
            to={`/${orgaId}/team/${teamId}/settings/sprints`}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "default" : "default"
            }
          >
            Sprint
          </NavLink> */}

          <NavLink
            to={`/${orgaId}/team/${teamId}/settings/labels`}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "default" : "default"
            }
          >
            Labels
          </NavLink>
        </div>
        <div className="flex-1 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
