/*
  Warnings:

  - The values [CANCELLED] on the enum `Invoice_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `invoice` MODIFY `status` ENUM('PENDING', 'PAID', 'OVERDUE') NOT NULL DEFAULT 'PENDING';
