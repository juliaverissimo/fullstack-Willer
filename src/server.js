import express from 'express';
import { prisma } from './lib/prisma.ts';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/usuarios", async (req, res) => {
    try {
        const { nome, idade } = req.body;

        const usuario = await prisma.usuarios.create({
            data: {
                nome,
                idade: Number(idade)
            }
        });

        res.json(usuario);

    } catch (erro) {
        console.error(erro);
        res.status(400).json({ erro: "Erro ao criar usuario" })
    }
});

app.get("/usuarios", async (req, res) => {
    const usuarios = await prisma.usuarios.findMany();

    res.json(usuarios)
});

app.get("/usuarios", async (req, res) => {
    const { id } = await prisma.usuarios.findUnique();

    const usuario = await prisma.usuarios.findUnique({
        where: {
            id: Number(req.params.id);
        }
    });
});

app.listen(PORT, () => {
    console.log("rodando....")
});