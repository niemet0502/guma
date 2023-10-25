import { useParams } from "react-router-dom";
import { OngoingSprint } from "../components/OngoingSprint";
import { useGetSprint } from "../hooks/useGetSprint";

export const SprintDetails: React.FC = () => {
  const { sprintId } = useParams<{ sprintId: string }>();

  const { data } = useGetSprint(sprintId as string);

  if (data && !data.isCompleted) {
    return <OngoingSprint sprint={data} />;
  }
  return <div>{JSON.stringify(data)}</div>;
};
