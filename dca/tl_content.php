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

$GLOBALS['TL_DCA']['tl_content']['config']['onload_callback'][] = array('ce_groups', 'inject');

$GLOBALS['TL_DCA']['tl_content']['palettes']['ce_group'] = '{type_legend},type;ce_group_name,ce_group_color';

$GLOBALS['TL_DCA']['tl_content']['fields']['ce_group_name'] = array
(
	'label'     => &$GLOBALS['TL_LANG']['tl_content']['ce_group_name'],
	'search'    => true,
	'inputType' => 'text',
	'default'   => 'group',
	'eval'      => array('mandatory'=>true, 'maxlength'=>255),
	'sql'       => "varchar(255) NOT NULL default ''"
);

$GLOBALS['TL_DCA']['tl_content']['fields']['ce_group_color'] = array
(
	'label'     => &$GLOBALS['TL_LANG']['tl_content']['ce_group_color'],
	'search'    => true,
	'inputType' => 'text',
	'default'   => '92C650',
	'eval'      => array('mandatory'=>true, 'maxlength'=>6, 'colorpicker'=>true, 'isHexColor'=>true, 'decodeEntities'=>true, 'tl_class'=>'w50 wizard'),
	'sql'       => "varchar(64) NOT NULL default ''"
);

class ce_groups {

	public function inject()
	{
		if(TL_MODE != 'BE') return;
		static $injected = false;
		if(!$injected)
		{
			$injected = true;
			$GLOBALS['TL_JAVASCRIPT'][] = 'system/modules/ce_groups/assets/CeGroups.js';
			$GLOBALS['TL_CSS'][] = 'system/modules/ce_groups/assets/CeGroups.css';
		}
	}
}