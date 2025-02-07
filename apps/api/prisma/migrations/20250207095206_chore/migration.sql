/*
  Warnings:

  - You are about to drop the column `DeletedAt` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `DeletedAt`,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;
