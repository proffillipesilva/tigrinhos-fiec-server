import { Usuario } from "../business/entities/Usuario";
import { UsuarioRequestDto } from "../dto/UsuarioRequestDto";

export interface UsuarioService {
    criaUsuario(usuarioRequestDto: UsuarioRequestDto) : Promise<Usuario>;
    updateUsuarioCadastro(usuarioRequestDto: UsuarioRequestDto, id: string) : Promise<void>;
    updateUsuario(file: Express.Multer.File, id: string) : Promise<void>;
    listaUsuarios() : Promise<Usuario[]>;
    pegaUsuario(id: string) : Promise<Usuario | undefined>;
    deletaUsuario(id: string) : Promise<void>
    updateAccount(usuario: Usuario) : Promise<void>

}