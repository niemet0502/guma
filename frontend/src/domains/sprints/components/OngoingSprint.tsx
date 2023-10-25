import { useGetStatus } from "@/domains/tasks/hooks/useGetStatus";
import { SprintApi } from "@/domains/tasks/type";

export const OngoingSprint: React.FC<{ sprint: SprintApi }> = ({ sprint }) => {
  const { data: status } = useGetStatus(sprint.team_id);

  return <div>{JSON.stringify(status)}</div>;
};
