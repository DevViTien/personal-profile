export interface Address {
  full: string;
  short: string;
  mapUrl: string;
}

export interface SocialLinks {
  github: string;
  facebook: string;
  linkedin: string;
  twitter: string;
}

export interface Education {
  period: string;
  major: string;
  school: string;
  description: string;
}

export interface SkillCategory {
  type: string;
  data: string[];
}

export interface Experience {
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  projects: string[];
}

export interface Award {
  year: string;
  description: string;
}

export interface ProfileData {
  name: string;
  slug: string;
  title: string;
  email: string;
  phone: string;
  gender: string;
  birthDate: string;
  address: Address;
  bio: string;
  avatarUrl: string;
  socialLinks: SocialLinks;
  education: Education[];
  skills: SkillCategory[];
  experience: Experience[];
  awards: Award[];
  hobbies: string[];
}
