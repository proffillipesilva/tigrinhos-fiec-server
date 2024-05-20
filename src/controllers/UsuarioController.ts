import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";
import { UsuarioRequestDtoParams, UsuarioRequestDtoValidation } from "../dto/UsuarioRequestDto";
import { ZodError } from "zod";
import { UsuarioResponseDto } from "../dto/UsuarioResponseDto";
import Stripe from "stripe";
import { efemeralData } from "../config/efemeral-data";

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

    updateUsuarioCadastro = async (req: Request, res: Response) => {
        try {
            const usuarioRequestDto = UsuarioRequestDtoValidation.parse(req.body);
            await this.usuarioService.updateUsuarioCadastro(usuarioRequestDto, req.params.id);         

            return res.status(200).send("ok");
        } catch (err) {
            console.log(err);
            return res.status(500).end('Nao pode criar usuario')
        }
    }

    updateUsuario = async (req: Request, res: Response) => {
        try {
            if(!req.file || !req.user ) throw new Error();
            const user = req.user as any;
            await this.usuarioService.updateUsuario(req.file, user.id);
            
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

    updateAccount = async (req: Request, res: Response) => {
        console.log(req.body)
        const { amount, token } = req.body;

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

        try {
          const charge = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            description: 'Charge for test@example.com',
          });
          console.log(charge)
          if(charge.client_secret)
             efemeralData[charge.client_secret] = amount/100;
          res.json(charge)
        } catch (err) {
          console.error(err);
          res.status(500).send('Payment failed');
        }
    };

    confirmPayment = async (req: Request, res: Response) => {
        console.log("Confirm Payment")
        const { clientSecret } = req.body;
        const user = req.user as any;
        console.log(user);
        console.log(efemeralData)
        try {
          const usuario = await this.usuarioService.pegaUsuario(user.id);
          if(usuario != null){
            usuario.balance += efemeralData[clientSecret] as number;
            await this.usuarioService.updateAccount(usuario)
          }
          res.json("ok")

        } catch (err) {
          console.error(err);
          res.status(500).send('Payment failed');
        }
    };
 
}