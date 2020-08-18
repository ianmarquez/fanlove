export interface BaseAction{ 
  type: string;
  payload?: any;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
}