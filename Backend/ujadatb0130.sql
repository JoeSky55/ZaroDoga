-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 30. 12:25
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
-- Adatbázis: `fogorvos_vizsga2`
--
CREATE DATABASE IF NOT EXISTS `fogorvos_vizsga2` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `fogorvos_vizsga2`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `idopont_foglalas`
--

CREATE TABLE `idopont_foglalas` (
  `if_id` int(11) NOT NULL,
  `if_szakrendelesid` int(11) NOT NULL,
  `if_orvosid` int(11) NOT NULL,
  `if_datum` date NOT NULL,
  `if_idopont` varchar(255) NOT NULL,
  `if_nev` varchar(255) NOT NULL,
  `if_email` varchar(255) NOT NULL,
  `if_telefon` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `idopont_foglalas`
--

INSERT INTO `idopont_foglalas` (`if_id`, `if_szakrendelesid`, `if_orvosid`, `if_datum`, `if_idopont`, `if_nev`, `if_email`, `if_telefon`) VALUES
(1, 1, 1, '2024-11-25', '17:30', 'Gál József', 'galjozsika01@gmail.com', 301602801),
(16, 6, 6, '2025-01-31', '19:00', 'Teszt József', 'jozsefke23@gmail.com', 706529845),
(17, 3, 5, '2025-01-30', '18:00', 'Lakatos István', 'istvanka345@gmail.com', 304567892),
(20, 3, 1, '2025-01-30', '17:30', 'Gál József', 'gal.jozsef.1037@dszcbaross.edu.hu', 301602801),
(21, 4, 2, '2025-01-31', '18:00', 'Kocsis Éva', 'kortvelyesine.eva@gmail.com', 302100623);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orvosok`
--

CREATE TABLE `orvosok` (
  `orvos_id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `telefon` varchar(15) NOT NULL,
  `kep` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `orvosok`
--

INSERT INTO `orvosok` (`orvos_id`, `nev`, `telefon`, `kep`) VALUES
(1, 'Dr. Lakatos Botond', '303913399', '01.jpg'),
(2, 'Dr. Szabó Anna', '202345678', '02.jpeg'),
(3, 'Csurgóbb Martin', '703456789', '03.jpeg'),
(4, 'Dr. Tóth Éva', '304567890', '04.jpg'),
(5, 'Dr. Király Szabolcs', '205678901', '05.jpg'),
(6, 'Dr. Balogh Katalin', '706789012', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orvos_szakterulet`
--

CREATE TABLE `orvos_szakterulet` (
  `altalanos_id` int(11) NOT NULL,
  `orvos_id` int(11) NOT NULL,
  `szakterulet_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `orvos_szakterulet`
--

INSERT INTO `orvos_szakterulet` (`altalanos_id`, `orvos_id`, `szakterulet_id`) VALUES
(1, 1, 1),
(2, 1, 3),
(3, 2, 2),
(4, 2, 4),
(5, 3, 5),
(6, 4, 11),
(8, 5, 3),
(20, 6, 6),
(21, 6, 1);

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
(1, 'Fogkőeltávolítás és szájhigiéniai kezelés'),
(2, 'Fogtömés és kisebb konzerváló fogászati kezelések'),
(3, 'Rendszeres fogászati szűrővizsgálat'),
(4, 'Gyökérkezelés (endodoncia)'),
(5, 'Konzerváló fogászat és endodoncia'),
(6, 'Fogfehérítés'),
(11, 'Időpontfoglalás konzultációra');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `idopont_foglalas`
--
ALTER TABLE `idopont_foglalas`
  ADD PRIMARY KEY (`if_id`),
  ADD KEY `if_szakrendelesid` (`if_szakrendelesid`),
  ADD KEY `if_orvosid` (`if_orvosid`);

--
-- A tábla indexei `orvosok`
--
ALTER TABLE `orvosok`
  ADD PRIMARY KEY (`orvos_id`);

--
-- A tábla indexei `orvos_szakterulet`
--
ALTER TABLE `orvos_szakterulet`
  ADD PRIMARY KEY (`altalanos_id`),
  ADD KEY `orvos_id` (`orvos_id`),
  ADD KEY `szakterulet_id` (`szakterulet_id`);

--
-- A tábla indexei `szakteruletek`
--
ALTER TABLE `szakteruletek`
  ADD PRIMARY KEY (`szak_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `idopont_foglalas`
--
ALTER TABLE `idopont_foglalas`
  MODIFY `if_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT a táblához `orvosok`
--
ALTER TABLE `orvosok`
  MODIFY `orvos_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `orvos_szakterulet`
--
ALTER TABLE `orvos_szakterulet`
  MODIFY `altalanos_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT a táblához `szakteruletek`
--
ALTER TABLE `szakteruletek`
  MODIFY `szak_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `idopont_foglalas`
--
ALTER TABLE `idopont_foglalas`
  ADD CONSTRAINT `idopont_foglalas_ibfk_1` FOREIGN KEY (`if_szakrendelesid`) REFERENCES `szakteruletek` (`szak_id`),
  ADD CONSTRAINT `idopont_foglalas_ibfk_2` FOREIGN KEY (`if_orvosid`) REFERENCES `orvosok` (`orvos_id`);

--
-- Megkötések a táblához `orvos_szakterulet`
--
ALTER TABLE `orvos_szakterulet`
  ADD CONSTRAINT `orvos_szakterulet_ibfk_1` FOREIGN KEY (`orvos_id`) REFERENCES `orvosok` (`orvos_id`),
  ADD CONSTRAINT `orvos_szakterulet_ibfk_2` FOREIGN KEY (`szakterulet_id`) REFERENCES `szakteruletek` (`szak_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
