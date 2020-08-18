import axios, { AxiosResponse } from 'axios';
import { User } from "../models/common";

export default class UserService {
  private serverUrl: string;
  private hasTimeout: boolean = false;
  public static TIME_OUT:number = 1000;
  
  public constructor(serverUrl: string, hasTimeOut?: boolean) {
    this.serverUrl = serverUrl;
  }

  private waitFor(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async getAllUsers() : Promise<User[]> {
    this.hasTimeout && this.waitFor(UserService.TIME_OUT);
    return (await axios.get(`${this.serverUrl}/user/all`)).data as User[];
  }

  public async addUser(firstName: string, lastName:string) : Promise<boolean> {
    this.hasTimeout && this.waitFor(UserService.TIME_OUT);
    try {
      const res = await axios.post(`${this.serverUrl}/user/add`, {
        firstName, lastName
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  public getUser(id: number) : Promise <AxiosResponse> {
    this.hasTimeout && this.waitFor(UserService.TIME_OUT);
    return axios.post(`${this.serverUrl}/getById/${id}`);
  }

}