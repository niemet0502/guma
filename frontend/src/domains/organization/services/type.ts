export interface CreateOrganizationInput {
  name: string;
  size: string;
  logo: string;
}

export interface Project {
  id: number;
  name: string;
  size: string;
  logo?: string;
}

export interface LabelApi {
  id: string;
  name: string;
  project_id: number;
}
