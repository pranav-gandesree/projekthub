-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "liveLink" DROP NOT NULL;

-- CreateTable
CREATE TABLE "user_project_bookmarks" (
    "userId" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "user_project_bookmarks_pkey" PRIMARY KEY ("userId","projectId")
);

-- CreateTable
CREATE TABLE "_UserBookmarks" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserBookmarks_AB_unique" ON "_UserBookmarks"("A", "B");

-- CreateIndex
CREATE INDEX "_UserBookmarks_B_index" ON "_UserBookmarks"("B");

-- AddForeignKey
ALTER TABLE "user_project_bookmarks" ADD CONSTRAINT "user_project_bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_project_bookmarks" ADD CONSTRAINT "user_project_bookmarks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBookmarks" ADD CONSTRAINT "_UserBookmarks_A_fkey" FOREIGN KEY ("A") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBookmarks" ADD CONSTRAINT "_UserBookmarks_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
