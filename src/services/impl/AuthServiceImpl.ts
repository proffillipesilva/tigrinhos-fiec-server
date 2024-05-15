import { Usuario } from "../../business/entities/Usuario";
import { UsuarioRepositorio } from "../../business/repositories/UsuarioRepositorio";
import { AuthService } from "../AuthService";
import jwt from 'jsonwebtoken'

export class AuthServiceImpl implements AuthService {

    usuarioRepositorio: UsuarioRepositorio;
    constructor(usuarioRepositorio: UsuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }
    async searchByEmail(email: string): Promise<Usuario> {
        const jwtSecret = 'secret'
        const usuario = await this.usuarioRepositorio.findOneQuery({ email })
        if (usuario){
            return Promise.resolve(usuario);
        }
        return Promise.reject();
    }
    async login(email: string, password: string): Promise<string> {
        const jwtSecret = 'secret'
        const usuario = await this.usuarioRepositorio.findOneQuery({ email })
        if (usuario) {
            //const token = jwt.sign({ sub: usuario.email, type: 0, id: usuario.id }, jwtSecret,
            const token = jwt.sign({ sub: usuario.email, id: usuario.id }, jwtSecret,
    
            {
                    expiresIn: '10m'
                });
            return Promise.resolve(token)
        }
        return Promise.reject();

    }

}