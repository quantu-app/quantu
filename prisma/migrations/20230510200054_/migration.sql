/*
  Warnings:

  - You are about to drop the `ApplicationSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Email` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OldPasswords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ChannelMembershipRole" AS ENUM ('OWNER', 'MEMBER');

-- CreateEnum
CREATE TYPE "ChallengeType" AS ENUM ('MULTIPLE_CHOICE');

-- DropForeignKey
ALTER TABLE "ApplicationSettings" DROP CONSTRAINT "ApplicationSettings_userId_fkey";

-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_userId_fkey";

-- DropForeignKey
ALTER TABLE "OldPasswords" DROP CONSTRAINT "OldPasswords_userId_fkey";

-- DropTable
DROP TABLE "ApplicationSettings";

-- DropTable
DROP TABLE "Email";

-- DropTable
DROP TABLE "OldPasswords";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "encrypted_password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "creator" BOOLEAN NOT NULL DEFAULT false,
    "confirmed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emails" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT false,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "confirmedAt" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "emails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "old_passwords" (
    "id" SERIAL NOT NULL,
    "encrypted_password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "old_passwords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_settings" (
    "id" SERIAL NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "application_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channel_memberships" (
    "id" SERIAL NOT NULL,
    "role" "ChannelMembershipRole" NOT NULL DEFAULT 'MEMBER',
    "user_id" INTEGER NOT NULL,
    "channel_id" INTEGER NOT NULL,

    CONSTRAINT "channel_memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenges" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" JSONB NOT NULL,
    "type" "ChallengeType" NOT NULL DEFAULT 'MULTIPLE_CHOICE',
    "prompt" JSONB NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT false,
    "released_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "channel_id" INTEGER NOT NULL,
    "creator_id" INTEGER NOT NULL,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge_results" (
    "id" SERIAL NOT NULL,
    "type" "ChallengeType" NOT NULL DEFAULT 'MULTIPLE_CHOICE',
    "prompt" JSONB NOT NULL,
    "answer" JSONB NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "challenge_id" INTEGER NOT NULL,

    CONSTRAINT "challenge_results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "emails_user_id_email_key" ON "emails"("user_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "old_passwords_userId_encrypted_password_key" ON "old_passwords"("userId", "encrypted_password");

-- CreateIndex
CREATE UNIQUE INDEX "application_settings_user_id_key" ON "application_settings"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "application_settings_user_id_id_key" ON "application_settings"("user_id", "id");

-- CreateIndex
CREATE UNIQUE INDEX "channel_memberships_user_id_channel_id_key" ON "channel_memberships"("user_id", "channel_id");

-- CreateIndex
CREATE UNIQUE INDEX "channels_uri_key" ON "channels"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "challenges_channel_id_url_key" ON "challenges"("channel_id", "url");

-- CreateIndex
CREATE UNIQUE INDEX "challenge_results_user_id_challenge_id_key" ON "challenge_results"("user_id", "challenge_id");

-- AddForeignKey
ALTER TABLE "emails" ADD CONSTRAINT "emails_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "old_passwords" ADD CONSTRAINT "old_passwords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_settings" ADD CONSTRAINT "application_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel_memberships" ADD CONSTRAINT "channel_memberships_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel_memberships" ADD CONSTRAINT "channel_memberships_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_results" ADD CONSTRAINT "challenge_results_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_results" ADD CONSTRAINT "challenge_results_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
