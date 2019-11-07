export interface User {
  login: string;
  email: string;
  native_lang: string;
  current_target_lang: string;
	id?: number;
  password?: string;
  name?: string;
  surname?: string;
  date_of_birth?: number|null;
  date_of_reg?: number|null;
  admin?: boolean;
}