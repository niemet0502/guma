import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/domains/auth/providers/auth";
import { useGetUsers } from "@/domains/users/hooks/useGetUsers";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { TeamMemberItem } from "../components/TeamMemberItem";
import { useAddTeamMember } from "../hooks/useAddTeamMember";
import { useGetTeam } from "../hooks/useGetTeam";

export const TeamMembers: React.FC = () => {
  const { project } = useAuth();
  const { teamId } = useParams<{ teamId: string }>();
  const { data: team } = useGetTeam(project?.id as number, teamId);
  const { data: users } = useGetUsers(project?.id as number);
  const { addTeamMember } = useAddTeamMember();

  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl ">
        <div className="border-b p-2 mb-4">
          <h1 className="text-2xl">Membres de l'équipe</h1>
          <p className="mt-1">Manage who is a member of the team</p>
        </div>
        <div className="p-1 flex flex-col gap-2">
          Gérer les membres de l'equipe
          <div className="mt-1 flex justify-between">
            <Input placeholder="Recherchez par nom ou email" className="w-80" />

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger>
                <Button type="submit">Ajouter un membre</Button>
              </PopoverTrigger>
              <PopoverContent className="p-1 w-60">
                <Command>
                  <CommandInput placeholder="Add team member..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {(users || [])
                        .filter(
                          (user) =>
                            !team?.members.some(
                              ({ user: member }) => +member.id === +user.id
                            )
                        )
                        .map((user) => (
                          <CommandItem
                            key={user.id}
                            value={user.id.toString()}
                            onSelect={(user) => {
                              addTeamMember({
                                user_id: +user,
                                team_id: +team?.id!,
                              });
                              setOpen(false);
                            }}
                          >
                            {user.email}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem>Invite people</CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm">{team?.members.length} listes</span>

            {(team?.members || []).map((member) => (
              <TeamMemberItem
                key={member.id}
                user={member.user}
                memberId={+member.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
