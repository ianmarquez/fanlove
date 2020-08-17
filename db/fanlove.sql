SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `user` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user` (`id`, `firstName`, `lastName`) VALUES
(1, 'Gordon', 'Ryan'),
(2, 'Craig', 'Jones'),
(3, 'Andre', 'Galvao'),
(4, 'Vinny', 'Magalhaes');

ALTER TABLE `sample`
  ADD PRIMARY KEY (`id`);