import { DocumentApi } from "@/domains/wiki/documents/type";
import { getTimeAgoString } from "@/lib/utils";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { NavLink, useParams } from "react-router-dom";

export const ModuleDocumentItem: React.FC<{ document: DocumentApi }> = ({
  document,
}) => {
  const { orgaId, teamId } = useParams<{ orgaId: string; teamId: string }>();

  return (
    <NavLink to={`/${orgaId}/team/${teamId}/wiki/doc/${document.id}`}>
      <div className="border flex flex-col gap-2 rounded-sm p-2 bg-secondary mt-1 hover:cursor-pointer">
        <div className="flex gap-2 items-center">
          <HiOutlineDocumentDuplicate className="text-base mt-1" />
          <span className="font-medium">{document.name}</span>
        </div>
        <div className="flex gap-2 pl-7">
          <p>crée il y'a {getTimeAgoString(document.updated_at)}</p> par{" "}
          {document.author?.username}
        </div>
      </div>
    </NavLink>
  );
};
