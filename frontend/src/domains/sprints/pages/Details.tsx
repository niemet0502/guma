import { useParams } from "react-router-dom";
import { OngoingSprint } from "../components/OngoingSprint";
import { useGetSprint } from "../hooks/useGetSprint";

export const SprintDetails: React.FC = () => {
  const { sprintId } = useParams<{ sprintId: string }>();

  const { data: sprint } = useGetSprint(sprintId as string);

  if (sprint && !sprint.isCompleted) {
    return <OngoingSprint sprint={sprint} />;
  }
  return (
    <div className="w-full">
      <div className="mb-3 bg-secondary py-3 px-5 flex items-center justify-between sticky top-0">
        <p>Sprints</p>
        {JSON.stringify(sprint)}
      </div>
    </div>
  );
};
