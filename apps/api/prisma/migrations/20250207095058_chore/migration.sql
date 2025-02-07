-- AlterTable
ALTER TABLE `client` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `invoice` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `personnel` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NULL;
