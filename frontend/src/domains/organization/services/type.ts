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
