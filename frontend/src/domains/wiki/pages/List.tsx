import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/domains/auth/providers/auth";
import { useGetTeam } from "@/domains/teams/hooks/useGetTeam";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { DocumentItem } from "../documents/components/DocumentItem";
import { useDocuments } from "../documents/hooks/useDocuments";
import { CreateWikiDropdown } from "../folders/components/CreateWikiDropdown";
import { FolderItem } from "../folders/components/FolderItem";
import { useFolders } from "../folders/hooks/useFolders";

export const Wiki: React.FC = () => {
  const { project } = useAuth();
  const { teamId } = useParams<{ teamId: string }>();

  const { data: team } = useGetTeam(project?.id as number, teamId);

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

  useEffect(() => {
    if (!team) return;
    fetchDocuments(+team.id);
    fetchFolders(+team.id);
  }, [team]);

  return (
    <div className="w-full h-full">
      <div className="bg-secondary py-3 px-5 flex items-center justify-between sticky top-0 z-40">
        <p>Wiki</p>

        <CreateWikiDropdown team={team}>
          <Button variant="ghost" size="sm">
            <AiOutlinePlus />
          </Button>
        </CreateWikiDropdown>
      </div>

      {(isDocumentLoading || isFoldersLoading) && (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      )}

      {folders && documents && (
        <>
          <div>
            {folders?.map((folder) => (
              <FolderItem folder={folder} />
            ))}
            {documents?.map((document) => (
              <DocumentItem document={document} />
            ))}
          </div>

          {folders.length === 0 && documents.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <div className="flex flex-col gap-3 border bg-secondary rounded p-8 mb-[150px] w-[400px] shadow-xl">
                <div className="flex gap-3 items-center">
                  <HiOutlineDocumentDuplicate className="text-3xl mt-2" />{" "}
                  <h1 className="text-4xl">Wiki</h1>
                </div>
                <p>There are no folders or documents for this team yet.</p>

                <p>
                  Once you have created wiki for your team they will show up
                  here.
                </p>

                <CreateWikiDropdown team={team}>
                  <Button className="mt-3">Create a wiki</Button>
                </CreateWikiDropdown>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
