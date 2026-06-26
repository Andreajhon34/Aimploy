export type CoverLetter = {
  id: string;
  content: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  createdAt: Date;
};
