import { v4 } from "uuid";
import { Usuario } from "../../business/entities/Usuario";
import { MyDB } from "../../db/MyDB";
import { UsuarioService } from "../UsuarioService";
import { UsuarioRequestDto } from "../../dto/UsuarioRequestDto";
import { UsuarioRepositorio } from "../../business/repositories/UsuarioRepositorio";
import { UserType } from "../../business/entities/enum/UserType";
import Jimp from "jimp";
import utils from "../../utils";

export class UsuarioServiceImpl implements UsuarioService {

    usuarioRepositorio: UsuarioRepositorio;

    constructor(usuarioRepositorio: UsuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }
    async updateUsuarioCadastro(usuarioRequestDto: { email: string; name: string; cpf: string; idade: number; type: UserType; }, id: string): Promise<void> {
        const {cpf, name, email, idade} = usuarioRequestDto;
        const usuario = await this.usuarioRepositorio.findById(id);
        if(usuario){
            usuario.cpf = cpf;
            usuario.name = name;
            usuario.idade = idade;
            usuario.type = UserType.USER
            usuario.registered = true;
            await this.usuarioRepositorio.save(usuario);
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
        

        
    }
    async updateUsuario(file: Express.Multer.File, id: string): Promise<void> {
        
        const nomeImagem = await utils.processaImagemLocal(file, id, 800, 800);
  
        const usuario = await this.usuarioRepositorio.findById(id);
        if(usuario){
            usuario.photo = nomeImagem;
            await this.usuarioRepositorio.save(usuario);
        }

    }

    async criaUsuario(usuarioRequestDto: UsuarioRequestDto): Promise<Usuario> {
        const {cpf, name, email, type} = usuarioRequestDto;
        const usuarioNovo = new Usuario();
        usuarioNovo.cpf = cpf;
        usuarioNovo.email = email;
        usuarioNovo.name = name;
        usuarioNovo.type = type
    
       
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