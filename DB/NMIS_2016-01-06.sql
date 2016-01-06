# ************************************************************
# Sequel Pro SQL dump
# Version 4135
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 10.7.145.68 (MySQL 5.5.36)
# Database: NMIS
# Generation Time: 2016-01-06 05:56:09 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table audit
# ------------------------------------------------------------

DROP TABLE IF EXISTS `audit`;

CREATE TABLE `audit` (
  `AuditID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) NOT NULL,
  `Editor` varchar(3000) NOT NULL,
  `Formname` varchar(30) NOT NULL,
  `Whenpost` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IP` varchar(30) DEFAULT NULL,
  KEY `auditID` (`AuditID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Dump of table calibratorqc
# ------------------------------------------------------------

DROP TABLE IF EXISTS `calibratorqc`;

CREATE TABLE `calibratorqc` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `readingTc99m` double DEFAULT '0',
  `calibratorId` varchar(50) NOT NULL,
  `readingGa67` double DEFAULT NULL,
  `readingTl201` double DEFAULT NULL,
  `readingI131` double DEFAULT NULL,
  `readingIn111` double DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Staff ID` (`username`),
  KEY `DoseCalibratorID` (`calibratorId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table calibrators
# ------------------------------------------------------------

DROP TABLE IF EXISTS `calibrators`;

CREATE TABLE `calibrators` (
  `DoseCalibratorID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `model` varchar(32) NOT NULL,
  `manufacturer` varchar(32) NOT NULL,
  `serialNo` varchar(32) NOT NULL,
  `installDate` date NOT NULL,
  `comment` text NOT NULL,
  `location` varchar(50) DEFAULT NULL,
  `site` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`DoseCalibratorID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table dailyworklist
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dailyworklist`;

CREATE TABLE `dailyworklist` (
  `StudyInstanceUID` varchar(100) NOT NULL,
  `AccessionNumber` varchar(20) NOT NULL,
  `ReferringPhysiciansName` text NOT NULL,
  `PatientID` varchar(20) NOT NULL,
  `PatientName` text NOT NULL,
  `PatientDOB` text NOT NULL,
  `PatientSex` text NOT NULL,
  `PatientSize` float DEFAULT NULL,
  `PatientWeight` float DEFAULT NULL,
  `MedicalAlert` text,
  `RequestedProcedureDescription` text NOT NULL,
  `CurrentPatientLocation` text NOT NULL,
  `Modality` text NOT NULL,
  `ScheduledProcedureStepDescription` text NOT NULL,
  `ScheduledProcedureStartDate` text NOT NULL,
  `ReasonForTheRequestedProcedure` text,
  UNIQUE KEY `AccessionNumber` (`AccessionNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table dicomworklist
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dicomworklist`;

CREATE TABLE `dicomworklist` (
  `StudyInstanceUID` varchar(100) NOT NULL,
  `AccessionNumber` varchar(20) NOT NULL,
  `ReferringPhysiciansName` text NOT NULL,
  `PatientID` varchar(20) NOT NULL,
  `PatientName` text NOT NULL,
  `PatientDOB` text NOT NULL,
  `PatientSex` text NOT NULL,
  `PatientSize` float DEFAULT NULL,
  `PatientWeight` float DEFAULT NULL,
  `MedicalAlert` text,
  `RequestedProcedureDescription` text NOT NULL,
  `CurrentPatientLocation` text NOT NULL,
  `Modality` text NOT NULL,
  `ScheduledProcedureStepDescription` text NOT NULL,
  `ScheduledProcedureStartDate` text NOT NULL,
  `ReasonForTheRequestedProcedure` text,
  PRIMARY KEY (`StudyInstanceUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table dicomworklistexclude
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dicomworklistexclude`;

CREATE TABLE `dicomworklistexclude` (
  `RequestedProcedureDescription` varchar(255) DEFAULT NULL,
  KEY `RIScode` (`RequestedProcedureDescription`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table doses
# ------------------------------------------------------------

DROP TABLE IF EXISTS `doses`;

CREATE TABLE `doses` (
  `Dispense ID` int(11) NOT NULL AUTO_INCREMENT,
  `Radiopharmaceutical ID` int(11) DEFAULT NULL,
  `Eluate ID` int(11) DEFAULT NULL,
  `Study ID` int(11) DEFAULT NULL,
  `Dispensing staff ID` varchar(50) DEFAULT NULL,
  `Study type` varchar(100) DEFAULT NULL,
  `Dispensed activity` double DEFAULT NULL,
  `Dispense time` datetime DEFAULT NULL,
  `Administration route` varchar(25) DEFAULT NULL,
  `Administration time` datetime DEFAULT NULL,
  `Administered activity` int(11) DEFAULT NULL,
  `Administering staff ID` varchar(50) DEFAULT NULL,
  `Calibration time` datetime DEFAULT NULL,
  `Calibration activity` int(11) DEFAULT '0',
  `Discard without injection time` datetime DEFAULT NULL,
  `Discard without injection staff ID` varchar(30) DEFAULT NULL,
  `Site` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`Dispense ID`),
  KEY `Administering staff ID` (`Administering staff ID`),
  KEY `Discard without injection staff ID` (`Discard without injection staff ID`),
  KEY `Dispensing staff ID` (`Dispensing staff ID`),
  KEY `Eluate ID` (`Eluate ID`),
  KEY `Radiopharmaceutical ID` (`Radiopharmaceutical ID`),
  KEY `Study ID` (`Study ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table dosesfforqc
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dosesfforqc`;

CREATE TABLE `dosesfforqc` (
  `QC syringe ID` int(11) NOT NULL AUTO_INCREMENT,
  `Eluate ID` int(11) DEFAULT NULL,
  `Staff ID` varchar(20) DEFAULT NULL,
  `Radiopharmaceutical ID` int(11) DEFAULT NULL,
  `Dispense time` datetime DEFAULT NULL,
  `Activity` int(11) DEFAULT NULL,
  `Designated use` int(11) DEFAULT '0',
  PRIMARY KEY (`QC syringe ID`),
  KEY `Eluate ID` (`Eluate ID`),
  KEY `Radiopharmaceutical ID` (`Radiopharmaceutical ID`),
  KEY `Staff ID` (`Staff ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table eluates
# ------------------------------------------------------------

DROP TABLE IF EXISTS `eluates`;

CREATE TABLE `eluates` (
  `EluateID` int(11) NOT NULL AUTO_INCREMENT,
  `Elution time` datetime DEFAULT NULL,
  `Elution batch number` varchar(50) DEFAULT NULL,
  `Elution volume` double DEFAULT NULL,
  `Elution activity` int(11) DEFAULT NULL,
  `QC pass` varchar(30) DEFAULT 'Not done',
  `GeneratorID` int(11) DEFAULT NULL,
  `Remaining activity` int(11) DEFAULT NULL,
  `Remaining volume` double DEFAULT NULL,
  `Remaining activity calibration time` datetime DEFAULT NULL,
  `Discard time` datetime DEFAULT NULL,
  `Discard tech ID` varchar(20) DEFAULT NULL,
  `Expiry time` datetime DEFAULT NULL,
  `StaffID` varchar(20) DEFAULT NULL,
  `Saline volume` float DEFAULT NULL,
  `Export` varchar(15) DEFAULT NULL,
  `Site` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`EluateID`),
  KEY `Discard tech ID` (`Discard tech ID`),
  KEY `Generator ID` (`GeneratorID`),
  KEY `Staff ID` (`StaffID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table events
# ------------------------------------------------------------

DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `event_text` varchar(255) NOT NULL DEFAULT '',
  `details` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table events2
# ------------------------------------------------------------

DROP TABLE IF EXISTS `events2`;

CREATE TABLE `events2` (
  `SURNAME` varchar(26) NOT NULL DEFAULT '',
  `GIVEN_NAME` varchar(26) NOT NULL DEFAULT '',
  `MRN` varchar(11) NOT NULL DEFAULT '',
  `DOB` date NOT NULL,
  `SEX` varchar(12) NOT NULL,
  `APPT_TYPE` varchar(64) NOT NULL DEFAULT '',
  `APPTBEGIN` datetime NOT NULL,
  `APPTEND` datetime NOT NULL,
  `ORDER_NAME` varchar(64) NOT NULL DEFAULT '',
  `ORDER_ID` varchar(16) NOT NULL DEFAULT '',
  `RESOURCE` varchar(64) NOT NULL DEFAULT '',
  `APPT_ID` int(16) NOT NULL,
  `NURSE_UNIT` varchar(64) NOT NULL DEFAULT '',
  `SCHEDULING_COMMENTS` longtext NOT NULL,
  `color` varchar(11) DEFAULT NULL,
  `textColor` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`APPT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table generatorqc
# ------------------------------------------------------------

DROP TABLE IF EXISTS `generatorqc`;

CREATE TABLE `generatorqc` (
  `QC ID` int(11) NOT NULL AUTO_INCREMENT,
  `Generator ID` int(11) DEFAULT NULL,
  `Date and time of QC` datetime DEFAULT NULL,
  `Eluate activity unshielded` int(11) DEFAULT NULL,
  `Eluate activity with moly shield` int(11) DEFAULT NULL,
  `Molybdenum breakthrough` varchar(9) DEFAULT NULL,
  `Aluminium breakthrough` varchar(9) DEFAULT NULL,
  `Visual inspection OK` varchar(9) DEFAULT NULL,
  `QC comments` varchar(150) DEFAULT NULL,
  `QC staff ID` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`QC ID`),
  KEY `Generator ID` (`Generator ID`),
  KEY `QC staff ID` (`QC staff ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table generators
# ------------------------------------------------------------

DROP TABLE IF EXISTS `generators`;

CREATE TABLE `generators` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `BatchNo` varchar(50) DEFAULT NULL,
  `Supplier` varchar(50) DEFAULT NULL,
  `ArrivalDate` datetime DEFAULT NULL,
  `Nominal generator size` int(11) DEFAULT NULL,
  `Return date` datetime DEFAULT NULL,
  `Decommission date` datetime DEFAULT NULL,
  `Username` varchar(20) DEFAULT NULL,
  `Moly QC status` varchar(15) DEFAULT 'Not done',
  `Aluminium QC status` varchar(15) DEFAULT 'Not done',
  `Visual QC status` varchar(15) DEFAULT 'Not done',
  `site` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Login staff ID` (`Username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;



# Dump of table generators_copy
# ------------------------------------------------------------

DROP TABLE IF EXISTS `generators_copy`;

CREATE TABLE `generators_copy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `BatchNo` varchar(50) DEFAULT NULL,
  `Supplier` varchar(50) DEFAULT NULL,
  `ArrivalDate` datetime DEFAULT NULL,
  `Nominal generator size` int(11) DEFAULT NULL,
  `Return date` datetime DEFAULT NULL,
  `Decommission date` datetime DEFAULT NULL,
  `Username` varchar(20) DEFAULT NULL,
  `Moly QC status` varchar(15) DEFAULT 'Not done',
  `Aluminium QC status` varchar(15) DEFAULT 'Not done',
  `Visual QC status` varchar(15) DEFAULT 'Not done',
  `site` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Login staff ID` (`Username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table hisimport
# ------------------------------------------------------------

DROP TABLE IF EXISTS `hisimport`;

CREATE TABLE `hisimport` (
  `PATIENT_NAME` varchar(60) NOT NULL,
  `SURNAME` varchar(26) NOT NULL DEFAULT '',
  `GIVEN_NAME` varchar(26) NOT NULL DEFAULT '',
  `MRN` varchar(11) NOT NULL DEFAULT '',
  `DOB` date NOT NULL,
  `SEX` varchar(12) NOT NULL,
  `APPT_TYPE` varchar(64) NOT NULL DEFAULT '',
  `APPTBEGIN` datetime NOT NULL,
  `APPTEND` datetime NOT NULL,
  `ORDER_NAME` varchar(64) NOT NULL DEFAULT '',
  `ORDER_ID` varchar(16) NOT NULL DEFAULT '',
  `RESOURCE` varchar(64) NOT NULL DEFAULT '',
  `APPT_ID` int(16) NOT NULL,
  `NURSE_UNIT` varchar(64) DEFAULT '',
  `SCHEDULING_COMMENTS` longtext,
  PRIMARY KEY (`APPT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table hotlab procedures
# ------------------------------------------------------------

DROP TABLE IF EXISTS `hotlab procedures`;

CREATE TABLE `hotlab procedures` (
  `Procedure type` varchar(100) NOT NULL,
  PRIMARY KEY (`Procedure type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table isotope names
# ------------------------------------------------------------

DROP TABLE IF EXISTS `isotope names`;

CREATE TABLE `isotope names` (
  `Isotope` varchar(50) NOT NULL,
  `Radioactive decay constant` double DEFAULT NULL,
  PRIMARY KEY (`Isotope`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table kitarrivals
# ------------------------------------------------------------

DROP TABLE IF EXISTS `kitarrivals`;

CREATE TABLE `kitarrivals` (
  `Batch ID` int(11) NOT NULL AUTO_INCREMENT,
  `Kit ID` int(11) DEFAULT NULL,
  `Arrival date` datetime DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Expiry date` datetime DEFAULT NULL,
  `Batch number` varchar(50) DEFAULT NULL,
  `InvoiceNo` varchar(50) DEFAULT NULL,
  `OrderNo` varchar(50) DEFAULT NULL,
  `OrderQuantity` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Batch ID`),
  KEY `Kit ID` (`Kit ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table kitpreparations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `kitpreparations`;

CREATE TABLE `kitpreparations` (
  `Radiopharmaceutical ID` int(11) NOT NULL AUTO_INCREMENT,
  `Batch ID` int(11) DEFAULT NULL,
  `Eluate ID` int(11) DEFAULT NULL,
  `Preparation staff ID` varchar(20) DEFAULT NULL,
  `Preparation time` datetime DEFAULT NULL,
  `Isotope` varchar(50) DEFAULT NULL,
  `Isotope volume` double DEFAULT NULL,
  `Isotope activity` int(11) DEFAULT NULL,
  `Remaining activity calibration time` datetime DEFAULT NULL,
  `Remaining activity` int(11) DEFAULT NULL,
  `Remaining volume` double DEFAULT NULL,
  `Expiry time` datetime DEFAULT NULL,
  `QC pass` tinyint(1) DEFAULT '0',
  `QC notes` varchar(50) DEFAULT NULL,
  `QC staff ID` varchar(20) DEFAULT NULL,
  `Comments` varchar(50) DEFAULT NULL,
  `Discard time` datetime DEFAULT NULL,
  `Discard tech ID` varchar(20) DEFAULT NULL,
  `Additional volume added at reconstitution` float DEFAULT '0',
  `What made up the additional volume` varchar(100) DEFAULT NULL,
  `Export` varchar(15) DEFAULT NULL,
  `Site` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`Radiopharmaceutical ID`),
  KEY `Batch ID` (`Batch ID`),
  KEY `Discard tech ID` (`Discard tech ID`),
  KEY `Eluate ID` (`Eluate ID`),
  KEY `Preparation staff ID` (`Preparation staff ID`),
  KEY `QC staff ID` (`QC staff ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table kits
# ------------------------------------------------------------

DROP TABLE IF EXISTS `kits`;

CREATE TABLE `kits` (
  `kit_id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(50) NOT NULL DEFAULT '',
  `trade_name` varchar(30) DEFAULT NULL,
  `abbreviation` varchar(20) NOT NULL DEFAULT '',
  `radiopharmaceutical` varchar(100) NOT NULL DEFAULT '',
  `recon_isotope` varchar(25) DEFAULT NULL,
  `qc_required` tinyint(1) DEFAULT '0',
  `kit_size` varchar(20) DEFAULT NULL,
  `expiry_postprep` int(11) DEFAULT NULL,
  `recon_requirements` varchar(255) DEFAULT '',
  `recon_procedure` text,
  `recon_activity_recommeded` int(11) DEFAULT NULL,
  `recon_activity_min` int(11) DEFAULT NULL,
  `recon_activity_max` int(11) DEFAULT NULL,
  `recon_volume_min` float DEFAULT NULL,
  `recon_volume_max` float DEFAULT NULL,
  `recon_volume_recommeded` float DEFAULT NULL,
  `recon_required` tinyint(1) NOT NULL DEFAULT '0',
  `Kit re-order threshold` tinyint(4) DEFAULT NULL,
  `qc_procedure` text,
  `kit_volume` float DEFAULT '0',
  `manufacture_comments` longtext,
  PRIMARY KEY (`kit_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `log`;

CREATE TABLE `log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `datetime` datetime NOT NULL,
  `username` varchar(20) NOT NULL DEFAULT '',
  `action` varchar(20) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table notify
# ------------------------------------------------------------

DROP TABLE IF EXISTS `notify`;

CREATE TABLE `notify` (
  `NotifyID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) NOT NULL,
  `TaskID` int(11) DEFAULT NULL,
  `LastSent` date DEFAULT '0000-00-00',
  KEY `NotifyID` (`NotifyID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Dump of table options
# ------------------------------------------------------------

DROP TABLE IF EXISTS `options`;

CREATE TABLE `options` (
  `Automatic Calibrator Interface` varchar(50) DEFAULT NULL,
  `Allow multivial doses` tinyint(1) DEFAULT '0',
  `Overide dose range limits` tinyint(1) DEFAULT '0',
  `Acceptable dose range variation` int(11) NOT NULL DEFAULT '10',
  `Acceptable kit activity reconstruction range` int(11) NOT NULL DEFAULT '10',
  `Staff identification handling` varchar(20) DEFAULT NULL,
  `Patient logon method` varchar(50) DEFAULT NULL,
  `Enforce calibrator QC` tinyint(1) DEFAULT '0',
  `Bypass auto calibrator interface for iodine-131` tinyint(1) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table patients
# ------------------------------------------------------------

DROP TABLE IF EXISTS `patients`;

CREATE TABLE `patients` (
  `Patient ID` int(11) NOT NULL AUTO_INCREMENT,
  `Lastname` varchar(50) DEFAULT NULL,
  `First name` varchar(50) DEFAULT NULL,
  `Middle names` varchar(50) DEFAULT NULL,
  `DOB` datetime DEFAULT NULL,
  `Gender` varchar(50) DEFAULT NULL,
  `MRN` int(11) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `Suburb` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Patient ID`),
  KEY `Lastname` (`Lastname`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(11) DEFAULT NULL,
  `productCode` varchar(11) DEFAULT NULL,
  `supplier` varchar(11) DEFAULT NULL,
  `price` decimal(11,2) DEFAULT NULL,
  `unit` varchar(11) DEFAULT NULL,
  `orderingProcedure` text,
  `freightCost` double(11,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table riscodes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `riscodes`;

CREATE TABLE `riscodes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `RIScode` varchar(255) DEFAULT NULL,
  `Show` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table schedule
# ------------------------------------------------------------

DROP TABLE IF EXISTS `schedule`;

CREATE TABLE `schedule` (
  `Booking ID` int(11) NOT NULL AUTO_INCREMENT,
  `Last name` varchar(30) DEFAULT NULL,
  `First name` varchar(30) DEFAULT NULL,
  `MRN` int(11) DEFAULT NULL,
  `DOB` datetime DEFAULT NULL,
  `Booking Date` datetime DEFAULT NULL,
  `Room` varchar(20) DEFAULT NULL,
  `Procedure` varchar(60) DEFAULT NULL,
  `Status` varchar(12) DEFAULT NULL,
  `Duration` int(11) DEFAULT NULL,
  `Site` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`Booking ID`),
  KEY `Booking ID` (`Booking ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table settings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `settings`;

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `DWL_ServerAET` text NOT NULL,
  `DWL_ServerIP` text NOT NULL,
  `DWL_ServerPort` int(11) NOT NULL,
  `DWL_OwnAET` text NOT NULL,
  `DWL_OwnIP` text NOT NULL,
  `DWL_SearchModality` text NOT NULL,
  `DWL_RefreshTime` int(11) NOT NULL COMMENT 'Auto Refresh Time in seconds',
  `DWL_Trigger` tinyint(1) NOT NULL COMMENT 'Used to trigger mirth to manually perform worklst query',
  `DWL_LastRun` text NOT NULL COMMENT 'When the last DWL query was performed by mirth',
  `App_TimeOut` int(11) NOT NULL,
  `App_HotlabConnectServer` varchar(64) NOT NULL DEFAULT '',
  `App_HotlabConnectPort` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table sites
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sites`;

CREATE TABLE `sites` (
  `Site Name` varchar(20) DEFAULT NULL,
  `Abbreviation` varchar(8) NOT NULL,
  `File path` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Abbreviation`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table staff
# ------------------------------------------------------------

DROP TABLE IF EXISTS `staff`;

CREATE TABLE `staff` (
  `Username` varchar(15) NOT NULL,
  `Staffname` varchar(64) NOT NULL DEFAULT '',
  `Password` varchar(15) DEFAULT NULL,
  `StaffID` varchar(10) NOT NULL,
  `Position` varchar(20) DEFAULT '',
  `CeasedEmploymentDate` date DEFAULT NULL,
  `Address` varchar(64) DEFAULT NULL,
  `City` varchar(20) DEFAULT NULL,
  `Postcode` varchar(4) DEFAULT NULL,
  `State` varchar(3) DEFAULT NULL,
  `MobilePhone` varchar(11) DEFAULT NULL,
  `HomePhone` varchar(11) DEFAULT NULL,
  `Contact1tName` varchar(64) DEFAULT NULL,
  `Contact1Address` varchar(64) DEFAULT NULL,
  `Contact1City` varchar(20) DEFAULT NULL,
  `Contact1Postcode` varchar(4) DEFAULT NULL,
  `Contact1State` varchar(3) DEFAULT NULL,
  `Contact1MobilePhone` varchar(11) DEFAULT NULL,
  `Contact1HomePhone` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`Username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table studies
# ------------------------------------------------------------

DROP TABLE IF EXISTS `studies`;

CREATE TABLE `studies` (
  `Study ID` int(11) NOT NULL AUTO_INCREMENT,
  `Patient ID` int(11) DEFAULT NULL,
  `Weight` tinyint(4) DEFAULT NULL,
  `Study date` datetime DEFAULT NULL,
  `Procedure type` varchar(100) DEFAULT NULL,
  `Adverse reaction` varchar(250) DEFAULT NULL,
  `Site` varchar(8) DEFAULT NULL,
  `Location` varchar(50) DEFAULT NULL,
  `Request ID` varchar(255) DEFAULT NULL,
  `Reason For Exam` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Study ID`),
  KEY `Patient ID` (`Patient ID`),
  KEY `Request ID` (`Request ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table studytypes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `studytypes`;

CREATE TABLE `studytypes` (
  `Study type` varchar(100) NOT NULL,
  `RIS Code` longtext,
  `Pharmaceutical` varchar(50) NOT NULL,
  `Abbreviation` varchar(15) NOT NULL,
  `Reconstituting isotope` varchar(50) NOT NULL,
  `Minimum adult activity` int(11) NOT NULL,
  `Minimum paediatric activity` int(11) NOT NULL,
  `Usual isotope activity` int(11) NOT NULL,
  `Maximum isotope activity` int(11) NOT NULL,
  `Dose/Kg` double NOT NULL,
  `Manual activity recording` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`Study type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table suppliers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `suppliers`;

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `contactName` varchar(64) DEFAULT NULL,
  `contactMobile` varchar(10) DEFAULT NULL,
  `contactPhone` varchar(10) DEFAULT NULL,
  `contactFax` varchar(10) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `orderComment` varchar(255) DEFAULT NULL,
  `orderPhone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_supplierID` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table tasks_master
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tasks_master`;

CREATE TABLE `tasks_master` (
  `TaskID` int(10) NOT NULL AUTO_INCREMENT,
  `Title` varchar(200) DEFAULT '0',
  `Details` varchar(5000) DEFAULT '0',
  `RRule` varchar(200) DEFAULT '0',
  `Time` time NOT NULL DEFAULT '00:00:00',
  `Added` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Active` char(1) DEFAULT 'Y',
  `Visible` char(1) DEFAULT NULL,
  `Notify` char(1) DEFAULT 'N',
  PRIMARY KEY (`TaskID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Dump of table tasks_working
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tasks_working`;

CREATE TABLE `tasks_working` (
  `TaskWorkingID` int(10) NOT NULL AUTO_INCREMENT,
  `TaskID` int(10) DEFAULT '0',
  `CompletedBy` varchar(100) DEFAULT '0',
  `Scheduled` datetime DEFAULT NULL,
  `Completed` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `Notified` char(1) DEFAULT 'N',
  `Notes` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`TaskWorkingID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) DEFAULT NULL,
  `Username` varchar(60) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `Active` char(1) DEFAULT NULL,
  `Last_Updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `IP` varchar(30) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `UserLevel` char(1) DEFAULT '1',
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table waste
# ------------------------------------------------------------

DROP TABLE IF EXISTS `waste`;

CREATE TABLE `waste` (
  `Waste ID` int(11) NOT NULL AUTO_INCREMENT,
  `Sealed Date` datetime DEFAULT NULL,
  `Counted Date` datetime DEFAULT NULL,
  `HalfLife` varchar(255) DEFAULT NULL,
  `Count Rate` varchar(255) DEFAULT NULL,
  `Disposed` tinyint(1) DEFAULT '0',
  `Staff` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Waste ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
