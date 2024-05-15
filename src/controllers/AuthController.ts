import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";
import { UsuarioRequestDtoParams, UsuarioRequestDtoValidation } from "../dto/UsuarioRequestDto";
import { ZodError } from "zod";
import { UsuarioResponseDto } from "../dto/UsuarioResponseDto";
import { AuthService } from "../services/AuthService";
import { OAuth2Client } from "google-auth-library";
import { UserType } from "../business/entities/enum/UserType";
import jwt from 'jsonwebtoken'


export class AuthController {

    authService: AuthService;
    usuarioService: UsuarioService;
    client: OAuth2Client;

    constructor(authService: AuthService, usuarioService: UsuarioService) {
        this.authService = authService;
        this.usuarioService = usuarioService;
        this.client = new OAuth2Client();
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

    loginWithGoogle = async (req: Request, res: Response) => {
        const jwtSecret = 'secret'
        const token = req.body.gtoken;
        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: "161121188224-jrs3tfapgni52qt4bctebtqrlcdh229g.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload: any = ticket.getPayload();
        const userid = payload['sub'];
        const email = payload.email;
        console.log(payload);
        try {
            const usuario = await this.authService.searchByEmail(email);
            const token = jwt.sign({ sub: usuario.email, id: usuario.id }, jwtSecret,
    
                {
                        expiresIn: '10m'
                });
                if(usuario.registered){
                    return res.status(200).json({token});
                } else {
                    return res.status(401).json({ usuario, token });
                }
            
        } catch(err){
            try{
                
                const usuario = await this.usuarioService.criaUsuario({
                    email: payload.email,
                    name: payload.name,
                    cpf: '',
                    idade: 0,
                    type: UserType.USER
                });
                
                //const token = jwt.sign({ sub: usuario.email, type: 0, id: usuario.id }, jwtSecret,
                const token = jwt.sign({ sub: usuario.email, id: usuario.id }, jwtSecret,
    
                    {
                            expiresIn: '10m'
                    });
                   
                
                return res.status(401).json({ usuario, token });
            } catch(err){
                return res.status(500).send("Error")
            }
        }
    }

}