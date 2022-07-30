SQL CREATION STATEMENTS FOR uGiveDb

1. User Table
CREATE TABLE user (
    userId int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
    fName varchar(255) NOT NULL,
    lName varchar(255) NOT NULL,
    DoB date NOT NULL,
	   mobileNumber nvarchar(8) NOT NULL,
    emailAddr varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    postalCode nvarchar(6) NOT NULL,
    password varchar(255),
    primary key(userId)
);

2. Rewards Table
CREATE TABLE reward (
	rewardID int NOT NULL auto_increment,
    rewardName varchar(255) NOT NULL UNIQUE,
    category varchar(255) NOT NULL,
    points int NOT NULL,
    description varchar(255) NOT NULL,
    imagePath varchar(255) NOT NULL,
    primary key(rewardID)
);

3. Insert reward DATA
INSERT INTO reward (rewardName, category, points, description, imagePath)VALUES('POPULAR $20 Voucher', 'couponVoucher', 200, 'Valid at all POPULAR Bookstores, UrbanWrite stores and CD-RAMA outlets islandwide.' , '/img/voucher1.jpg');
INSERT INTO reward (rewardName, category, points, description, imagePath)VALUES('GOLDEN VILLAGE $10 Voucher', 'couponVoucher', 100, 'One Golden Village All Days Movie eVoucher to be redeemed on www.gv.com.sg or iGV App (both iOS and Android)' , '/img/voucher2.jpg');
INSERT INTO reward (rewardName, category, points, description, imagePath)VALUES('CATHAY CINEPLEX $30 Voucher', 'couponVoucher', 300, 'Available at all outlets islandwide.' , '/img/voucher3.jpg');