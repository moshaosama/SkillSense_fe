export interface UserType {
  access_token: string;
  data: {
    avatar: string;
    email: string;
    id: string;
    password: string;
    user_name: string;
    created_at?: string;
    is_premium?: string;
  };
  statusbar: string;
}
