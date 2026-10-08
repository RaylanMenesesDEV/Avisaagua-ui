import "dotenv/config";
import prisma from "./src/lib/prisma.js";

async function testarConexao() {
  try {
    await prisma.$connect();

    console.log("✅ Prisma conectado ao PostgreSQL com sucesso!");

    const totalUsuarios = await prisma.usuario.count();

    console.log(`Total de usuários cadastrados: ${totalUsuarios}`);
  } catch (error) {
    console.error("❌ Erro ao conectar ao PostgreSQL:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

testarConexao();