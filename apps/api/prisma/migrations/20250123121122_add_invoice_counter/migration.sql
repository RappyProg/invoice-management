-- CreateTable
CREATE TABLE `InvoiceCounter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `lastInvoiceNumber` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `InvoiceCounter_client_id_key`(`client_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InvoiceCounter` ADD CONSTRAINT `InvoiceCounter_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
