// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}
//Developement

 //datasource db {
   //provider = "sqlite"
   //url      = env("DATABASE_URL")
 //}

// PRODUCTION avec Postgres DB IN VERCEL 
// datasource db {
//   provider = "postgresql"
//   url = env("POSTGRES_PRISMA_URL") // uses connection pooling
//   directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
// }
// PRODUCTION avec Postgres DB IN NEON


datasource db {
  provider  = "postgresql"
  url  	    = env("DATABASE_URL")
  // uncomment next line if you use Prisma <5.10
   // = env("DATABASE_URL_UNPOOLED")
}

model User {
  id            String          @id
  firstName     String
  lastName      String
  email         String
  avatarUrl     String?
  createdAt     DateTime        @default(now())
  Property      Property[]
  subscriptions Subscriptions[]

}

model Property {
  id          Int               @id @default(autoincrement())
  name        String
  description String
  price       Int
  userId      String
  user        User              @relation(fields: [userId], references: [id])
  typeId      Int
  type        PropertyType      @relation(fields: [typeId], references: [id])
  statusId    Int
  status      PropertyStatus    @relation(fields: [statusId], references: [id])
  location    PropertyLocation?
  feature     PropertyFeature?
  images      PropertyImage[]
  videos      PropertyVideo[]   // Nouvelle relation pour les vidéos
  contact     Contact?
  createdAt   DateTime @default(now()) // Nouvelle colonne
}

model PropertyType {
  id       Int        @id @default(autoincrement())
  value    String @unique
  Property Property[]
}

model PropertyStatus {
  id       Int        @id @default(autoincrement())
  value    String @unique
  Property Property[]
}

model PropertyLocation {
  id            Int      @id @default(autoincrement())
  streetAddress String
  city          String
  state         String
  zip           String
  region        String
  landmark      String
  propertyId    Int      @unique
  property      Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)
}

model PropertyFeature {
  id              Int      @id @default(autoincrement())
  bedrooms        Int
  bathrooms       Int
  parkingSpots    Int
  area            Int
  hasSwimmingPool Boolean
  hasGardenYard   Boolean
  hasBalcony      Boolean
  property        Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  propertyId      Int      @unique
}

model PropertyImage {
  id         Int      @id @default(autoincrement())
  url        String
  property   Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  propertyId Int
}

model PropertyVideo {
  id          Int      @id @default(autoincrement())
  url         String   // Lien YouTube de la vidéo
  propertyId  Int      // Référence à la propriété associée
  property    Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now()) // Date d'ajout
}


model Contact {
  id         Int      @id @default(autoincrement())
  name       String
  phone      String
  email      String
  property   Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  propertyId Int      @unique
}

model SubscriptionPlan {
  id                    Int             @id @default(autoincrement())
  namePlan              String
  price                 Float // Prix en euros
  duration           String   @default("AN")// Durée, ex: "AN" ou"Mois"
  country            String   // Pays concerné
  startDate          DateTime // Date de début
  endDate            DateTime // Date de fin
  premiumAds         Int      // Nombre d'annonces premium incluses
  photosPerAd        Int      // Nombre de photos par annonce
  shortVideosPerAd   Int      // Nombre de vidéos courtes par annonce
  youtubeVideoDuration String // Durée des vidéos YouTube
  zoneRadius         Int      // Zone de couverture (en km)
  features              String
  createdAt          DateTime @default(now()) // Date de création du plan
  updatedAt          DateTime @updatedAt // Dernière mise à jour
  subscriptions         Subscriptions[]
}

model Subscriptions {
  id        Int              @id @default(autoincrement())
  paymentID String
  createdAt DateTime         @default(now())
  updatedAt DateTime         @updatedAt
  startDate DateTime
  endDate DateTime
  plan      SubscriptionPlan @relation(fields: [palnId], references: [id])
  palnId    Int
  userId    String
  user      User             @relation(fields: [userId], references: [id])
}














-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Property" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Property_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Property_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PropertyType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Property_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "PropertyStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PropertyType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PropertyStatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PropertyLocation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "streetAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "landmark" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    CONSTRAINT "PropertyLocation_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PropertyFeature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "parkingSpots" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "hasSwimmingPool" BOOLEAN NOT NULL,
    "hasGardenYard" BOOLEAN NOT NULL,
    "hasBalcony" BOOLEAN NOT NULL,
    "propertyId" INTEGER NOT NULL,
    CONSTRAINT "PropertyFeature_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PropertyImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    CONSTRAINT "PropertyImage_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PropertyVideo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PropertyVideo_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    CONSTRAINT "Contact_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "namePlan" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "duration" TEXT NOT NULL DEFAULT 'AN',
    "country" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "premiumAds" INTEGER NOT NULL,
    "photosPerAd" INTEGER NOT NULL,
    "shortVideosPerAd" INTEGER NOT NULL,
    "youtubeVideoDuration" TEXT NOT NULL,
    "zoneRadius" INTEGER NOT NULL,
    "features" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Subscriptions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paymentID" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "palnId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Subscriptions_palnId_fkey" FOREIGN KEY ("palnId") REFERENCES "SubscriptionPlan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);


-- CreateIndex
CREATE UNIQUE INDEX "PropertyType_value_key" ON "PropertyType"("value");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyStatus_value_key" ON "PropertyStatus"("value");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyLocation_propertyId_key" ON "PropertyLocation"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyFeature_propertyId_key" ON "PropertyFeature"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_propertyId_key" ON "Contact"("propertyId");
