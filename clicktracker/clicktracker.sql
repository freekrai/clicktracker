CREATE TABLE `clicktracker3` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `x` smallint(4) unsigned NOT NULL,
  `y` smallint(4) unsigned NOT NULL,
  `location` varchar(255) NOT NULL,
  `element` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `location_element` (`location`(100),`element`(100))
) AUTO_INCREMENT=1