-- MySQL dump 10.13  Distrib 5.6.51, for Linux (x86_64)
--
-- Host: 192.168.3.182    Database: lfs
-- ------------------------------------------------------
-- Server version	5.6.47-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `lfs_locks`
--

DROP TABLE IF EXISTS `lfs_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lfs_locks` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pwn` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(4096) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lockid` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `locked_at` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lfs_objects`
--

DROP TABLE IF EXISTS `lfs_objects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lfs_objects` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` BIGINT UNSIGNED NOT NULL DEFAULT '0',
  `user` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `repo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `oid` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mime` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `modified` bigint(20) NOT NULL DEFAULT '0',
  `size` bigint(20) NOT NULL DEFAULT '0',
  `exists` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_on_objects_oid` (`oid`),
  KEY `index_on_objects_user` (`user`),
  KEY `index_on_objects_repo` (`repo`),
  KEY `index_on_project_id` (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3010734 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lfs_objects_pool`
--

DROP TABLE IF EXISTS `lfs_objects_pool`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lfs_objects_pool` (
  `oid` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` bigint(20) NOT NULL DEFAULT '0',
  `mime` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latest` bigint(20) NOT NULL DEFAULT '0',
  `links` int(11) DEFAULT '0',
  `synced` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lfs_usermeta`
--

DROP TABLE IF EXISTS `lfs_usermeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lfs_usermeta` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `used` bigint(20) NOT NULL DEFAULT '0',
  `objsize` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_on_usermeta_user` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=61987 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-28  2:19:19
