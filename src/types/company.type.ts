type CompanyType = {
  name: string;
  businessId: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  facebook: string;
  linkedIn: string;
  companyType: CompanyTypes;
  coverImage: {
    url: string;
  };
};

export default CompanyType;

export enum ECompanyType {
  OUR_COMPANY = 'OurCompany',
  PARTNER = 'PARTNER',
}

export type CompanyTypes = ECompanyType.OUR_COMPANY | ECompanyType.PARTNER;
