<?php

/**
 * ce_groups
 * Contao extension to group Contentelements in the backend view
 *
 * @copyright 4ward.media 2014 <http://www.4wardmedia.de>
 * @author Christoph Wiechert <wio@psitrax.de>
 * @package ce_groups
 * @licence LGPL
 */

ClassLoader::addClasses(array
(
	'ContentCeGroup'        => 'system/modules/ce_groups/ContentCeGroup.php',
	'ContentCeGroupStop'    => 'system/modules/ce_groups/ContentCeGroupStop.php',
));
