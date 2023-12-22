import { AxiosResponse } from "axios";
import api from "../axios";
import { User } from "../models/User";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<User[]>> {
    return api.get<User[]>("/users");
  }
}
