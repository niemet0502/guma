import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/domains/auth/providers/auth";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GoIssueDraft, GoProjectRoadmap } from "react-icons/go";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { NavLink, useParams } from "react-router-dom";
import { TeamApi, TeamVisibility } from "../type";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const TeamCard: React.FC<{ team: TeamApi }> = ({ team }) => {
  let { orgaId } = useParams<{ orgaId: string }>();
  const { user } = useAuth();

  const isPublic = team.visibility === TeamVisibility.PUBLIC;

  if (
    team.visibility === TeamVisibility.PRIVATE &&
    !(user?.id && team.members.some(({ user_id }) => user_id === +user?.id))
  ) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline">
              <div className="pl-4 pr-1 flex flex-1 justify-between">
                <h5 className="my-2 text-base font-semibold tracking-tight ">
                  {team.name}
                </h5>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <BiDotsHorizontalRounded />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <NavLink
                        to={`/${orgaId}/team/${team.name.toLowerCase()}/settings/general`}
                        className="default"
                      >
                        Team settings
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Copy the link</DropdownMenuItem>
                    <DropdownMenuItem disabled={isPublic}>
                      Leave the team
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 pl-4 pr-3">
                <NavLink
                  to={`/${orgaId}/team/${team.name.toLowerCase()}/issues`}
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "default" : "default"
                  }
                >
                  <GoIssueDraft className="text-base" />
                  Issues
                </NavLink>
                <NavLink
                  to={`/${orgaId}/team/${team.name.toLowerCase()}/wiki`}
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "default" : "default"
                  }
                >
                  <HiOutlineDocumentDuplicate className="text-base" />
                  Wiki
                </NavLink>

                <NavLink
                  to={`/${orgaId}/team/${team.name.toLowerCase()}/sprints`}
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "default" : "default"
                  }
                >
                  <AiOutlinePlayCircle />
                  Sprints
                </NavLink>

                <NavLink
                  to={`/${orgaId}/team/${team.name.toLowerCase()}/modules`}
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "default" : "default"
                  }
                >
                  <GoProjectRoadmap />
                  Modules
                </NavLink>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
