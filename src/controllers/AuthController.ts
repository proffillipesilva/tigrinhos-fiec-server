import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";
import { UsuarioRequestDtoParams, UsuarioRequestDtoValidation } from "../dto/UsuarioRequestDto";
import { ZodError } from "zod";
import { UsuarioResponseDto } from "../dto/UsuarioResponseDto";
import { AuthService } from "../services/AuthService";

export class AuthController {

    authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const token = await this.authService.login(email, password);
        if (token) {
            res.json({ token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    }

}