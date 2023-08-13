--@block
CREATE TABLE `Users`(
    `userID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `raindropID` INT UNSIGNED NULL,
    `wins` INT UNSIGNED NOT NULL,
    `displayName` VARCHAR(255) NOT NULL
);
--@block
CREATE TABLE `Raindrops`(
    `raindropID` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `votes` BIGINT UNSIGNED NOT NULL,
    `isWinner` BOOL
);
--@block
ALTER TABLE `Users` ADD CONSTRAINT `users_raindropid_foreign` FOREIGN KEY(`raindropID`) REFERENCES `Raindrops`(`raindropID`);
