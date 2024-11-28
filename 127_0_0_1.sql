-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 28. 09:46
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `fogorvos_vizsga`
--
CREATE DATABASE IF NOT EXISTS `fogorvos_vizsga` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `fogorvos_vizsga`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orvosok`
--

CREATE TABLE `orvosok` (
  `orvos_id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `telefon` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `orvosok`
--

INSERT INTO `orvosok` (`orvos_id`, `nev`, `telefon`) VALUES
(1, 'Dr. Kovács Péter', '301234567'),
(2, 'Dr. Szabó Anna', '202345678'),
(3, 'Dr. Nagy Tamás', '703456789'),
(4, 'Dr. Tóth Éva', '304567890'),
(5, 'Dr. Horváth Gábor', '205678901');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orvos_szakterulet`
--

CREATE TABLE `orvos_szakterulet` (
  `orvos_id` int(11) NOT NULL,
  `szakterulet_id` int(11) NOT NULL,
  `altalanos_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `orvos_szakterulet`
--

INSERT INTO `orvos_szakterulet` (`orvos_id`, `szakterulet_id`, `altalanos_id`) VALUES
(1, 1, 0),
(1, 2, 0),
(2, 3, 0),
(2, 4, 0),
(3, 5, 0),
(3, 6, 0),
(4, 1, 0),
(4, 3, 0),
(5, 2, 0),
(5, 6, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szakteruletek`
--

CREATE TABLE `szakteruletek` (
  `szak_id` int(11) NOT NULL,
  `szak_nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `szakteruletek`
--

INSERT INTO `szakteruletek` (`szak_id`, `szak_nev`) VALUES
(1, 'Implantológia'),
(2, 'Szájsebészet'),
(3, 'Fogszabályozás'),
(4, 'Esztétikai fogászat'),
(5, 'Gyermekfogászat'),
(6, 'Általános fogászat');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `orvosok`
--
ALTER TABLE `orvosok`
  ADD PRIMARY KEY (`orvos_id`);

--
-- A tábla indexei `orvos_szakterulet`
--
ALTER TABLE `orvos_szakterulet`
  ADD PRIMARY KEY (`orvos_id`,`szakterulet_id`),
  ADD KEY `fk_szakterulet` (`szakterulet_id`);

--
-- A tábla indexei `szakteruletek`
--
ALTER TABLE `szakteruletek`
  ADD PRIMARY KEY (`szak_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `orvosok`
--
ALTER TABLE `orvosok`
  MODIFY `orvos_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `szakteruletek`
--
ALTER TABLE `szakteruletek`
  MODIFY `szak_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `orvos_szakterulet`
--
ALTER TABLE `orvos_szakterulet`
  ADD CONSTRAINT `fk_orvos` FOREIGN KEY (`orvos_id`) REFERENCES `orvosok` (`orvos_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_szakterulet` FOREIGN KEY (`szakterulet_id`) REFERENCES `szakteruletek` (`szak_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
