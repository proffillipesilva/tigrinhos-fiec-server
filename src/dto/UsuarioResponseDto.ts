import { Usuario } from "../business/entities/Usuario"

export class UsuarioResponseDto {
    id: string
    name: string
    email: string

    public static from(usuario: Usuario): UsuarioResponseDto{
        const usuarioResponseDto = new UsuarioResponseDto();
        usuarioResponseDto.email = usuario.email;
        usuarioResponseDto.id = usuario.id;
        //usuarioResponseDto.name = usuario.name;
        return usuarioResponseDto;
    }
}