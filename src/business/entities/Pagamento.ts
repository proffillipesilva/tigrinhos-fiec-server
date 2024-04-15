import { ObjectId, Schema } from "mongoose";

class Pagamento {
    id: String
    usuarioId: string
    usuarioName: string
    gameId: string
    gameName: string
    payAt: Date
    payValue: Float32Array
}

export const PagamentoModel = new Schema<Pagamento>({
    usuarioId: { type: String, required: true },
    gameId: { type: String, required: true },
    usuarioName: { type: String, required: true },
    gameName: { type: String, required: true },
    payAt: { type: Date, required: true},
    payValue: { type: Float32Array ,required: true}
});
    