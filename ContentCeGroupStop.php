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

class ContentCeGroupStop extends \ContentElement {

	public function generate()
	{
        if(TL_MODE != 'BE') {
            if($GLOBALS['TL_CONFIG']['ce_groups_renderFE']) {
                return '</div>';
            } else {
                return '';
            }
        }

		return '<div class="ce_group_stop">'
					.'<p>'.$GLOBALS['TL_LANG']['CTE']['ce_group_stop']['0'].'</p>'
				.'</div>';

	}


	/**
	 * Compile the content element
	 */
	protected function compile()
	{
	}
}
 