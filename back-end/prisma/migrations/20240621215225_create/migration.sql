-- AlterTable
ALTER TABLE "threads" ADD COLUMN     "cardId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "votes" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
