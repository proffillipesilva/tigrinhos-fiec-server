import { Usuario } from "../business/entities/Usuario";

export interface AuthService {
    login(email: string, password: string) : Promise<string>;
    searchByEmail(email: string) : Promise<Usuario>;

   
}