-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 30, 2022 at 12:42 PM
-- Server version: 5.7.33
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food_review`
--

-- --------------------------------------------------------

--
-- Table structure for table `category_medias`
--

CREATE TABLE `category_medias` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_medianame` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category_medias`
--

INSERT INTO `category_medias` (`id`, `category_medianame`, `status`, `created_at`, `updated_at`) VALUES
(1, 'User', 'active', '2022-10-24 14:06:25', '2022-10-24 14:06:25'),
(2, 'Food Place', 'active', '2022-10-25 15:07:56', '2022-10-25 15:07:56'),
(3, 'Post', 'active', '2022-10-25 15:07:56', '2022-10-25 15:07:56');

-- --------------------------------------------------------

--
-- Table structure for table `category_posts`
--

CREATE TABLE `category_posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category_posts`
--

INSERT INTO `category_posts` (`id`, `category_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Bữa sáng', 'active', '2022-10-23 15:25:40', '2022-10-23 15:25:40'),
(2, 'Bữa trưa', 'active', '2022-10-23 15:25:40', '2022-10-23 15:25:40'),
(3, 'Bữa tối', 'active', '2022-10-23 15:27:11', '2022-10-23 15:27:11'),
(4, 'Ăn vặt', 'active', '2022-10-23 15:27:11', '2022-10-23 15:27:11'),
(5, 'Gần bạn', 'active', '2022-10-23 15:27:11', '2022-10-23 15:27:11');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `city_name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `city_name`, `status`) VALUES
(1, 'TP. Hồ Chí Minh', 'active'),
(2, 'Hà Nội', 'active'),
(3, 'Đà Nẵng', 'active'),
(4, 'Hải Phòng', 'active'),
(5, 'Bình Dương', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_post` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `medias`
--

CREATE TABLE `medias` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_cat_media` int(11) NOT NULL,
  `id_post` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `medias`
--

INSERT INTO `medias` (`id`, `title`, `created_at`, `updated_at`, `id_cat_media`, `id_post`) VALUES
(1, 'com-ga-xoi-mo.jpeg', '2022-10-30 06:36:11', '2022-10-30 06:36:11', 3, 8),
(2, 'com2-1611892464-7028-1611892596.jpg', '2022-10-30 06:40:01', '2022-10-30 06:40:01', 3, 9),
(3, 'top-3-quan-com-ga-thom-ngon-kho-cuong-ma-dan-binh-thanh-thuong-ghe-an-202103160944556027.jpg', '2022-10-30 06:41:22', '2022-10-30 06:41:22', 3, 7),
(4, 'foody-upload-api-foody-mobile-fo-68b4ebf5-220111162633.jpeg', '2022-10-30 06:41:43', '2022-10-30 06:41:43', 3, 1),
(5, 'bach-tuoc-sa-te-mon-an.jpg', '2022-10-30 06:42:49', '2022-10-30 06:42:49', 3, 2),
(6, 'takoyaki.jpg', '2022-10-30 06:44:05', '2022-10-30 06:44:05', 3, 5),
(8, 'buffet-quan-2.png', '2022-10-30 08:38:00', '2022-10-30 08:38:00', 3, 10);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(3, '2022_10_23_144716_create_posts_table', 1),
(4, '2022_10_23_145900_create_category_post_table', 1),
(5, '2022_10_23_150352_create_media_table', 1),
(6, '2022_10_23_150522_create_category_media_table', 1),
(7, '2022_10_23_150725_create_reviews_table', 1),
(8, '2022_10_23_150851_create_place_food_table', 1),
(9, '2022_10_23_151322_create_cities_table', 1),
(10, '2022_10_23_151613_create_comments_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `place_foods`
--

CREATE TABLE `place_foods` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `place_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` text COLLATE utf8mb4_unicode_ci,
  `time_opening` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `low_price` double(8,2) DEFAULT NULL,
  `high_price` double(8,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `place_foods`
--

INSERT INTO `place_foods` (`id`, `place_name`, `address`, `avatar`, `time_opening`, `phone`, `low_price`, `high_price`, `created_at`, `updated_at`, `id_user`) VALUES
(1, 'Cơm Gà Bình Thạnh', '475A Bình Thạnh, TP Hồ Chí Minh', NULL, '7:00 - 19:00', 356809728, 35000.00, 60000.00, '2022-10-29 08:10:04', '2022-10-29 08:10:04', 1);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `vote` int(11) DEFAULT NULL,
  `rate` double(8,2) DEFAULT NULL,
  `id_cat_post` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_food_place` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `vote`, `rate`, `id_cat_post`, `id_user`, `id_food_place`, `created_at`, `updated_at`) VALUES
(1, 'Gà rán Bình Thạnh', 'Gà rán Bình Thạnh Gà rán Bình Thạnh Gà rán Bình Thạnh Gà rán Bình Thạnh Gà rán Bình Thạnh Gà rán Bình Thạnh Gà rán Bình Thạnh Gà rán Bình Thạnh Gà rán Bình Thạnh Gà rán Bình Thạnh Gà rán Bình Thạnh Gà rán Bình Thạnh Gà rán Bình Thạnh Gà rán Bình Thạnh Gà rán Bình Thạnh Gà rán Bình Thạnh Gà rán Bình Thạnh ', 15, 4.00, 1, 1, 1, '2022-10-23 15:32:17', '2022-10-23 15:32:17'),
(2, 'Bạch tuộc nướng Bình Thạnh', 'Mực nướng Bình Thạnh Mực nướng Bình Thạnh Mực nướng Bình Thạnh Mực nướng Bình Thạnh ', 30, 3.00, 1, 1, 1, '2022-10-23 15:32:17', '2022-10-23 15:32:17'),
(5, 'Món mới', 'Món mới Món mới Món mới Món mới Món mới', 7, 3.00, 1, 1, 1, '2022-10-24 08:17:14', '2022-10-28 23:24:48'),
(7, 'Cơm gà Thủ Đức', 'Cơm gà Thủ Đức Cơm gà Thủ Đức Cơm gà Thủ Đức Cơm gà Thủ Đức ', 3, 4.00, 1, 1, 1, '2022-10-29 08:14:01', '2022-10-29 08:14:01'),
(8, 'Cơm gà Thủ Đức 2 ', 'Cơm gà Thủ Đức Cơm gà Thủ Đức Cơm gà Thủ Đức Cơm gà Thủ Đức Cơm gà Thủ Đức ', 3, 4.00, 1, 1, 1, '2022-10-29 08:14:01', '2022-10-29 08:14:01'),
(9, 'Gyu-Kaku Japanese BBQ - Hồ Chí Minh', 'Gyukaku Gyukaku', 56, 5.00, 1, 1, 1, '2022-10-30 05:52:21', '2022-10-30 05:52:21'),
(10, 'Buffet Quận 2', 'Buffet Quận 2 Buffet Quận 2 Buffet Quận 2 Buffet Quận 2 ', 53, 4.00, 4, 1, 1, '2022-10-30 08:36:39', '2022-10-30 08:36:39');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `hygiene` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `taste` int(11) DEFAULT NULL,
  `space` int(11) DEFAULT NULL,
  `service` int(11) DEFAULT NULL,
  `id_post` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fullname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` text COLLATE utf8mb4_unicode_ci,
  `birthday` date DEFAULT NULL,
  `location` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `username`, `password`, `email`, `avatar`, `birthday`, `location`, `gender`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Nguyễn Nhựt Quang', 'quangnguyen', '$2y$10$ZkKfT10lD1R/jWYbgNileuXFWO4K7dBYhZ.VsPuhD7U2CQlAFt5aG', 'n.nquanght@gmail.com', '285659786_5844040325608600_4158464762231513803_n.jpg', '1999-12-08', 'TP. Hồ Chí Minh', 'Nam', NULL, '2022-10-23 15:31:19', '2022-10-23 15:31:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category_medias`
--
ALTER TABLE `category_medias`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category_posts`
--
ALTER TABLE `category_posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medias`
--
ALTER TABLE `medias`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `place_foods`
--
ALTER TABLE `place_foods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category_medias`
--
ALTER TABLE `category_medias`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `category_posts`
--
ALTER TABLE `category_posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `medias`
--
ALTER TABLE `medias`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `place_foods`
--
ALTER TABLE `place_foods`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
