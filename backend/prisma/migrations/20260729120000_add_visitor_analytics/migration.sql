-- CreateTable
CREATE TABLE "visitors" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "source" TEXT,
    "referrer" TEXT,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "country" TEXT,
    "city" TEXT,
    "device" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "firstVisit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastVisit" TIMESTAMP(3) NOT NULL,
    "visitCount" INTEGER NOT NULL DEFAULT 1,
    "pagesViewed" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "visitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_views" (
    "id" SERIAL NOT NULL,
    "visitorId" INTEGER NOT NULL,
    "page" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER,

    CONSTRAINT "page_views_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "visitors_sessionId_key" ON "visitors"("sessionId");

-- CreateIndex
CREATE INDEX "visitors_source_idx" ON "visitors"("source");

-- CreateIndex
CREATE INDEX "visitors_firstVisit_idx" ON "visitors"("firstVisit");

-- CreateIndex
CREATE INDEX "page_views_page_idx" ON "page_views"("page");

-- CreateIndex
CREATE INDEX "page_views_timestamp_idx" ON "page_views"("timestamp");

-- AddForeignKey
ALTER TABLE "page_views"
ADD CONSTRAINT "page_views_visitorId_fkey"
FOREIGN KEY ("visitorId")
REFERENCES "visitors"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;
