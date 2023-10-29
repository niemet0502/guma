import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/domains/auth/providers/auth";
import { useGetTeam } from "@/domains/teams/hooks/useGetTeam";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { DocumentItem } from "../documents/components/DocumentItem";
import { useDocuments } from "../documents/hooks/useDocuments";
import { CreateWikiForm } from "../folders/components/CreateWiki";
import { FolderItem } from "../folders/components/FolderItem";
import { useFolders } from "../folders/hooks/useFolders";

export const Wiki: React.FC = () => {
  const { organization } = useAuth();
  const { teamId } = useParams<{ teamId: string }>();

  const { data: team } = useGetTeam(organization?.id as number, teamId);

  const {
    fetchDocuments,
    data: documents,
    isLoading: isDocumentLoading,
  } = useDocuments();
  const {
    fetchFolders,
    data: folders,
    isLoading: isFoldersLoading,
  } = useFolders();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!team) return;
    fetchDocuments(+team.id);
    fetchFolders(+team.id);
  }, [team]);

  return (
    <div className="w-full">
      <div className="bg-secondary py-3 px-5 flex items-center justify-between">
        <p>Wiki</p>
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="pr-0 hover:cursor-pointer text-muted-foreground"
            >
              <AiOutlinePlus />
            </Button>
          </DialogTrigger>
          <DialogContent className="lg:w-[800px] sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>New wiki</DialogTitle>
            </DialogHeader>
            <CreateWikiForm
              onOpenChange={setOpen}
              team_id={+team?.id! as number}
            />
          </DialogContent>
        </Dialog>
      </div>
      {(isDocumentLoading || isFoldersLoading) && (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      )}

      {folders && documents && (
        <div>
          {folders?.map((folder) => (
            <FolderItem folder={folder} />
          ))}
          {documents?.map((document) => (
            <DocumentItem document={document} />
          ))}
        </div>
      )}
    </div>
  );
};
