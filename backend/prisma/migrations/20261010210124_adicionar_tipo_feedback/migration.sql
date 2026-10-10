-- CreateEnum
CREATE TYPE "TipoFeedback" AS ENUM ('PROBLEMA', 'SUGESTAO', 'ELOGIO');

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "tipo" "TipoFeedback" NOT NULL DEFAULT 'PROBLEMA';
