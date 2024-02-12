-- CreateTable
CREATE TABLE "Tour" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "city" STRING NOT NULL,
    "country" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,
    "image" STRING,
    "stops" JSONB NOT NULL,

    CONSTRAINT "Tour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "clerkId" STRING NOT NULL,
    "tokens" INT4 NOT NULL DEFAULT 1000,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("clerkId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tour_city_country_key" ON "Tour"("city", "country");
