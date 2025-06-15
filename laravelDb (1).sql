-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for dbtest
DROP DATABASE IF EXISTS `dbtest`;
CREATE DATABASE IF NOT EXISTS `dbtest` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dbtest`;

-- Dumping structure for table dbtest.brands
DROP TABLE IF EXISTS `brands`;
CREATE TABLE IF NOT EXISTS `brands` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `from_country` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `brands_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.brands: ~7 rows (approximately)
INSERT INTO `brands` (`id`, `name`, `code`, `from_country`, `description`, `status`, `created_at`, `updated_at`) VALUES
	(6, 'Gucci', '101', 'Cambodia', 'Statement of luxury and fashion', 1, '2025-04-20 03:07:33', '2025-06-14 06:21:10'),
	(8, 'Uniqlo', '103', 'Taiwan', 'This famous t-shirt company comes from Japan.', 1, '2025-04-20 03:09:05', '2025-06-14 06:21:40'),
	(20, 'H&M', '109', 'China', 'Everyone knows H&M for trendy, timeless creations and quality fashion for an affordable budget.', 1, '2025-04-21 20:04:12', '2025-06-14 06:22:27'),
	(21, 'Supreme', '106', 'Taiwan', 'As a t-shirt business, if you\'re thinking about a cultural icon, Supreme will give you the taste.', 1, '2025-04-26 18:30:33', '2025-06-14 06:23:01'),
	(22, 'Champion', '107', 'China', 'Champion is a reputed ‘real-life’ champion brand.', 1, '2025-04-26 18:31:03', '2025-06-14 06:23:30'),
	(23, 'ASOS', '108', 'Taiwan', 'This famous t-shirt brand was founded in 2000 by Nick Roberson and Quentin Griffiths.', 1, '2025-04-26 18:31:29', '2025-06-14 06:24:00'),
	(24, 'Ralph Lauren', '110', 'Korea', 'Ralph Lauren is the name of luxury and elegance.', 1, '2025-04-26 18:31:49', '2025-06-14 06:24:27');

-- Dumping structure for table dbtest.cache
DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.cache: ~0 rows (approximately)

-- Dumping structure for table dbtest.cache_locks
DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.cache_locks: ~0 rows (approximately)

-- Dumping structure for table dbtest.categories
DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.categories: ~4 rows (approximately)
INSERT INTO `categories` (`id`, `name`, `code`, `image`, `status`, `created_at`, `updated_at`) VALUES
	(4, 'T-Shirt', '005', 'categories/aXOfanSsoC8xA69X6upIko6xYPgaQJvo3lZyRrUy.jpg', 1, '2025-04-21 12:10:53', '2025-06-13 20:46:41'),
	(5, 'Hody', '105', 'categories/F2Db3xRVP7EvjlFKLY1UpjvK92HSlOtOd74izpAU.jpg', 1, '2025-04-21 18:01:43', '2025-06-13 20:47:01'),
	(6, 'Fashion', '106', 'categories/vfG10rYA74CB3kEL9Pa7S6cu1rASp8p9MyedWMKx.jpg', 1, '2025-04-26 18:28:25', '2025-06-13 20:47:26'),
	(7, 'New Fashion', '199', 'categories/xH21mibSR48psnYWUDlMIdqKAcsxpUqEWPtjWFCq.jpg', 1, '2025-04-27 19:42:50', '2025-06-13 20:47:59');

-- Dumping structure for table dbtest.customers
DROP TABLE IF EXISTS `customers`;
CREATE TABLE IF NOT EXISTS `customers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` date DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customers_tel_unique` (`tel`),
  UNIQUE KEY `customers_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.customers: ~6 rows (approximately)
INSERT INTO `customers` (`id`, `firstname`, `lastname`, `email`, `tel`, `address`, `dob`, `status`, `created_at`, `updated_at`) VALUES
	(21, 'Bunleangg', 'KKa', 'jasmin@gmail.com', '03344881', 'Phnom Penh, Cambodia', '2000-01-04', 1, '2025-03-21 19:39:20', '2025-04-20 01:00:17'),
	(27, 'Janeg', 'Henggg', 'holydavid1223@gmail.com', '0998877333', '123 Main St, Cityville', '1990-05-15', 1, '2025-04-19 18:22:56', '2025-04-19 20:18:01'),
	(28, 'John', 'KKaaa', 'lydavidho11@gmail.com', '12345678911', 'Phnom Penh, Cambodia', '1990-05-15', 0, '2025-04-19 18:28:14', '2025-04-19 18:28:14'),
	(30, 'Luffy', 'Doeee', 'vidgaming242@gmail.com', '0123456789', 'Phnom Penh, Cambodia', '1990-05-15', 1, '2025-04-19 19:58:58', '2025-04-19 19:58:58'),
	(33, 'Tavey', 'Doeee', 'holydavid123@gmail.com', '099887733', '123 Main St, Cityville', '1990-05-15', 0, '2025-04-19 20:15:16', '2025-04-19 20:15:16'),
	(34, 'kakada', 'Heng', 'bonpagnakann@gmail.com', '099887744', 'Phnom Penh, Cambodia11', '2000-01-01', 0, '2025-04-19 20:41:29', '2025-04-19 20:41:29');

-- Dumping structure for table dbtest.failed_jobs
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.failed_jobs: ~0 rows (approximately)

-- Dumping structure for table dbtest.jobs
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.jobs: ~0 rows (approximately)

-- Dumping structure for table dbtest.job_batches
DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.job_batches: ~0 rows (approximately)

-- Dumping structure for table dbtest.migrations
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.migrations: ~15 rows (approximately)
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '0001_01_01_000000_create_users_table', 1),
	(2, '0001_01_01_000001_create_cache_table', 1),
	(3, '0001_01_01_000002_create_jobs_table', 1),
	(4, '2025_01_27_140910_create_personal_access_tokens_table', 1),
	(5, '2025_01_30_140347_create_roles_table', 1),
	(6, '2025_02_04_134357_create_brands_table', 1),
	(7, '2025_02_06_134108_create_provinces_table', 1),
	(8, '2025_02_06_135629_update_column_name', 1),
	(9, '2025_02_10_140100_create_suppliers_table', 1),
	(10, '2025_02_12_134220_create_customers_table', 1),
	(11, '2025_02_12_140139_create_categories_table', 1),
	(12, '2025_02_13_143746_create_products_table', 1),
	(13, '2025_02_27_134752_create_profiles_table', 1),
	(14, '2025_05_08_115302_create_orders_table', 1),
	(15, '2025_05_08_115327_create_order_items_table', 1);

-- Dumping structure for table dbtest.orders
DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `transaction_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_zipcode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.orders: ~24 rows (approximately)
INSERT INTO `orders` (`id`, `user_id`, `total_amount`, `payment_method`, `payment_status`, `transaction_id`, `shipping_address`, `shipping_city`, `shipping_state`, `shipping_zipcode`, `shipping_country`, `shipping_phone`, `status`, `created_at`, `updated_at`) VALUES
	(1, 7, 2799.98, 'paypal', 'paid', 'PAYPAL-1747531220371', 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 18:20:21', '2025-05-17 18:20:21'),
	(2, 7, 2499.99, 'cod', 'pending', NULL, 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 18:27:03', '2025-05-17 18:27:03'),
	(3, 7, 139.99, 'paypal', 'paid', 'PAYPAL-1747531947109', 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 18:32:27', '2025-05-17 18:32:27'),
	(4, 7, 2499.99, 'paypal', 'paid', 'PAYPAL-1747532153186', 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 18:35:53', '2025-05-17 18:35:53'),
	(5, 7, 1899.99, 'cod', 'pending', NULL, 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 18:41:56', '2025-05-17 18:41:56'),
	(6, 7, 2499.99, 'cod', 'pending', NULL, 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 18:47:18', '2025-05-17 18:47:18'),
	(7, 7, 4999.98, 'cod', 'pending', NULL, 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 18:55:43', '2025-05-17 18:55:43'),
	(8, 7, 1399.99, 'paypal', 'paid', 'PAYPAL-1747534097059', 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 19:08:17', '2025-05-17 19:08:17'),
	(9, 7, 1399.99, 'paypal', 'paid', 'PAYPAL-1747534633067', 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 19:17:13', '2025-05-17 19:17:13'),
	(10, 7, 1399.99, 'paypal', 'paid', 'PAYPAL-SANDBOX-1747534832062', 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 19:20:32', '2025-05-17 19:20:32'),
	(11, 7, 2499.99, 'paypal', 'paid', 'PAYPAL-1747535114679', 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 19:25:15', '2025-05-17 19:25:15'),
	(12, 7, 2499.99, 'paypal', 'paid', 'SANDBOX-1747535344791', 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 19:29:05', '2025-05-17 19:29:05'),
	(13, 7, 139.99, 'paypal', 'paid', 'SANDBOX-1747535448072', 'Phnom Penh', 'Phnom Penh', 'pp', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 19:30:48', '2025-05-17 19:30:48'),
	(14, 7, 2499.99, 'paypal', 'paid', 'SANDBOX-1747535577057', 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 19:32:58', '2025-05-17 19:32:58'),
	(15, 7, 2499.99, 'paypal', 'paid', 'SANDBOX-1747535696556', 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 19:34:57', '2025-05-17 19:34:57'),
	(16, 7, 1899.99, 'paypal', 'paid', 'SANDBOX-1747535728057', 'Phnom Penh', 'Phnom Penh', 'pp', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 19:35:28', '2025-05-17 19:35:28'),
	(17, 7, 2499.99, 'paypal', 'paid', 'SANDBOX-1747535971861', 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 19:39:32', '2025-05-17 19:39:32'),
	(18, 7, 2499.99, 'paypal', 'paid', '6Y520424KG932170V', 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 19:44:49', '2025-05-17 19:44:49'),
	(19, 7, 2499.99, 'paypal', 'paid', '1M8665183K8101607', 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 19:46:06', '2025-05-17 19:46:06'),
	(20, 7, 2499.99, 'paypal', 'paid', '9M5598676B8068507', 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 19:52:20', '2025-05-17 19:52:20'),
	(21, 7, 2499.99, 'paypal', 'paid', '8X731616HU258624S', 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 19:54:43', '2025-05-17 19:54:43'),
	(22, 7, 1899.99, 'paypal', 'paid', '4JB86315TP670691G', 'Phnom Penh', 'Phnom Penh', 'Phnom Penh', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 19:57:11', '2025-05-17 19:57:11'),
	(23, 7, 1899.99, 'paypal', 'paid', '05117895S05828052', 'Phnom Penh', 'Phnom Penh', 'pp', '12000', 'Cambodia', '1235689', 'pending', '2025-05-17 19:59:02', '2025-05-17 19:59:02'),
	(24, 7, 2499.99, 'paypal', 'paid', '5NY095200W009342G', 'rppp', 'rppp', 'pp', 'rpppp', 'Cambodia', '0987665544', 'delivered', '2025-05-17 20:00:14', '2025-05-17 20:10:31');

-- Dumping structure for table dbtest.order_items
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  KEY `order_items_product_id_foreign` (`product_id`),
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.order_items: ~10 rows (approximately)
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `subtotal`, `created_at`, `updated_at`) VALUES
	(1, 1, 27, 2, 1399.99, 2799.98, '2025-05-17 18:20:21', '2025-05-17 18:20:21'),
	(3, 3, 30, 1, 139.99, 139.99, '2025-05-17 18:32:27', '2025-05-17 18:32:27'),
	(5, 5, 21, 1, 1899.99, 1899.99, '2025-05-17 18:41:56', '2025-05-17 18:41:56'),
	(8, 8, 27, 1, 1399.99, 1399.99, '2025-05-17 19:08:17', '2025-05-17 19:08:17'),
	(9, 9, 27, 1, 1399.99, 1399.99, '2025-05-17 19:17:13', '2025-05-17 19:17:13'),
	(10, 10, 27, 1, 1399.99, 1399.99, '2025-05-17 19:20:32', '2025-05-17 19:20:32'),
	(13, 13, 30, 1, 139.99, 139.99, '2025-05-17 19:30:48', '2025-05-17 19:30:48'),
	(16, 16, 21, 1, 1899.99, 1899.99, '2025-05-17 19:35:28', '2025-05-17 19:35:28'),
	(22, 22, 21, 1, 1899.99, 1899.99, '2025-05-17 19:57:11', '2025-05-17 19:57:11'),
	(23, 23, 21, 1, 1899.99, 1899.99, '2025-05-17 19:59:02', '2025-05-17 19:59:02');

-- Dumping structure for table dbtest.password_reset_tokens
DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.password_reset_tokens: ~0 rows (approximately)

-- Dumping structure for table dbtest.personal_access_tokens
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.personal_access_tokens: ~0 rows (approximately)

-- Dumping structure for table dbtest.products
DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `categories_id` bigint unsigned NOT NULL,
  `brands_id` bigint unsigned NOT NULL,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_categories_id_foreign` (`categories_id`),
  KEY `products_brands_id_foreign` (`brands_id`),
  CONSTRAINT `products_brands_id_foreign` FOREIGN KEY (`brands_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE,
  CONSTRAINT `products_categories_id_foreign` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.products: ~10 rows (approximately)
INSERT INTO `products` (`id`, `categories_id`, `brands_id`, `product_name`, `description`, `quantity`, `price`, `status`, `image`, `created_at`, `updated_at`) VALUES
	(21, 5, 20, 'Gildan Softstyle Jersey T‑shirt', 'Trendy and budget-friendly - what\'s not to love about this style? Try this on for size: a lightweight and comfortable fabric with an exciting color palette, all at an affordable price. An excellent choice for your next event!', 15, 18.00, 1, 'products/T0rGS2VN4rcKO2RW5HZVe4sYtaGKopFTHW2btSOy.jpg', NULL, '2025-06-13 20:49:24'),
	(27, 5, 8, 'Shop Stylish T Shirt for Men', 'Trendy and budget-friendly - what\'s not to love about this style? Try this on for size: a lightweight and comfortable fabric with an exciting color palette, all at an affordable price. An excellent choice for your next event!', 10, 16.00, 1, 'products/sxKostB4JXG4h3poP9nlSWRjc0ZeGImK0woE8BHh.jpg', '2025-04-21 19:59:52', '2025-06-13 20:51:07'),
	(28, 4, 21, 'Lightweight', 'The raglan has never been more of a hit - this fashion forward style takes it to whole new level. Your group will appreciate how soft and lightweight this fabric feels!', 10, 69.00, 1, 'products/fNgHH23AFttlVF2kW25tGMVpy0kWcggZ5iGp5PPl.jpg', '2025-04-26 18:36:50', '2025-06-14 06:15:12'),
	(29, 4, 21, 'Lightweight Raglan', 'The raglan has never been more of a hit - this fashion forward style takes it to whole new level. Your group will appreciate how soft and lightweight this fabric feels', 20, 12.00, 1, 'products/ORRPQvg0hRbH1uN1yDfeUCrBE0xsU9n38S8fTXbt.jpg', '2025-04-26 18:39:09', '2025-06-14 06:16:07'),
	(30, 6, 23, 'Gildan Softstyle', 'Try this on for size: a lightweight and comfortable fabric with an exciting color palette, all at an affordable price. An excellent choice for your next event!', 17, 13.00, 1, 'products/6K6XzksvdudbYBUUCGimkyRuzZg0pkc0xMEDZfYW.jpg', '2025-04-26 18:41:13', '2025-06-14 06:16:53'),
	(31, 6, 23, 'Jersey T-shirt', 'Sport Grey and Antique colors: 90/10 cotton/polyester', 20, 39.99, 1, 'products/Zopf8hULUnSY5TZLyIFALCkUuYKuqcmgL137LdUp.jpg', '2025-04-26 18:42:58', '2025-06-14 06:17:45'),
	(33, 7, 24, 'bs-Designer', 'Sport Grey and Antique colors: 90/10 cotton/polyester', 20, 89.99, 1, 'products/OVHV7bcwEgl7Qnhvr90RNrytvI972hdPIVNiRiIw.jpg', '2025-05-01 03:48:46', '2025-06-14 06:19:44'),
	(34, 5, 6, 'Hody Style', 'Historically, surnames evolved as a way to sort people into groups - by occupation, place of origin, clan affiliation, patronage, parentage, adoption, and even physical characteristics (like red hair). Many of the modern surnames in the dictionary can be traced back to Britain and Ireland', 12, 29.00, 1, 'products/ZO5QqHbV66oUwl7OBXvwag3xg6gcoKhjtir3gbb2.jpg', '2025-06-14 19:22:02', '2025-06-14 19:23:58');

-- Dumping structure for table dbtest.profiles
DROP TABLE IF EXISTS `profiles`;
CREATE TABLE IF NOT EXISTS `profiles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `profiles_user_id_unique` (`user_id`),
  CONSTRAINT `profiles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.profiles: ~5 rows (approximately)
INSERT INTO `profiles` (`id`, `user_id`, `phone`, `address`, `image`, `type`, `created_at`, `updated_at`) VALUES
	(1, 3, '012345678', 'kpt', 'profiles/oTp6oi9rAaCnakGwrz5NTS0AGSRlMXbnVicrm7f4.png', 'admin', '2025-02-27 01:22:28', '2025-02-27 01:22:28'),
	(2, 4, '012345678', 'kpt', 'profiles/AY0dBqwOYwpW9bWuWIhy0dDK4lD3z5oIWpG5hVc9.png', 'user', '2025-02-27 01:22:49', '2025-02-27 01:22:49'),
	(3, 5, '012345678', 'kpt', 'profiles/mNu1bY8BluCRvhMGVnfEYRGPW7YgGQIU3MUnrKHz.png', 'user', '2025-03-04 03:01:42', '2025-03-04 03:01:42'),
	(4, 6, '012345678', 'kpt', 'profiles/w0yKZgvoBpiw2ZC3g74A46q28GXqR4LOEXHDJTXr.jpg', 'admin', '2025-03-15 18:46:13', '2025-03-15 18:46:13'),
	(5, 7, '1235689', 'Phnom Penh', 'profiles/HNNts6TbuLwry1xpTPvpqVfwLABDQrt0GjEeTvz4.png', NULL, '2025-05-17 17:44:51', '2025-05-17 17:44:51');

-- Dumping structure for table dbtest.provinces
DROP TABLE IF EXISTS `provinces`;
CREATE TABLE IF NOT EXISTS `provinces` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `distand_from_city` double NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.provinces: ~23 rows (approximately)
INSERT INTO `provinces` (`id`, `name`, `code`, `distand_from_city`, `status`, `created_at`, `updated_at`) VALUES
	(1, 'Banteay Meanchey', '001', 350, 1, NULL, NULL),
	(3, 'Kampong Cham', '003', 124, 1, NULL, NULL),
	(4, 'Kampong Chhnang', '004', 91, 1, NULL, NULL),
	(5, 'Kampong Speu', '005', 48, 1, NULL, NULL),
	(6, 'Kampong Thom', '006', 168, 1, NULL, NULL),
	(7, 'Kampot', '007', 150, 1, NULL, NULL),
	(8, 'Kandal', '008', 20, 1, NULL, NULL),
	(9, 'Koh Kong', '009', 270, 1, NULL, NULL),
	(10, 'Kratié', '010', 250, 1, NULL, NULL),
	(11, 'Mondulkiri', '011', 382, 1, NULL, NULL),
	(12, 'Oddar Meanchey', '012', 420, 1, NULL, NULL),
	(13, 'Pailin', '013', 345, 1, NULL, NULL),
	(14, 'Preah Sihanouk', '014', 230, 1, NULL, NULL),
	(15, 'Preah Vihear', '015', 340, 1, NULL, NULL),
	(16, 'Pursat', '016', 200, 1, NULL, NULL),
	(17, 'Prey Veng', '017', 90, 1, NULL, NULL),
	(18, 'Ratanakiri', '018', 588, 1, NULL, NULL),
	(19, 'Siem Reap', '019', 320, 1, NULL, NULL),
	(20, 'Stung Treng', '020', 455, 1, NULL, NULL),
	(21, 'Svay Rieng', '021', 125, 0, NULL, NULL),
	(22, 'Takéo', '022', 78, 0, NULL, NULL),
	(23, 'Tboung Khmum', '023', 140, 0, NULL, NULL),
	(24, 'Ontario', '024', 120, 1, '2025-02-06 00:37:13', '2025-02-06 00:37:13');

-- Dumping structure for table dbtest.roles
DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.roles: ~3 rows (approximately)
INSERT INTO `roles` (`id`, `name`, `description`, `status`, `created_at`, `updated_at`) VALUES
	(1, 'admin10', 'des admin1', 1, '2025-01-30 00:59:51', '2025-02-04 01:11:12'),
	(3, 'IT Project Manager', 'des IT Project Manager', 1, '2025-01-30 01:17:41', '2025-01-30 01:17:41'),
	(4, 'Backend Developer', 'des Backend Developer', 1, '2025-01-30 01:18:05', '2025-01-30 01:18:05');

-- Dumping structure for table dbtest.sessions
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.sessions: ~6 rows (approximately)
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
	('DO1TDj85IF46DpLh7nuw7WXhqaqmb0ZoTYgxvaVt', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNHRFWEIzY1RpV2R2UnFpVENSdzhDWVZLdmdLRDFycE5pZmttZm9WMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1738850333),
	('FJkaOY690jhNemFGkrQlD2GVMw4CS8xZCX2UmEbm', NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiS2VhVFFDUHRVa1pKU2JhRm5xZ0xZTlF5QXZkbTJ4SkdOZ2thTFFSeiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTk6Imh0dHA6Ly9sb2NhbGhvc3Q6ODYvY291cnNlL215UHJvamVjdC9sYXJhdmVsLWJhY2tlbmQvcHVibGljIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1742116147),
	('nLo6Zxykh9RBRFPrBaDglnIaFK5F7Ptk3gXTOSk5', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTmNmZjc2bWFiaGcwTWt0RHNOb1g1bHVYcERiSEt2R2N2WEdpZDRsUyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1741110661),
	('ow4NE21TgTz3YouLscDq4hd0EV27KLNme33wyE6c', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSmoyRlZ2OTJSNVh1cEsxMmVqdHFtWmJnd0R3SWFiRDBBSDlKZ1ZoVCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1742115538),
	('r3FSgRCQo24ssqXexOSnyau1WGVdv62rwAtodmNy', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOGxnSDNhOEdQY1djZFlZNnJxeDlTUUNIWHN6blNXbUdPeUVqYUR0diI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1745574417),
	('X2M4i6BS1gxDVF9PunmnAF1rRsII3duA1qBltIcx', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUWtwOWFsSTdXbnVvbkdNTExMZEh2aG1LRUVHQklYUW04TmNsbUlvbSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1738248182);

-- Dumping structure for table dbtest.suppliers
DROP TABLE IF EXISTS `suppliers`;
CREATE TABLE IF NOT EXISTS `suppliers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tel_contact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `web_site_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `suppliers_code_unique` (`code`),
  UNIQUE KEY `suppliers_tel_contact_unique` (`tel_contact`),
  UNIQUE KEY `suppliers_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.suppliers: ~0 rows (approximately)

-- Dumping structure for table dbtest.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dbtest.users: ~5 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
	(3, 'VuthKdroTom', 'admin@gmail.com', NULL, '$2y$12$P6treclwFk59DUGUViWH/eT3dPXoS4FzdDdUYa2EeifdKonvb62E6', NULL, '2025-02-27 01:22:28', '2025-02-27 01:22:28'),
	(4, 'DAVID', 'DAVID@gmail.com', NULL, '$2y$12$i9/khum9mHd5PiLoVWuduOFFUw31zmJ1Dt9WOemzuCsJ2ocpK3wC2', NULL, '2025-02-27 01:22:49', '2025-02-27 01:22:49'),
	(5, 'vid', 'vid@gmail.com', NULL, '$2y$12$aiEn2S2eckHKQ6OhwmQ5xe4zbcmd6bOtT.0b5sFGdR0CBrfAH/A.2', NULL, '2025-03-04 03:01:42', '2025-03-04 03:01:42'),
	(6, 'luffy', 'luffy@gmail.com', NULL, '$2y$12$P6treclwFk59DUGUViWH/eT3dPXoS4FzdDdUYa2EeifdKonvb62E6', NULL, '2025-03-15 18:46:13', '2025-03-15 18:46:13'),
	(7, 'Sara H. Minton', 'user02@gmail.com', NULL, '$2y$12$iDv9RQZ7RO7bke2i2.WKierrZ9iuyZGo5mwAAkJs0vmE6z7GnOSdy', NULL, '2025-05-17 17:44:51', '2025-05-17 17:44:51');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
