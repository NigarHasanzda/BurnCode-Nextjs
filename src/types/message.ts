export interface MessageData {
  name: string;     
  surname: string;   
  phone: string;
  email: string;
  body: string;      
}

export interface MessageResponse {
  success: boolean;
  message: string;
  [key: string]: any;
}