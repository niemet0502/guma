export interface CreateOrganizationInput {
  name: string;
  size: string;
  logo: string;
}

export interface Organization {
  id: number;
  name: string;
  size: string;
  logo?: string;
}

export interface LabelApi {
  id: string;
  name: string;
  organization_id: number;
}
