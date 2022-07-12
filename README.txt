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