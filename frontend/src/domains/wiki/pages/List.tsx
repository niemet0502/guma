import { Button } from "@/components/ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import { DocumentItem } from "../documents/components/DocumentItem";
import { useDocuments } from "../documents/hooks/useDocuments";
import { FolderItem } from "../folders/components/FolderItem";
import { useFolders } from "../folders/hooks/useFolders";

export const Wiki: React.FC = () => {
  const { data: documents } = useDocuments();
  const { data: folders } = useFolders();

  return (
    <div className="w-full">
      <div className="bg-secondary py-3 px-5 flex items-center justify-between">
        <p>Wiki</p>

        <Button
          variant="outline"
          size="sm"
          className="mr-2 hover:cursor-pointer text-muted-foreground"
        >
          <AiOutlinePlus />
        </Button>
      </div>
      {folders?.map((folder) => (
        <FolderItem folder={folder} />
      ))}
      {documents?.map((document) => (
        <DocumentItem document={document} />
      ))}
    </div>
  );
};
