import { Badge } from "@/components/ui/badge";
import { AiOutlinePlayCircle } from "react-icons/ai";

export const SprintBadge: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Badge variant="secondary" className="flex gap-1 rounded-lg">
      <AiOutlinePlayCircle />
      {name}
    </Badge>
  );
};
