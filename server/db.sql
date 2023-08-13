--@block
CREATE TABLE "Users"(
  "userID" SERIAL PRIMARY KEY,
  "raindropID" INT NULL,
  "wins" INT NOT NULL,
  "displayName" VARCHAR(20) NOT NULL
);
--@block
CREATE TABLE "Raindrops"(
    "raindropID" SERIAL PRIMARY KEY,
    "votes" BIGINT NOT NULL,
    "isWinner" BOOL NOT NULL
);
--@block
ALTER TABLE "Users" ADD CONSTRAINT "users_raindropid_foreign" FOREIGN KEY("raindropID") REFERENCES "Raindrops"("raindropID");
