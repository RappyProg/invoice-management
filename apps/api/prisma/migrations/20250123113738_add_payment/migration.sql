/*
  Warnings:

  - Added the required column `paymentMethod` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `paymentMethod` ENUM('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL') NOT NULL;
