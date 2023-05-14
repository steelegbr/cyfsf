-- CreateTable
CREATE TABLE "Guess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "distance" DECIMAL NOT NULL,
    "intersectLatitude" DECIMAL NOT NULL,
    "intersectLongitude" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "Percentile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "distance" DECIMAL NOT NULL
);
