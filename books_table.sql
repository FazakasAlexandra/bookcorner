-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 27, 2021 at 11:27 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookcorner`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
CREATE TABLE IF NOT EXISTS `books` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(80) NOT NULL,
  `author` varchar(80) NOT NULL,
  `description` varchar(500) NOT NULL,
  `pages` int(10) NOT NULL,
  `owner_id` int(10) NOT NULL,
  `publishing_house` varchar(100) NOT NULL,
  `condition_fk` int(10) NOT NULL,
  `proposed_for_book_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_fk` (`owner_id`),
  KEY `condition_fk` (`condition_fk`),
  KEY `condition_fk_2` (`condition_fk`),
  KEY `proposed_for_fk` (`proposed_for_book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `author`, `description`, `pages`, `owner_id`, `publishing_house`, `condition_fk`, `proposed_for_book_id`) VALUES
(1, 'Fata si reversul. Nunta. Mitul lui Sisif. Omul revoltat. Vara', 'Albert Camus', 'Acest volum reuneste scrieri reprezentative ale lui Camus, stand sub semnul filosofiei absurdului. In Fata si reversul tineretea si fericirea, avandu-si expresia in gustul pentru actiune, coexista in mod absurd cu singuratatea, boala si moartea, cu corespondentul lor: nevoia de izolare si o privire contemplativa asupra vietii. In Nunta redescoperim inconfundabilul lirism camusian. Redarea mitului lui Sisif este vibranta. Omul revoltat exprima impotrivirea omului fata de absurdul existentei.', 768, 1, 'RAO', 6, 2),
(2, 'Fratii Karamazov, Vol I', 'F.M Dostoievski', '\"Fratii Karamazov este cel mai puternic roman al lui Dostoievski si aici trebuie cautat geniul sau.  Mi s-a parut ca exista in aceasta opera o relatie mai profunda cu Shakespeare decat a lasat critica sa se inteleaga.\" Harold Bloom\r\n', 432, 2, 'ART', 2, 9),
(3, 'Fratii Karamazov, Vol II', 'F.M Dostoievski', '\"Fratii Karamazov este cel mai puternic roman al lui Dostoievski si aici trebuie cautat geniul sau.  Mi s-a parut ca exista in aceasta opera o relatie mai profunda cu Shakespeare decat a lasat critica sa se inteleaga.\" Harold Bloom', 432, 2, 'ART', 1, NULL),
(4, 'Arhitectonica Moralitatii', 'Emilian Mihailov', 'Cartea lui Emilian Mihailov ofera una dintre rarele lucrari de calitate, rod al unei indelungate reflectii, scrise intr-o limba romana curata, de un autor roman, cu privire la viziunea etica a altui cetatean al Europei moderne, Immanuel Kant. Europa moderna a fost rezultatul intalnirii acestor spirite creative diverse. E datoria noastra sa le cultivam si sa le tinem impreuna. Sunt sigur ca lectura si reflectia libera asupra acestei carti vor reprezenta o contributie', 184, 1, 'Paralela 45', 1, 2),
(5, 'Trei etaje', 'Eshkol Nevo', 'Un cartier elegant din Tel Aviv, un bloc construit pe trei etaje, trei familii locuind pe cele trei paliere diferite ale acestuia, trei personaje conturându-se ca personalități distincte, trei povești și tot atâtea pretexte pentru Eshkol Nevo de a explora cele trei instanțe ale psihicului uman și de a repune pe tapet, într-o manieră inedită, o celebră teorie freudiană.', 296, 1, 'Humanitas', 1, 2),
(6, 'Muntele Vrajit.Vol I', 'Thoman Mann', 'O capodopera a literaturii secolului XX, Muntele vrajit strange intr-o adevarata fresca intelectuala toate fortele ce actioneaza asupra omului modern. Thomas Mann descrie in romanul sau societatea europeana de dinainte de Primul Razboi Mondial, o lume bolnava ce se indreapta catre o catastrofa. Autorul spune despre cartea sa ca potrivit modului in care este construita, compozitia ei face ca placerea lecturii sa fie mai profunda si mai mare atunci cand este citita pentru a doua oara.', 574, 2, 'RAO', 1, 4),
(7, 'Muntele Vrajit.Vol II', 'Thomas Mann', 'O capodopera a literaturii secolului XX, Muntele vrajit strange intr-o adevarata fresca intelectuala toate fortele ce actioneaza asupra omului modern. Thomas Mann descrie in romanul sau societatea europeana de dinainte de Primul Razboi Mondial, o lume bolnava ce se indreapta catre o catastrofa. Autorul spune despre cartea sa ca potrivit modului in care este construita, compozitia ei face ca placerea lecturii sa fie mai profunda si mai mare atunci cand este citita pentru a doua oara.', 605, 2, 'RAO', 1, 5),
(8, 'Filozofia in epoca tragica a grecilor', 'Friedrich Nietzsche', 'Cu Platon începe ceva cu totul nou: sau, cum se poate spune cu egală îndreptăţire, începând cu Platon constatăm că le lipseşte filozofilor un anume lucru esenţial, în comparaţie cu cei integraţi în acea Republică a Geniilor cuprinzându-i pe cei care au trăit între Thales şi Socrate.', 180, 1, 'Humanitas', 1, NULL),
(9, 'Aforisme', 'Friedrich Nietzsche', 'Istoria filozofiei este o furie ascunsa impotriva premiselor vietii, impotriva sentimentului valorilor ei, impotriva apararii ei. Filozofii nu au pregetat niciodata sa postuleze un univers, cu conditia ca acesta sa contrazica universul existent, sa ofere un mijloc de a vorbi de rau acest univers. Pana acum istoria filozofiei a fost marea scoala a calomniei', 156, 1, 'Humanitas', 1, NULL),
(10, 'Genealogia moralei', 'Friedrich Nietzsche', '„Viclenia ratiunii”, implicit a istoriei, o descrisese Hegel, unul dintre cei multi pe care Nietzsche nu‑i agrea.', 224, 1, 'Biblioteca de filosofie', 1, NULL),
(11, 'Amurgul idolilor', 'Friedrich Nietzsche', 'Valorile, ideile dupa care s-au calauzit indeobste filozofii apar in aceasta opera tarzie a lui Nietzsche drept idoli, drept zei care au incremenit intr-o eternitate statuta si a caror evolutie pe scena lumii, prin urmare, s-a incheiat.', 144, 1, 'Humanitas', 1, NULL),
(12, 'Sapte scurte lectii despre fizica', 'Carol Rovelli', 'Aceste lectii au fost scrise pentru cei care stiu putin sau nu stiu nimic despre stiinta moderna. Impreuna, ele ofera o privire de ansamblu concentrata asupra celor mai fascinante aspecte ale marii revolutii savarsite in fizica in secolul XX si ale intrebarilor si misterelor pe care aceasta revolutie le-a adus la lumina. Caci stiinta ne arata nu doar cum sa intelegem mai bine lumea, dar si cat de vasta e dimensiunea a ceea ce inca nu cunoastem.', 100, 3, 'Humanitas', 1, 11),
(13, 'Cunoasterea lumii exterioare', 'Bertrand Russell', 'Prin exerciţiul îndoielii metodice, dacă este autentic şi îndelungat, se induce o anumită smerenie în privinţa cunoaşterii noastre: devenim bucuroşi să cunoaştem indiferent ce - şi în aparenţă oricât de banal - în domeniul filozofiei.', 256, 1, 'Humanitas', 1, NULL),
(14, 'Romeo si Julieta', 'William Shakespeare', 'E gingaşă iubirea? Nu! E cruntă!\r\nCa spinul te înţeapă şi te-înfruntă.', 338, 2, 'Pandoram', 1, 11),
(15, 'Despre dragoste', 'Stendhal', 'Pornind de la o tipologie a iubirii cu patru categorii – iubirea-pasiune, iubirea-capriciu, iubirea fizica si iubirea din vanitate –, Stendhal descrie procesul de „cristalizare” prin care indragostitul ajunge la „iubirea perfecta”. ', 468, 2, 'Polirom', 1, NULL),
(16, 'Povestiri filozofice', 'Voltaire', 'Voltaire este cunoscut pentru mai multe aforisme memorabile, cu toate că ele sunt adesea citate din context. \"Dacă Dumnezeu nu ar exista, ar fi necesar să-L inventeze\", așa cum a fost menționat, este încă aprig dezbătută la semnificația și intențiile sale. \"Totul este pentru cel mai bun din cele mai bune din toate lumile posibile\", din nuvela lui \"Candide\", este de fapt o parodie a optimismului Leibniz și a religiei.', 344, 1, 'MONDERO', 1, NULL),
(17, 'Istoria artei. Arta moderna', 'Elie Faure', 'Totul despre arta moderna.', 300, 3, 'Unknown', 5, 16),
(18, 'Istoria artei. Arta Renasterii', 'Elie Faure', 'Totul despre arta renasterii', 250, 3, 'Unknown', 5, 9),
(19, 'Istoria artei. Arta moderna II', 'Elie Faure', 'Mai multe despre arta moderna !', 270, 3, 'Unknown', 5, 9),
(20, 'Memorile unei gheise', 'Arthur Golden', 'Despre gheise', 450, 3, 'Humanitas', 3, 5),
(21, 'Adam si Eva', 'Liviu Rebreanu', 'O carte super.', 300, 3, 'Unknown', 3, 5),
(22, 'Istoria Grecilor', 'Indro Montanelli', 'Daca nu sti nimic despre greci, asta este cartea perfecta pentru tine !', 250, 3, 'Unknown', 6, 12),
(23, 'Aromanii. Istorie, limba, destin', 'Neagu Djuvara', 'Istoria este greu de inteles. Djuvara vrea sa faca o schimbare pentru binele limbii romane.', 230, 3, 'Humanitas', 1, 12);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `fk` FOREIGN KEY (`condition_fk`) REFERENCES `conditions` (`id`),
  ADD CONSTRAINT `proposed_for_fk` FOREIGN KEY (`proposed_for_book_id`) REFERENCES `books` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `users_fk` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
