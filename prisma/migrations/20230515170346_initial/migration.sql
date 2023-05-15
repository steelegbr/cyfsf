-- CreateTable
CREATE TABLE "Guess" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "distance" DECIMAL(65,30) NOT NULL,
    "intersectLatitude" DECIMAL(65,30) NOT NULL,
    "intersectLongitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Guess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Percentile" (
    "id" INTEGER NOT NULL,
    "distance" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Percentile_pkey" PRIMARY KEY ("id")
);
