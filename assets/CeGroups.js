/**
 * ce_groups
 * Contao extension to group Contentelements in the backend view
 *
 * @copyright 4ward.media 2014 <http://www.4wardmedia.de>
 * @author Christoph Wiechert <wio@psitrax.de>
 * @package ce_groups
 * @licence LGPL
 */

Class.refactor(Sortables, {
  addLists: function() {
    this.previous(arguments);
    this.lists.forEach(function(list) {
      list.store('Sortables', this);
    }.bind(this));
    return this;
  }
});

// touch fix
if(!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)) {
  Browser.Features.Touch = false;
}
window.addEvent('domready',function(){
  if(!Browser.Features.Touch) $(document.body).removeClass('touch');
});

(function() {
  var groupHeaders = [];

  function findGroupElems(groupHeader) {
    var nextElems = groupHeader.getAllNext('li');
    var ret = [];
    for(var i = 0; i < nextElems.length; i++) {
      if(nextElems[i].hasClass('ce_group_header')) break;
      ret.push(nextElems[i]);
      if(nextElems[i].hasClass('ce_group_stop')) break;
    }
    return ret;
  }

  function setClass() {
    $$('#main ul li.ce_group_inGroup').removeClass('ce_group_inGroup');
    groupHeaders.forEach(function(groupHeader) {
      findGroupElems(groupHeader).forEach(function(el) {
        el.addClass('ce_group_inGroup')
          .setStyle('border-color', groupHeader.getStyle('border-color'));
      })
    });
  }

  function toggle(groupHeader) {
    groupHeader.toggleClass('ce_group_collapsed');
    var collapsed = (groupHeader).hasClass('ce_group_collapsed') ? true : false;
    var operations = groupHeader.getElements('a.copy, a.cut, a[href*=act=create], img.drag-handle');
    findGroupElems(groupHeader).forEach(function(el) {
      if(collapsed) {
        el.addClass('ce_group_collapsed');
        operations.fade('out');
      } else {
        el.removeClass('ce_group_collapsed');
        operations.fade('in');
      }
    });
    save();
  }

  function compileStorageKey() {
    var myURI = new URI(document.location.href);
    var str = '';
    str += 'do=' + myURI.getData('do');
    str += '&table=' + myURI.getData('table');
    str += '&id=' + myURI.getData('id');
    return str;
  }

  function save() {
    try {
      'localStorage' in window && window['localStorage'] !== null;
    }
    catch(e) {
      return;
    }

    var collapsed = [];
    groupHeaders.forEach(function(groupHeader) {
      if(groupHeader.hasClass('ce_group_collapsed')) {
        collapsed.push(groupHeader.get('id'));
      }
    });
    localStorage.setItem(compileStorageKey(), collapsed);
  }

  function restore() {
    try {
      'localStorage' in window && window['localStorage'] !== null;
    }
    catch(e) {
      return;
    }
    var collapsed = localStorage.getItem(compileStorageKey());
    if(!collapsed) return;
    collapsed = collapsed.split(',');
    if(collapsed.length) {
      collapsed.forEach(function(id) {
        if(!id) return;
        var el = $(id);
        if(!el) return;
        toggle(el);
      });
    }

  }

  function sortAfterCollapsed(elem) {
    var parent;
    if(elem && (parent = elem.getPrevious('li')) && parent.hasClass('ce_group_collapsed')) {
      var lastElem = findGroupElems(parent).getLast();
      if(!lastElem) return;
      console.log('injectAfter', elem, lastElem);
      elem.inject(lastElem, 'after');
    }
  }


  function init() {
    groupHeaders = $$('#main ul li .ce_group_header').map(function(el) {
      var parent = el.getParent('li');
      parent.addClass('ce_group_header').setStyle('border-color', el.get('data-color'));
      return parent;
    });

    if(groupHeaders.length) {
      // remove contao elements
      groupHeaders.forEach(function(groupHeader) {
        groupHeader.getElement('.ce_group_header').inject(groupHeader.getElement('div'), 'bottom');
        groupHeader.getElements('a.toggle, img.limit_toggler, .cte_type, .limit_height').destroy();
        groupHeader.addEvent('click', function(ev) {
          if(ev.target.get('tag') == 'a' || ev.target.hasClass('drag-handle')) return;
          toggle(groupHeader);
        });
      });

      // suppport stop elements
      var groupStops = $$('#main ul li .ce_group_stop').map(function(el) { return el.getParent('li'); });
      if(groupStops.length) {
        groupStops.forEach(function(groupStop) {
          groupStop.addClass('ce_group_stop');
          groupStop.getElement('.ce_group_stop').inject(groupStop.getElement('div'), 'bottom');
          groupStop.getElements('a.toggle, img.limit_toggler, .cte_type, .limit_height').destroy();
        });
      }
    }

    // support contao wrappers
    $$('#main ul li .wrapper_start').map(function(el) {
      var li = el.getParent('li');
      li.addClass('ce_group_header');
      Elements.from('<img class="ce_group_toggler" alt="" title="" width="20" height="24" src="system/themes/default/images/expand.gif" style="cursor: pointer;">').inject(el, 'bottom');
      li.addEvent('click', function(ev) {
        if(ev.target.get('tag') == 'a' || ev.target.hasClass('drag-handle')) return;
        toggle(li);
      });
      groupHeaders.push(li);
    });
    $$('#main ul li .wrapper_stop').map(function(el) {
      el.getParent('li').addClass('ce_group_stop');
    });

    if(groupHeaders.length) {
      // set the CSS classes
      setClass();

      // register sortables callback
      var sortable = groupHeaders[0].getParent('ul').retrieve('Sortables');
      if(sortable) {
        sortable.addEvent('sort', setClass);
        sortable.addEvent('sort', sortAfterCollapsed);
      }

      restore();
    }
  }

  window.addEvent('domready', init);
})();

