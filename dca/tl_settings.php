<?php

/**
 * @copyright 4ward.media 2014 <http://www.4wardmedia.de>
 * @author Christoph Wiechert <wio@psitrax.de>
 */
 
$GLOBALS['TL_DCA']['tl_settings']['fields']['ce_groups_renderFE'] = array
(
    'label'     => &$GLOBALS['TL_LANG']['tl_settings']['ce_groups_renderFE'],
    'inputType' => 'checkbox',
);

$GLOBALS['TL_DCA']['tl_settings']['palettes']['default'] .= ';{ce_groups_legend},ce_groups_renderFE';