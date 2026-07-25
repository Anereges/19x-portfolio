/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `resumes` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_resumes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "location" TEXT,
    "website" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "summary" TEXT NOT NULL,
    "profileImage" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "resumes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_resumes" ("createdAt", "email", "fullName", "github", "id", "isPublic", "linkedin", "location", "phone", "summary", "title", "updatedAt", "userId", "website") SELECT "createdAt", "email", "fullName", "github", "id", "isPublic", "linkedin", "location", "phone", "summary", "title", "updatedAt", "userId", "website" FROM "resumes";
DROP TABLE "resumes";
ALTER TABLE "new_resumes" RENAME TO "resumes";
CREATE UNIQUE INDEX "resumes_userId_key" ON "resumes"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
