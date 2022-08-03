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