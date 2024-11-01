-- CreateTable
CREATE TABLE "UserDetails" (
    "userId" TEXT NOT NULL,
    "twitter" TEXT,
    "github" TEXT,
    "portfolio" TEXT,
    "bio" TEXT,

    CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
