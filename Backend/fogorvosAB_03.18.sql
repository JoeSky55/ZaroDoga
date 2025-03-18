-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 18. 12:00
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
  `if_telefon` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `idopont_foglalas`
--

INSERT INTO `idopont_foglalas` (`if_id`, `if_szakrendelesid`, `if_orvosid`, `if_datum`, `if_idopont`, `if_nev`, `if_email`, `if_telefon`) VALUES
(22, 3, 5, '2025-01-31', '18:00', 'Külsős Lajos', 'sunshinedentalfogaszat@gmail.com', '302179874'),
(30, 4, 2, '2025-02-09', '18:30', 'Ecsedi Hanna', 'ecsedi.hanna.1035@dszcbaross.edu.hu', '307896785'),
(43, 6, 6, '2025-03-27', '17:30', 'Károly János', 'janos2000@gmail.com', '2147483647'),
(44, 6, 6, '2025-03-27', '18:00', 'Lakatos István', 'istvanka345@gmail.com', '2147483647'),
(45, 6, 6, '2025-03-27', '19:00', 'sss', 'dfd', '06203456789'),
(46, 4, 2, '2025-03-26', '17:30', 'sdsa', 'dsad', '213234');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orvosok`
--

CREATE TABLE `orvosok` (
  `orvos_id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `telefon` varchar(15) NOT NULL,
  `leiras` text NOT NULL,
  `kep` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `orvosok`
--

INSERT INTO `orvosok` (`orvos_id`, `nev`, `telefon`, `leiras`, `kep`) VALUES
(1, 'Dr. Lakatos Botond', '303913399', '2006-ban végeztem a Semmelweis Egyetemen  Fogorvostudományi Karán, és azóta is szenvedélyesen törekszem a legmodernebb fogászati megoldások alkalmazására. Kiemelt szakterületeim a fogkőeltávolítás és szájhigiéniai kezelés, és a rendszeres fogászati szűrővizsgálat. Fontos számomra, hogy pácienseim nyugodt, fájdalommentes ellátásban részesüljenek, és bizalommal forduljanak hozzám. Célom, hogy mindenkit a számára legjobb és legbiztonságosabb kezeléssel segítsek, miközben egy kellemes rendelői élményt biztosítok.\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n', '01.jpg'),
(2, 'Dr. Szilágyi István Marcell', '202345678', 'A fogorvosi diplomámat a Debreceni Egyetem Fogorvostudományi Karán szereztem meg Summa Cum Laude minősítéssel. Az egyetemen való végzés óta több területen is teljesítem fogorvosi feladataimat: körzeti fogászati ellátás, fogorvosi ügyeleti ellátás, szájsebészet szakrendelés. A konzerváló fogászat és a gyökérkezelés mellett érdeklődöm az implantológia iránt is. Számomra fontos a páciensek elégedettsége, melyet türelemmel, precizitással és maximalizmussal igyekszem biztosítani.', '02.jpeg'),
(3, 'Dr. Csurgóbb Martin', '703456789', 'A Debreceni Egyetemen szereztem fogorvosi diplomát 2023-ban, majd közvetlen ezután konzerváló fogászként helyezkedtem el. Érdeklődésem ugyanakkor nem csupán e terület felé irányul, hanem hasonló elhivatottsággal fordulok a fogorvoslás minden szakiránya felé. Hivatásomat igyekszem mindig derűsen, jókedvvel, de a helyzet komolyságának és képességeimnek megfelelően a legnagyobb precizitással és alázattal művelni. Köszönöm pácienseimnek, hogy kitüntetnek bizalmukkal!', '03.jpeg'),
(4, 'Dr. Deák Szabolcs', '304567890', '2019-ben végeztem a Debreceni Egyetem Fogorvostudományi Karán. Rezidens éveimet a Hajdú Bihar vármegyei szájsebészeten töltöttem, majd 2022-ben dentoalveolaris sebészetből szakvizsgát szereztem a Szegedi Tudományegyetem Fogorvostudományi karán. A rezidensképzés mellett lehetőségem volt részt venni körzeti ellátásban és magán ellátásban is egyaránt az általános fogászat területén mely elősegítette a szakmai tapasztalataim bővülését.', '04.jpg'),
(5, 'Dr. Király Szabolcs', '205678901', 'A fogorvostudományi diplomámat a Debreceni Egyetemen szereztem meg, majd ezt követően dento-alveolaris rezidens képzésen vettem részt. Kiemelten fontosnak tartom a rendszeres fogászati szűrővizsgálatokat, hiszen ezekkel megelőzhetők a súlyosabb fogászati problémák, és időben felismerhetők az esetleges elváltozások. Számomra a precizitás mellett a páciensek kényelme és elégedettsége a legfontosabb.', '05.jpg'),
(6, 'Dr. Balogh Katalin', '706789012', 'Fogorvosi diplomámat a Debreceni Egyetem Fogorvostudományi Karán szereztem 2014-ben, majd ezt követően az egyetemi klinikai ellátásban és oktatásban dolgoztam. Szakmai érdeklődésem középpontjában a fogak esztétikai és preventív kezelése áll, különös tekintettel a fogfehérítésre, fogkőeltávolításra és szájhigiéniai kezelésekre. Célom, hogy pácienseim számára egészséges és ragyogó mosolyt biztosítsak a legkorszerűbb eljárások alkalmazásával.', '06.jpg');

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
(11, 'Szájsebészet');

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
  MODIFY `if_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

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
