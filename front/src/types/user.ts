export type TComment = {
    id: number,
    name: string,
    country: string,
    comment: string
}
// src/types/user.ts

export interface TUserData {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  country?: string;
  age?: number;
  gender?: string;
  education_level?: string;
  japanese_level?: string;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
}