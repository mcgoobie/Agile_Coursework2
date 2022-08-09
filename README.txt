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


2. Booking Table
CREATE TABLE booking (
    bookingId int NOT NULL AUTO_INCREMENT,
    userId int NOT NULL,
	date date NOT NULL,
    time varchar(126) NOT NULL,
    donationType1 varchar(255) NOT NULL,
    donationDesc1 varchar(255) NOT NULL,
    donationType2 varchar(255),
    donationDesc2 varchar(255),
    donationType3 varchar(255),
    donationDesc3 varchar(255),
    primary key(bookingId),
    FOREIGN KEY (userId) REFERENCES user(userId)
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

3. Insert rewards DATA
INSERT INTO reward (rewardName, category, points, description, imagePath)VALUES('POPULAR $20 Voucher', 'couponVoucher', 200, 'Valid at all POPULAR Bookstores, UrbanWrite stores and CD-RAMA outlets islandwide.' , '/img/voucher1.jpg');
INSERT INTO reward (rewardName, category, points, description, imagePath)VALUES('GOLDEN VILLAGE $10 Voucher', 'couponVoucher', 100, 'One Golden Village All Days Movie eVoucher to be redeemed on www.gv.com.sg or iGV App (both iOS and Android)' , '/img/voucher2.jpg');
INSERT INTO reward (rewardName, category, points, description, imagePath)VALUES('CATHAY CINEPLEX $30 Voucher', 'couponVoucher', 300, 'Available at all outlets islandwide.' , '/img/voucher3.jpg');
INSERT INTO reward (rewardName, category, points, description, imagePath)VALUES('SAMSUNG MICROWAVE OVEN', 'householdAppliance', 700, 'A variety of fresh and healthy meals are at your fingertips with 15 pre-set cook modes on the Samsung MC28 Smart Oven. Now you can confidently and conveniently cook everything from broccoli to brown rice, boneless chicken breast to fresh salmon fillets.' , '/img/appliance1.jpg');
INSERT INTO reward (rewardName, category, points, description, imagePath)VALUES('SAMSUNG ROBOT CLEANER', 'householdAppliance', 1500, 'Save time and effort by cleaning and mopping at once! The 2-in-1 Vacuum and Mop Cleaning System captures dust and dirt and mops the floor to clean effectively. The water tank detects if a mop pad is attached and automatically switches on the mopping and adjusts the amount of water.' , '/img/appliance2.jpg');
INSERT INTO reward (rewardName, category, points, description, imagePath)VALUES('ADICOLOR CLASSICS 3-STRIPES TEE', 'fashion', 600, 'No need to overcomplicate things — this adidas t-shirt is all about ease. Keep your vibe real, real chill with the understated look. Though it does not give into full minimalism. The comfort goes all out, thanks to the super soft cotton build.' , '/img/fashion1.jpg');
INSERT INTO reward (rewardName, category, points, description, imagePath)VALUES('ARSENAL 22/23 AWAY JERSEY', 'fashion', 600, 'The cannon badge. The concrete sculpture-inspired signoff. All the way down to its bronze trim, this adidas Arsenal football jersey comes loaded with Emirates Stadium landmarks. Whatever match day looks like for you, this supporter-focused shirt will keep you comfortable with moisture-absorbing AEROREADY and mesh panels.' , '/img/fashion2.jpg');

