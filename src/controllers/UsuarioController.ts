import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";
import { UsuarioRequestDtoParams, UsuarioRequestDtoValidation } from "../dto/UsuarioRequestDto";
import { ZodError } from "zod";
import { UsuarioResponseDto } from "../dto/UsuarioResponseDto";

export class UsuarioController {

    usuarioService: UsuarioService;

    constructor(usuarioService: UsuarioService) {
        this.usuarioService = usuarioService;
    }

    criaUsuario = async (req: Request, res: Response) => {
        try {
            const usuarioRequestDto = UsuarioRequestDtoValidation.parse(req.body);
            const usuarioNovo = await this.usuarioService.criaUsuario(usuarioRequestDto);
            const usuarioResponseDto = UsuarioResponseDto.from(usuarioNovo);
            return res.status(201).json(usuarioResponseDto);
        } catch (err) {
            if(err instanceof ZodError){
                return res.status(400).json(err.issues);
            }
            return res.status(500).end('Nao pode criar usuario')
        }
    }

    updateUsuario = async (req: Request, res: Response) => {
        try {
            if(!req.file) throw new Error();
            await this.usuarioService.updateUsuario(req.file, req.params.id);
            
            return res.status(200).send("ok");
        } catch (err) {
            
            return res.status(500).end('Nao pode criar usuario')
        }
    }

    listaUsuarios = async (req: Request, res: Response) => {
        const usuarios = await this.usuarioService.listaUsuarios();
        const usuariosDto = usuarios.map(u => UsuarioResponseDto.from(u))
        return res.json(usuariosDto);
    }

    pegaUsuario = async (req: Request, res: Response) => {
        try {
            const params = UsuarioRequestDtoParams.parse(req.params)
            const usuario = await this.usuarioService.pegaUsuario(params.id);
            if(usuario)
                return res.status(200).json(UsuarioResponseDto.from(usuario));
            else
                return res.status(404).end("User Not found")

        } catch (err) {
            return res.status(404).end("User Not found")
        }
    }

    deletaUsuario = async (req: Request, res: Response) => {
        try {
            const params = UsuarioRequestDtoParams.parse(req.params)
            await this.usuarioService.deletaUsuario(params.id);
            return res.status(200).end("Usuario removido");
        } catch (err) {
            return res.status(404).end("User Not found")
        }
    }

}