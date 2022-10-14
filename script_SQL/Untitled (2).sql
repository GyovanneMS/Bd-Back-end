CREATE DATABASE  IF NOT EXISTS `dblion_school` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dblion_school`;
-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: localhost    Database: dblion_school
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('8ef4924a-d686-4d51-84f0-b6f2acea0fc4','6592c9a34848366df48b8b3798f1ad013cd71d84ca896aba31388fa05d2b6d7e','2022-10-06 11:09:19.470','20221006110919_teste_inicial',NULL,NULL,'2022-10-06 11:09:19.462',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_aluno`
--

DROP TABLE IF EXISTS `tbl_aluno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_aluno` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `Nome` varchar(80) NOT NULL,
  `Foto` varchar(110) NOT NULL,
  `Sexo` varchar(1) DEFAULT NULL,
  `RG` varchar(15) NOT NULL,
  `CPF` varchar(20) NOT NULL,
  `Email` varchar(256) NOT NULL,
  `Telefone` varchar(20) DEFAULT NULL,
  `Celular` varchar(20) DEFAULT NULL,
  `Data_Nascimento` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_aluno`
--

LOCK TABLES `tbl_aluno` WRITE;
/*!40000 ALTER TABLE `tbl_aluno` DISABLE KEYS */;
INSERT INTO `tbl_aluno` VALUES (1,'Gyovanne Martins Sabará','https://cdn-icons-png.flaticon.com/512/848/848579.png','M','57.338.247-5','421.650.298-99','gy.martinssabara@gmail.com',NULL,'(011)94484-9864','2005-08-20'),(2,'Ligia Maria Martins','https://cdn-icons-png.flaticon.com/512/1998/1998728.png','F','52.007.522-X','275.249.078-00','ligia.martins2001@yahoo.com.br',NULL,'(011)97413-4033','1979-09-26'),(3,'Bile Martins Billy','https://as2.ftcdn.net/v2/jpg/03/93/32/75/1000_F_393327565_Y58phDuKE7HVkCAIa7wn0gpwaH4URy6q.jpg','M','00.111.222-B','455.697.426-44','bebe.fofo@gmail.com',NULL,NULL,'2012-04-10');
/*!40000 ALTER TABLE `tbl_aluno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_aluno_curso`
--

DROP TABLE IF EXISTS `tbl_aluno_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_aluno_curso` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_aluno` int unsigned NOT NULL,
  `id_curso` int unsigned NOT NULL,
  `Matricula` varchar(15) NOT NULL,
  `status_aluno` varchar(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_aluno` (`id_aluno`),
  KEY `id_curso` (`id_curso`),
  CONSTRAINT `tbl_aluno_curso_ibfk_1` FOREIGN KEY (`id_aluno`) REFERENCES `tbl_aluno` (`id`),
  CONSTRAINT `tbl_aluno_curso_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `tbl_curso` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_aluno_curso`
--

LOCK TABLES `tbl_aluno_curso` WRITE;
/*!40000 ALTER TABLE `tbl_aluno_curso` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_aluno_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_curso`
--

DROP TABLE IF EXISTS `tbl_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_curso` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `Nome` varchar(80) NOT NULL,
  `Carga_horaria` int NOT NULL,
  `Icone` varchar(110) DEFAULT NULL,
  `Sigla` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_curso`
--

LOCK TABLES `tbl_curso` WRITE;
/*!40000 ALTER TABLE `tbl_curso` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_usuario`
--

DROP TABLE IF EXISTS `tbl_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_usuario`
--

LOCK TABLES `tbl_usuario` WRITE;
/*!40000 ALTER TABLE `tbl_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-06  9:36:43
