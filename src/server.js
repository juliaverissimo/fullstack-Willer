import express from 'express';
import { prisma } from './lib/prisma.ts';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/usuarios", async (req, res) => {
    const {nome, idade} = req.body;

    const usuario = await prisma.usuario.create({
        data: {
            nome,
            idade: Number(idade)
        }
    });

    res.json(usuario);
});

app.listen(PORT, () => {
    console.log("rodando....")
});