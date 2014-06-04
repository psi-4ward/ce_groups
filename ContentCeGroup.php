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

class ContentCeGroup extends \ContentElement {

	public function generate()
	{
		if(TL_MODE != 'BE') {
            if($GLOBALS['TL_CONFIG']['ce_groups_renderFE']) {
                $groupname = standardize($this->ce_group_name);
                if(!$groupname) $groupname = 'id'.$this->id;
                return '<div class="ge-group ge-group-'.$groupname.'">';
            } else {
                return '';
            }
        }

		return '<div class="ce_group_header" data-color="#'.$this->ce_group_color.'">'
					.'<p>'.$this->ce_group_name.'</p>'
					.'<img class="ce_group_toggler" alt="" title="" width="20" height="24" src="system/themes/default/images/expand.gif" style="cursor: pointer;">'
				.'</div>';

	}


	/**
	 * Compile the content element
	 */
	protected function compile()
	{
	}
}
 