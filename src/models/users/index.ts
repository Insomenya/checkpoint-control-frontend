import { User } from "../auth";
import { GetResponseDTO } from "../common";

export type GetUsersResponseDTO = GetResponseDTO<User>;

export type PostAddUserRequestDTO = Omit<User, 'id'>;

export type DeleteUserRequestDTO = Pick<User, 'id'>;
