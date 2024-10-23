-- CreateTable
CREATE TABLE "InviteLink" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "InviteLink_pkey" PRIMARY KEY ("id")
);
