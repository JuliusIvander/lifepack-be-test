-- CreateTable
CREATE TABLE `PharmacyProduct` (
    `ProductId` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,
    `SKU` VARCHAR(255) NOT NULL,
    `Price` INTEGER NOT NULL,
    `PriceConfigurationId` INTEGER NOT NULL,
    `IsTaxIncluded` BOOLEAN NOT NULL,
    `Stock` INTEGER NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PharmacyProduct_SKU_key`(`SKU`),
    PRIMARY KEY (`ProductId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `RoleId` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(32) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`RoleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `UserId` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,
    `RoleId` INTEGER NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`UserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clinic` (
    `ClinicId` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,
    `Address` VARCHAR(255) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ClinicId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prescription` (
    `PrescriptionId` INTEGER NOT NULL AUTO_INCREMENT,
    `PatientId` INTEGER NOT NULL,
    `DoctorId` INTEGER NOT NULL,
    `ClinicId` INTEGER NOT NULL,
    `Status` VARCHAR(32) NOT NULL DEFAULT 'Created',
    `TotalPrice` INTEGER NOT NULL DEFAULT 0,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`PrescriptionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrescriptionDetails` (
    `PrescriptionDetailsId` INTEGER NOT NULL AUTO_INCREMENT,
    `PrescriptionId` INTEGER NOT NULL,
    `ProductId` INTEGER NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `Price` INTEGER NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`PrescriptionDetailsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_RoleId_fkey` FOREIGN KEY (`RoleId`) REFERENCES `Role`(`RoleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prescription` ADD CONSTRAINT `Prescription_PatientId_fkey` FOREIGN KEY (`PatientId`) REFERENCES `User`(`UserId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prescription` ADD CONSTRAINT `Prescription_DoctorId_fkey` FOREIGN KEY (`DoctorId`) REFERENCES `User`(`UserId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prescription` ADD CONSTRAINT `Prescription_ClinicId_fkey` FOREIGN KEY (`ClinicId`) REFERENCES `Clinic`(`ClinicId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrescriptionDetails` ADD CONSTRAINT `PrescriptionDetails_PrescriptionId_fkey` FOREIGN KEY (`PrescriptionId`) REFERENCES `Prescription`(`PrescriptionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrescriptionDetails` ADD CONSTRAINT `PrescriptionDetails_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `PharmacyProduct`(`ProductId`) ON DELETE RESTRICT ON UPDATE CASCADE;
