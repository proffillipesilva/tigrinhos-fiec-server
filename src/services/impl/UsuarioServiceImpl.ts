import { v4 } from "uuid";
import { Usuario } from "../../business/entities/Usuario";
import { MyDB } from "../../db/MyDB";
import { UsuarioService } from "../UsuarioService";
import { UsuarioRequestDto } from "../../dto/UsuarioRequestDto";
import { UsuarioRepositorio } from "../../business/repositories/UsuarioRepositorio";


export class UsuarioServiceImpl implements UsuarioService {

    usuarioRepositorio: UsuarioRepositorio;

    constructor(usuarioRepositorio: UsuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    criaUsuario(usuarioRequestDto: UsuarioRequestDto): Promise<Usuario> {
        const {cpf, name, email} = usuarioRequestDto;
        const usuarioNovo = new Usuario();
        usuarioNovo.cpf = cpf;
        usuarioNovo.email = email;
        usuarioNovo.name = name;
    
       
        return this.usuarioRepositorio.save(usuarioNovo);

    }
    async listaUsuarios(): Promise<Usuario[]> {
        return this.usuarioRepositorio.find();
    }
    async pegaUsuario(id: string): Promise<Usuario | undefined> {
        return this.usuarioRepositorio.findById(id);
    }
    async deletaUsuario(id: string): Promise<void> {
        return this.usuarioRepositorio.removeById(id);
    }


    
}