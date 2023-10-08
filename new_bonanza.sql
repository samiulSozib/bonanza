-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2023 at 08:03 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `new_bonanza`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `full_name` text NOT NULL,
  `bio` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(60) NOT NULL,
  `password` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `upatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `image`, `full_name`, `bio`, `email`, `phone_number`, `password`, `createdAt`, `upatedAt`) VALUES
(3, 'admin', '/uploads/admin-image-1690016668424-user.png', 'Mainul Hossain', 'Hello,\r\nI\'m Mainul Hossain, Director of Bonanza Jute Composite & Diverse Factory Limited, from Bangladesh. we are Manufacturing Company of Jute Yarn & Twine, Jute Bags, Jute Hessian cloth and supplier of raw jute. Our Company established in 2014 and currently more than 1200 People are working in our industry.\r\n\r\nPlease contact in whatsapp for prompt response.\r\n\r\nThank you :)\r\nWechat/Whatsapp/Viber: +8801750613481\r\nE-mail: bonanza.jutecomposite@gmail.com\r\nWeb-Site: www.bonanzajutecomposite.com', 'bonanza.jutecomposite@gmail.com', '+8801750613481', '$2b$10$t3exhIQuBYdj.TiP80XuF.2hvYZBoSiyTKjnSuzbVXULgdc0xs8Nu', '2023-07-20 09:37:33', '2023-07-20 09:37:33');

-- --------------------------------------------------------

--
-- Table structure for table `basic_information`
--

CREATE TABLE `basic_information` (
  `id` int(11) NOT NULL,
  `importRate` varchar(20) NOT NULL,
  `exportRate` varchar(20) NOT NULL,
  `productionRate` varchar(20) NOT NULL,
  `employeesCount` varchar(20) NOT NULL,
  `officeCount` varchar(20) NOT NULL,
  `projectCount` varchar(20) NOT NULL,
  `customerCount` varchar(20) NOT NULL,
  `responseRate` varchar(20) NOT NULL,
  `responseTime` varchar(20) NOT NULL,
  `quotationPerformance` varchar(20) NOT NULL,
  `videoHomePage` text NOT NULL,
  `videoProductPage` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `basic_information`
--

INSERT INTO `basic_information` (`id`, `importRate`, `exportRate`, `productionRate`, `employeesCount`, `officeCount`, `projectCount`, `customerCount`, `responseRate`, `responseTime`, `quotationPerformance`, `videoHomePage`, `videoProductPage`, `createdAt`, `updatedAt`) VALUES
(1, '0', '100', '100', '1200', '1', '698', '20', '100%', '2 Hours', '90%', 'https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1', 'https://www.youtube.com/embed/2BmAJw8lVUU', '2023-07-16 15:43:46', '2023-07-16 15:43:46');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `createdAt`, `updatedAt`) VALUES
(22, 'Jute Twine', '2023-07-24 04:33:34', '2023-07-24 04:33:34'),
(23, 'Jute Rope', '2023-07-24 04:33:41', '2023-07-24 04:33:41'),
(24, 'Jute Fiber', '2023-07-24 04:33:50', '2023-07-24 04:33:50'),
(25, 'Jute Yarn', '2023-07-24 04:34:00', '2023-07-24 04:34:00'),
(26, 'Jute Bag', '2023-07-24 04:34:51', '2023-07-24 04:34:51');

-- --------------------------------------------------------

--
-- Table structure for table `certification`
--

CREATE TABLE `certification` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `image` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `certification`
--

INSERT INTO `certification` (`id`, `name`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Certification-1', '/uploads/certification-1695233601124-EPB Membership Certificate_bonanza.jpg', '2023-09-20 18:13:21', '2023-09-20 18:13:21'),
(2, 'Certification-2', '/uploads/certification-1695233706535-Web capture_20-9-2023_20021_.jpeg', '2023-09-20 18:15:06', '2023-09-20 18:15:06'),
(3, 'Certification-3', '/uploads/certification-1695233809596-Web capture_20-9-2023_20140_.jpeg', '2023-09-20 18:16:49', '2023-09-20 18:16:49'),
(4, 'Certification-4', '/uploads/certification-1695233923557-Web capture_20-9-2023_20227_.jpeg', '2023-09-20 18:18:43', '2023-09-20 18:18:43');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `phoneNumber`, `category`, `message`, `createdAt`, `updatedAt`) VALUES
(27, 'Country-1', 'myallproject@gamil.com', 6767, 'Financial consulting1', 'hjjjh', '2023-07-19 07:05:09', '2023-07-19 07:05:09'),
(28, 'Country-1', 'myallproject@gamil.com', 6767, 'Financial consulting1', 'bnbnb', '2023-07-19 07:10:59', '2023-07-19 07:10:59'),
(30, 'Country-1', 'myallproject@gamil.com', 6767, 'Financial consulting1', 'gfgfdgdfg', '2023-07-19 07:17:51', '2023-07-19 07:17:51'),
(31, 'Country-1', 'myallproject@gamil.com', 6767, 'Financial consulting1', 'cvcbb', '2023-07-19 07:24:17', '2023-07-19 07:24:17'),
(32, 'Country-1', 'samiulcse2018@gmail.com', 6767, 'Financial consulting1', 'jhjgh', '2023-07-19 07:26:05', '2023-07-19 07:26:05'),
(33, 'samiul bashar ', 'samiulcse2018@gmail.com', 880, 'Financial consulting2', 'Demo', '2023-07-20 06:49:27', '2023-07-20 06:49:27'),
(35, 'Rashi', 'rashidatulkobra180631@gmail.com', 1753227645, 'Financial consulting3', 'dscfdf', '2023-07-23 12:22:27', '2023-07-23 12:22:27'),
(37, 'Soykot Hosen', 'soykot.ruet.cse@gmail.com', 1784286885, 'Financial consulting 1', 'dzfjhcn', '2023-09-02 13:20:42', '2023-09-02 13:20:42'),
(38, 'Rashidatul Kobra', 'kobrarashi@gmail.com', 1753227645, 'Any Enquiry of Jute Goods', 'ggihi', '2023-09-16 16:16:35', '2023-09-16 16:16:35'),
(39, 'Rashi', 'rashidatulkobra180631@gmail.com', 1753227645, 'Any Enquiry of Jute Goods', 'csytfuh', '2023-09-16 16:16:58', '2023-09-16 16:16:58'),
(40, 'Rashi', 'kobrarashi@gmail.com', 1753227645, 'Any Enquiry of Jute Goods', 'dfdgg', '2023-09-17 11:38:36', '2023-09-17 11:38:36');

-- --------------------------------------------------------

--
-- Table structure for table `contact_form_dropdown`
--

CREATE TABLE `contact_form_dropdown` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact_form_dropdown`
--

INSERT INTO `contact_form_dropdown` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(5, 'Any Enquiry of Jute Goods', '2023-07-26 14:15:31', '2023-07-26 14:15:31');

-- --------------------------------------------------------

--
-- Table structure for table `contact_information`
--

CREATE TABLE `contact_information` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `phoneNumber` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `location` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact_information`
--

INSERT INTO `contact_information` (`id`, `name`, `designation`, `phoneNumber`, `email`, `location`, `createdAt`, `updatedAt`) VALUES
(1, 'MAINUL HOSSAIN', 'Marketing Director', '+8801750613481', 'bonanza.jutecomposite@gmail.com', 'Kolaron, Boalmari, Faridpur, Dhaka, Bangladesh', '2023-07-16 04:33:20', '2023-07-16 04:33:20'),
(2, 'MOHSIN HUSAIN ', 'Managing Director', '+8801977672835', 'bonanza.jutecomposite@gmail.com', 'Kolaron, Boalmari, Faridpur, Dhaka, Bangladesh', '2023-07-16 04:33:20', '2023-07-16 04:33:20');

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `upatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`id`, `name`, `image`, `createdAt`, `upatedAt`) VALUES
(15, 'Country-1', '/uploads/country-image-1689686787773-Ellipse 72.png', '2023-07-18 13:26:27', '2023-07-18 13:26:27'),
(16, 'Country-2', '/uploads/country-image-1689686800567-Ellipse 73.png', '2023-07-18 13:26:40', '2023-07-18 13:26:40'),
(17, 'Country-3', '/uploads/country-image-1689686809262-Ellipse 74.png', '2023-07-18 13:26:49', '2023-07-18 13:26:49'),
(18, 'Country-4', '/uploads/country-image-1689686818387-Ellipse 75.png', '2023-07-18 13:26:58', '2023-07-18 13:26:58'),
(19, 'Country-5', '/uploads/country-image-1689686827421-Ellipse 76.png', '2023-07-18 13:27:07', '2023-07-18 13:27:07'),
(23, 'Country6', '/uploads/country-image-1695233451726-Ellipse 72.png', '2023-09-20 18:10:51', '2023-09-20 18:10:51'),
(24, 'Country7', '/uploads/country-image-1695233467331-Ellipse 73.png', '2023-09-20 18:11:07', '2023-09-20 18:11:07'),
(25, 'Country8', '/uploads/country-image-1695233478181-Ellipse 74.png', '2023-09-20 18:11:18', '2023-09-20 18:11:18'),
(26, 'Country9', '/uploads/country-image-1695233488871-Ellipse 75.png', '2023-09-20 18:11:28', '2023-09-20 18:11:28'),
(27, 'Country10', '/uploads/country-image-1695233498664-Ellipse 76.png', '2023-09-20 18:11:38', '2023-09-20 18:11:38');

-- --------------------------------------------------------

--
-- Table structure for table `enquiry`
--

CREATE TABLE `enquiry` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `phoneNumber` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` text NOT NULL,
  `enquiry` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `enquiry`
--

INSERT INTO `enquiry` (`id`, `name`, `phoneNumber`, `email`, `subject`, `enquiry`, `createdAt`, `updatedAt`) VALUES
(9, 'Rashidatul Kobra', '01753227645', 'rashidatulkobra180631@gmail.com', 'aaaa', 'uaui', '2023-07-22 17:28:24', '2023-07-22 17:28:24'),
(10, 'Rashidatul Kobra', '01753227645', 'rashidatulkobra180631@gmail.com', 'aaaa', 'fesrhfd', '2023-07-23 12:18:36', '2023-07-23 12:18:36'),
(11, 'Rashi', '01753227645', 'kobrarashi@gmail.com', 'ghgj', 'gncnfhfj', '2023-07-23 12:19:18', '2023-07-23 12:19:18'),
(12, 'Soykot Hosen', '+8801784286885', 'soykot.ruet.cse@gmail.com', 'Wrong EPP Code Showing in other website when I try to tranfer the domain', 'ershdf', '2023-09-02 14:20:24', '2023-09-02 14:20:24'),
(13, 'egsd', '+8801784286885', 'soykot.ruet.cse@gmail.com', 'Wrong EPP Code Showing in other website when I try to tranfer the domain', 'sdhssjfjj', '2023-09-02 14:20:41', '2023-09-02 14:20:41'),
(14, 'Rashidatul Kobra', '01753227645', 'rashidatulkobra180631@gmail.com', 'aaaa', 'cdsryu', '2023-09-16 16:19:56', '2023-09-16 16:19:56'),
(15, 'kobra', '01753227645', 'kobrarashi@gmail.com', 'kkkkk', 'bbbbbbb', '2023-09-16 16:21:07', '2023-09-16 16:21:07');

-- --------------------------------------------------------

--
-- Table structure for table `factory_video`
--

CREATE TABLE `factory_video` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `link` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `factory_video`
--

INSERT INTO `factory_video` (`id`, `title`, `link`, `createdAt`, `updatedAt`) VALUES
(13, 'Jute Factory in Bangladesh', 'https://www.youtube.com/embed/0K_NtxGEqDU', '2023-09-14 10:48:51', '2023-09-14 10:48:51'),
(14, 'Jute Factory in Bangladesh', 'https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1', '2023-09-14 10:49:58', '2023-09-14 10:49:58'),
(15, 'Jute Factory in Bangladesh', 'https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1', '2023-09-14 10:50:25', '2023-09-14 10:50:25'),
(19, 'Abc', 'https://www.youtube.com/embed/0K_NtxGEqDU', '2023-09-14 11:02:42', '2023-09-14 11:02:42'),
(13, 'Jute Factory in Bangladesh', 'https://www.youtube.com/embed/0K_NtxGEqDU', '2023-09-14 10:48:51', '2023-09-14 10:48:51'),
(14, 'Jute Factory in Bangladesh', 'https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1', '2023-09-14 10:49:58', '2023-09-14 10:49:58'),
(15, 'Jute Factory in Bangladesh', 'https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1', '2023-09-14 10:50:25', '2023-09-14 10:50:25'),
(19, 'Abc', 'https://www.youtube.com/embed/0K_NtxGEqDU', '2023-09-14 11:02:42', '2023-09-14 11:02:42');

-- --------------------------------------------------------

--
-- Table structure for table `frequently_question`
--

CREATE TABLE `frequently_question` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `frequently_question`
--

INSERT INTO `frequently_question` (`id`, `question`, `answer`, `createdAt`, `updatedAt`) VALUES
(0, 'Who are we?', 'We are based in Dhaka, Bangladesh, starting from 2019, selling to South Asia(20.00%), Southern Europe(20.00%), Western Europe(20.00%), Southeast Asia(20.00%), and Eastern Europe(20.00%). There are total about 1000+ people in our office.', '2023-09-20 18:00:41', '2023-09-20 18:00:41'),
(0, 'How can we guarantee quality?', 'Always a pre-production sample before mass production; Always final Inspection before shipment;', '2023-09-20 18:02:48', '2023-09-20 18:02:48'),
(0, 'What can you buy from us?', 'Jute Bag,Jute Cloth,Jute Yarn,Hessian Sack,Raw Jute\r\n\r\n1. Why should you buy from us not from other suppliers?\r\nHello,Welcome to our company. It\'s already a very well reputed company in Bangladesh now. Since 2014 we hold this reputation as a quality jute products producer. We can happily introduce ourselves that we are operating the company\r\n\r\n2. what services can we provide?\r\nAccepted Delivery Terms: FOB；\r\nAccepted Payment Currency:USD;\r\nAccepted Payment Type: T/T,L/C,PayPal;\r\nLanguage Spoken:English,Hindi', '2023-09-20 18:04:34', '2023-09-20 18:04:34'),
(0, 'Who are we?', 'We are based in Dhaka, Bangladesh, starting from 2019, selling to South Asia(20.00%), Southern Europe(20.00%), Western Europe(20.00%), Southeast Asia(20.00%), and Eastern Europe(20.00%). There are total about 1000+ people in our office.', '2023-09-20 18:00:41', '2023-09-20 18:00:41'),
(0, 'How can we guarantee quality?', 'Always a pre-production sample before mass production; Always final Inspection before shipment;', '2023-09-20 18:02:48', '2023-09-20 18:02:48'),
(0, 'What can you buy from us?', 'Jute Bag,Jute Cloth,Jute Yarn,Hessian Sack,Raw Jute\r\n\r\n1. Why should you buy from us not from other suppliers?\r\nHello,Welcome to our company. It\'s already a very well reputed company in Bangladesh now. Since 2014 we hold this reputation as a quality jute products producer. We can happily introduce ourselves that we are operating the company\r\n\r\n2. what services can we provide?\r\nAccepted Delivery Terms: FOB；\r\nAccepted Payment Currency:USD;\r\nAccepted Payment Type: T/T,L/C,PayPal;\r\nLanguage Spoken:English,Hindi', '2023-09-20 18:04:34', '2023-09-20 18:04:34');

-- --------------------------------------------------------

--
-- Table structure for table `herobanner`
--

CREATE TABLE `herobanner` (
  `id` int(11) NOT NULL,
  `homePageBanner` text NOT NULL,
  `heroBannerText` text NOT NULL,
  `heroBannerSubtext` text NOT NULL,
  `logoBGWhite` text NOT NULL,
  `logo` text NOT NULL,
  `whatsappNumber` varchar(60) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `herobanner`
--

INSERT INTO `herobanner` (`id`, `homePageBanner`, `heroBannerText`, `heroBannerSubtext`, `logoBGWhite`, `logo`, `whatsappNumber`, `createdAt`, `updatedAt`) VALUES
(1, '/uploads/hero_image-1689687325940-herobg.png', '100% Export Oriented', 'Jute Goods Manufacturing Company from Bangladesh.', '/uploads/logo1_image-1689687325968-logo-bg-white.png', '/uploads/logo2_image-1689687325968-logo.png', '+8801750613481', '2023-07-18 05:18:59', '2023-07-18 05:18:59');

-- --------------------------------------------------------

--
-- Table structure for table `m_d_information`
--

CREATE TABLE `m_d_information` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `statement` text NOT NULL,
  `phoneNumber` varchar(60) NOT NULL,
  `email` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `instagram` varchar(255) NOT NULL,
  `facebook` varchar(255) NOT NULL,
  `twitter` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `m_d_information`
--

INSERT INTO `m_d_information` (`id`, `name`, `designation`, `image`, `statement`, `phoneNumber`, `email`, `website`, `instagram`, `facebook`, `twitter`, `createdAt`, `updatedAt`) VALUES
(1, 'MOHSIN HUSAIN', 'Managing Director', '/uploads/md-image-1696084829282-MD01.png', 'I hope this message finds you in good health and high spirits. As the Managing Director of Bonanza, I wanted to take a moment to personally connect with you and share some important updates regarding our products and services.\r\n\r\nFirst and foremost, I want to express our sincere gratitude for your continued support and trust in our jute products. Your loyalty has been instrumental in our journey to provide high-quality jute goods to customers like you.\r\n\r\n', '‎+8801977672835', 'bonanza.jutecomposite@gmail.com', 'bonanzajutecomposite.com', 'https://web.instagram.com/', 'https://www.facebook.com/profile.php?id=100076240514026', 'https://web.twitter.com/', '2023-07-16 13:41:28', '2023-07-16 13:41:28'),
(2, 'MAINUL HOSSAIN\r\n', 'Managing Director\r\n', 'https://st2.depositphotos.com/1011643/9934/i/950/depositphotos_99348500-stock-photo-electrical-engineer-with-arms-crossed.jpg', 'Hello! to the table win survival strategy ensure to proactive domination At the end of the day, going forward new normal that has evolved from user generated content will have touch points shoring hanging fruits to identify a ballpark value-added activity to beta.', '+8801750613481', 'bonanza.jutecomposite@gmail.com', '-', 'https://web.instagram.com/', 'https://web.facebook.com/s.bashar22/', 'https://web.twitter.com/', '2023-07-16 13:41:28', '2023-07-16 13:41:28');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` text NOT NULL,
  `product_model` varchar(255) NOT NULL,
  `unit` varchar(60) NOT NULL,
  `fob_price` varchar(255) NOT NULL,
  `min_order_quentity` varchar(255) NOT NULL,
  `suppy_ability` varchar(255) NOT NULL,
  `processing_time` text NOT NULL,
  `packaging_details` text NOT NULL,
  `product_details` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `product_model`, `unit`, `fob_price`, `min_order_quentity`, `suppy_ability`, `processing_time`, `packaging_details`, `product_details`, `createdAt`, `updatedAt`) VALUES
(27, '10Lbs/1ply (CB) for Carpet', 'JF-0001', 'Ton', '83000', '13 Tone', '60 Tone/day', '30 days after payment', '<table width=\"170\">\n                           <tbody>\n                           <tr>\n                             <td>1 pc/polybag,</td>\n                           </tr>\n                             <tr>\n                             <td>Pallet Packaging</td>\n                           </tr><tr>\n                             <td>Paper Spool</td>\n                           </tr><tr>\n                             <td>Truss Packaging</td>\n                           </tr><tr>\n                             <td>As per buyer requirement.</td>\n                           </tr>\n                           </tbody>\n                           </table>', '\n                           <table style=\"border-collapse: collapse; width: 100%;\" border=\"1\">\n                           <colgroup>\n                             <col style=\"width: 50%;\">\n                             <col style=\"width: 50%;\">\n                           </colgroup>\n                           <tbody>\n                             <tr>\n                               <td>100% Jute</td>\n                               <td>Tossa</td>\n                             </tr>\n                             <tr>\n                               <td>Model Number</td>\n                               <td>JY-0002</td>\n                             </tr>\n                             <tr>\n                               <td>Strength</td>\n                               <td>110%-111%</td>\n                             </tr>\n                             <tr>\n                               <td>Yarn Count</td>\n                               <td>10Lbs</td>\n                             </tr>\n                             <tr>\n                               <td>Number of Ply</td>\n                               <td>1ply</td>\n                             </tr>\n                             <tr>\n                               <td>TPI</td>\n                               <td>4.54</td>\n                             </tr>\n                             \n                             <tr>\n                               <td>Quality</td>\n                               <td>CB\"</td>\n                             </tr>\n                             <tr>\n                               <td>HS Code</td>\n                               <td>hs code</td>\n                             </tr>\n                           </tbody>\n                         </table>\n                           ', '2023-09-20 17:58:33', '2023-09-20 17:58:33'),
(28, '10Lbs/1ply(Hessian)', 'JY-0003', 'Metric Ton', '1000 USD', '13 Metric Ton', '300 Metric ton per month', '7 days', '<table width=\"170\">\n            <tbody>\n            <tr>\n              <td>1 pc/polybag, </td>\n            </tr>\n              <tr>\n              <td>Pallet Packaging</td>\n            </tr><tr>\n              <td>Paper Spool</td>\n            </tr><tr>\n              <td>Truss Packaging As per buyer requirement.</td>\n            </tr><tr>\n              <td></td>\n            </tr>\n            </tbody>\n            </table>', '\n            <table style=\"border-collapse: collapse; width: 100%;\" border=\"1\">\n            <colgroup>\n              <col style=\"width: 50%;\">\n              <col style=\"width: 50%;\">\n            </colgroup>\n            <tbody>\n              <tr>\n                <td>100% Jute</td>\n                <td>Tossa</td>\n              </tr>\n              <tr>\n                <td>Model Number</td>\n                <td>JY-0003</td>\n              </tr>\n              <tr>\n                <td>Strength</td>\n                <td>105%-106%</td>\n              </tr>\n              <tr>\n                <td>Yarn Count</td>\n                <td>10Lbs</td>\n              </tr>\n              <tr>\n                <td>Number of Ply</td>\n                <td>1ply</td>\n              </tr>\n              <tr>\n                <td>TPI</td>\n                <td>4.54</td>\n              </tr>\n              \n              <tr>\n                <td>Quality</td>\n                <td>Hessian</td>\n              </tr>\n              <tr>\n                <td>HS Code</td>\n                <td>53071000</td>\n              </tr>\n            </tbody>\n          </table>\n            ', '2023-09-30 15:33:01', '2023-09-30 15:33:01'),
(29, '8Lbs/1ply CB', 'JY-0028', 'Metric Ton', '$1000/MT', '13 Metric Tons', '200 Metric Tons per Month', '10 days per 13 MT', '<table width=\"170\">\n            <tbody>\n            <tr>\n              <td>Wooden, Plastic & Paper Tubes (Parallel / Conical Spools) are used in 5-20 kg jute yarn spool.</td>\n            </tr>\n              <tr>\n              <td>1 pc/polybag </td>\n            </tr><tr>\n              <td>Winding in Both Precision & Mackroll formats</td>\n            </tr><tr>\n              <td>Packaging is in Pallet, Carton, Truss or Hanks</td>\n            </tr><tr>\n              <td>As per buyer requirement.</td>\n            </tr>\n            </tbody>\n            </table>', '\n            <table style=\"border-collapse: collapse; width: 100%;\" border=\"1\">\n            <colgroup>\n              <col style=\"width: 50%;\">\n              <col style=\"width: 50%;\">\n            </colgroup>\n            <tbody>\n              <tr>\n                <td>100% Jute</td>\n                <td>Tossa</td>\n              </tr>\n              <tr>\n                <td>Model Number</td>\n                <td>JY-0028</td>\n              </tr>\n              <tr>\n                <td>Strength</td>\n                <td>110%-111%</td>\n              </tr>\n              <tr>\n                <td>Yarn Count</td>\n                <td>8 LBS</td>\n              </tr>\n              <tr>\n                <td>Number of Ply</td>\n                <td>1 Ply</td>\n              </tr>\n              <tr>\n                <td>TPI</td>\n                <td>4.83</td>\n              </tr>\n              \n              <tr>\n                <td>Quality</td>\n                <td>CB</td>\n              </tr>\n              <tr>\n                <td>HS Code</td>\n                <td>53071000</td>\n              </tr>\n            </tbody>\n          </table>\n            ', '2023-10-01 14:47:06', '2023-10-01 14:47:06');

-- --------------------------------------------------------

--
-- Table structure for table `product_category`
--

CREATE TABLE `product_category` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_category`
--

INSERT INTO `product_category` (`id`, `product_id`, `category_id`, `createdAt`, `updatedAt`) VALUES
(19, 27, 25, '2023-09-20 17:58:33', '2023-09-20 17:58:33'),
(20, 28, 25, '2023-09-30 15:33:01', '2023-09-30 15:33:01'),
(21, 29, 25, '2023-10-01 14:47:06', '2023-10-01 14:47:06');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image` text NOT NULL,
  `featured_image` tinyint(1) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image`, `featured_image`, `createdAt`, `updatedAt`) VALUES
(61, 27, '/uploads/product-featured-image-1696170581822-PACKAGINGS.jpg', 1, '2023-09-20 17:58:33', '2023-09-20 17:58:33'),
(62, 27, '/uploads/product-image-1695232713320-product-9.png', 0, '2023-09-20 17:58:33', '2023-09-20 17:58:33'),
(63, 27, '/uploads/product-image-1695232713321-product-1.png', 0, '2023-09-20 17:58:33', '2023-09-20 17:58:33'),
(64, 28, '/uploads/product-featured-image-1696087981878-1.JY-0003.jpg', 1, '2023-09-30 15:33:01', '2023-09-30 15:33:01'),
(65, 28, '/uploads/product-image-1696087981880-2.JY-0003.jpg', 0, '2023-09-30 15:33:01', '2023-09-30 15:33:01'),
(66, 28, '/uploads/product-image-1696087981882-JY-0003..750by800.jpg', 0, '2023-09-30 15:33:01', '2023-09-30 15:33:01'),
(67, 28, '/uploads/product-image-1696087981884-4.JY-0003 (2).jpg', 0, '2023-09-30 15:33:01', '2023-09-30 15:33:01'),
(68, 29, '/uploads/product-featured-image-1696171624274-7.JY-0028 (7).jpg', 1, '2023-10-01 14:47:06', '2023-10-01 14:47:06');

-- --------------------------------------------------------

--
-- Table structure for table `product_sub_category`
--

CREATE TABLE `product_sub_category` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `sub_category_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_sub_category`
--

INSERT INTO `product_sub_category` (`id`, `product_id`, `sub_category_id`, `createdAt`, `updatedAt`) VALUES
(9, 27, 26, '2023-09-20 17:58:33', '2023-09-20 17:58:33');

-- --------------------------------------------------------

--
-- Table structure for table `product_video`
--

CREATE TABLE `product_video` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `video` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_video`
--

INSERT INTO `product_video` (`id`, `product_id`, `video`, `createdAt`, `updatedAt`) VALUES
(13, 29, '/uploads/video-1696171624275-MVI_0233.MOV', '2023-10-01 14:47:06', '2023-10-01 14:47:06');

-- --------------------------------------------------------

--
-- Table structure for table `social_media_link`
--

CREATE TABLE `social_media_link` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `link` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `social_media_link`
--

INSERT INTO `social_media_link` (`id`, `name`, `link`, `createdAt`, `updatedAt`) VALUES
(1, 'facebook', 'https://www.facebook.com/profile.php?id=100076240514026', '2023-09-13 16:43:30', '2023-09-13 16:43:30'),
(2, 'twitter', '', '2023-09-13 16:43:30', '2023-09-13 16:43:30'),
(3, 'youtube', '', '2023-09-13 16:43:49', '2023-09-13 16:43:49'),
(4, 'instagram', 'https://instagram.com/bonanzajutecomposite?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D', '2023-09-13 16:43:49', '2023-09-13 16:43:49'),
(5, 'linkedlin', '', '2023-09-13 16:44:06', '2023-09-13 16:44:06'),
(1, 'facebook', 'https://www.facebook.com/profile.php?id=100076240514026', '2023-09-13 16:43:30', '2023-09-13 16:43:30'),
(2, 'twitter', '', '2023-09-13 16:43:30', '2023-09-13 16:43:30'),
(3, 'youtube', '', '2023-09-13 16:43:49', '2023-09-13 16:43:49'),
(4, 'instagram', 'https://instagram.com/bonanzajutecomposite?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D', '2023-09-13 16:43:49', '2023-09-13 16:43:49'),
(5, 'linkedlin', '', '2023-09-13 16:44:06', '2023-09-13 16:44:06');

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` int(11) NOT NULL,
  `subcategory_name` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `subcategory_name`, `category_id`, `createdAt`, `updatedAt`) VALUES
(26, 'Jute shopping Bag', 26, '2023-07-24 04:34:51', '2023-07-24 04:34:51'),
(27, 'Jute sacking Bag', 26, '2023-07-24 04:34:51', '2023-07-24 04:34:51');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `phoneNumber` varchar(60) NOT NULL,
  `email` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `name`, `designation`, `phoneNumber`, `email`, `image`, `createdAt`, `updatedAt`) VALUES
(10, 'MAINUL HOSSAIN', 'Marketing Director', '+8801750613481', 'bonanza.jutecomposite@gmail.com', '/uploads/expert-image-1696083143699-Employee_image01.png', '2023-07-18 13:19:31', '2023-07-18 13:19:31'),
(11, 'Towhid Uz Zaman', 'Director of Operations', '+8801672509516', 'bonanza.jutecomposite@gmail.com', '/uploads/expert-image-1696082718479-Employee_image.png', '2023-07-18 13:19:31', '2023-07-18 13:19:31'),
(12, '-', 'General Manager', '8801750613481', 'bonanza.jutecomposite@gmail.com', '/uploads/expert-image-1696085085393-Employee_imagegeneral01.png', '2023-07-18 13:19:31', '2023-07-18 13:19:31'),
(13, '-', 'Production Manager', '8801750613481', 'bonanza.jutecomposite@gmail.com', '/uploads/expert-image-1696085164630-Employee_imagegeneral01.png', '2023-07-18 13:19:31', '2023-07-18 13:19:31'),
(17, '-', 'Quality Manager', '017532276', 'kobrarashi@gmail.com', '/uploads/expert-image-1696085188574-Employee_imagegeneral01.png', '2023-09-17 11:41:48', '2023-09-17 11:41:48'),
(19, '-', 'Jute Manager', '+8801784286885', 'soykot.ruet.cse@gmail.com', '/uploads/expert-image-1696085302288-Employee_imagegeneral01.png', '2023-09-20 18:44:30', '2023-09-20 18:44:30');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(150) NOT NULL,
  `text` text NOT NULL,
  `image` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `location`, `text`, `image`, `createdAt`, `updatedAt`) VALUES
(6, 'Joe Blo', 'France', '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pulvinar lorem justo, id faucibus mi.”', '/uploads/testimonial-image-1689686647645-client-1.png', '2023-07-18 13:24:07', '2023-07-18 13:24:07'),
(7, 'Joe Blo ', 'France ', '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pulvinar lorem justo, id faucibus mi.” ', '/uploads/testimonial-image-1689686699197-client-2.png', '2023-07-18 13:24:07', '2023-07-18 13:24:07'),
(8, 'Joe Blo', 'France', '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pulvinar lorem justo, id faucibus mi.”', '/uploads/testimonial-image-1689686709543-client-3.png', '2023-07-18 13:24:07', '2023-07-18 13:24:07'),
(12, 'Rashi', 'France ', 'dsrhgtyjyf', '/uploads/testimonial-image-1694951840638-WhatsApp Image 2023-09-17 at 5.41.09 PM.jpeg', '2023-09-17 11:57:20', '2023-09-17 11:57:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `basic_information`
--
ALTER TABLE `basic_information`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `certification`
--
ALTER TABLE `certification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_form_dropdown`
--
ALTER TABLE `contact_form_dropdown`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_information`
--
ALTER TABLE `contact_information`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enquiry`
--
ALTER TABLE `enquiry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `herobanner`
--
ALTER TABLE `herobanner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `m_d_information`
--
ALTER TABLE `m_d_information`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `i_product_id` (`product_id`);

--
-- Indexes for table `product_sub_category`
--
ALTER TABLE `product_sub_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `s_product_id` (`product_id`),
  ADD KEY `sub_category_id` (`sub_category_id`);

--
-- Indexes for table `product_video`
--
ALTER TABLE `product_video`
  ADD PRIMARY KEY (`id`),
  ADD KEY `v_product_id` (`product_id`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sub_categories` (`category_id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `basic_information`
--
ALTER TABLE `basic_information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `contact_form_dropdown`
--
ALTER TABLE `contact_form_dropdown`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `enquiry`
--
ALTER TABLE `enquiry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `herobanner`
--
ALTER TABLE `herobanner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `m_d_information`
--
ALTER TABLE `m_d_information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `product_category`
--
ALTER TABLE `product_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `product_sub_category`
--
ALTER TABLE `product_sub_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `product_video`
--
ALTER TABLE `product_video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_category`
--
ALTER TABLE `product_category`
  ADD CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `i_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_sub_category`
--
ALTER TABLE `product_sub_category`
  ADD CONSTRAINT `s_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sub_category_id` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`);

--
-- Constraints for table `product_video`
--
ALTER TABLE `product_video`
  ADD CONSTRAINT `v_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD CONSTRAINT `sub_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
