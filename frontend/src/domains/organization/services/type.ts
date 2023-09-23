export interface CreateOrganizationInput {
  name: string;
  size: string;
  logo: string;
}

export interface Organization {
  id: string;
  name: string;
  size: string;
  logo?: string;
}
