-- CreateTable
CREATE TABLE "portfolios" (
    "id" SERIAL NOT NULL,
    "githubLink" TEXT NOT NULL,
    "portfolioLink" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "portfolios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
