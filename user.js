// ==UserScript==
// @name         Onlinekauf Redmine UI Opt
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://redmine.onlinekauf.de/*/wiki*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...

$('head').append('<style rel="style">');

$('#getstatus_url').each(function() {
  var $this = $(this);
  $this.val($this.val().replace(/http:/, ''));
});
$('.journal h4 a[title], .author a[title]').each(function() {
  var $this = $(this);
  var date = $('<small>').text(' (' + $this.attr('title') + ')');
  $this.append(date);
});
$('fieldset.tabular legend').click(function() {
  $(this).closest('fieldset').toggleClass('mini');
});
$('td.cf_6.bool').each(function() { 
  $(this).attr('data-bool', $(this).text()); 
});

window.update_preview_timeout = 0;
window.update_preview = function() {
    $('#update_preview').trigger('click');
}
if ($('body').hasClass('controller-wiki')) {
    $('#wiki_form').find('input[type="submit"][name="commit"]').next('a[onclick]').attr('id', 'update_preview').parent().attr('id','buttons_bottom');
    $('#content_text').on('keyup', function () {
        window.clearTimeout(window.update_preview_timeout);
        window.update_preview_timeout = window.setTimeout(update_preview, 500);
    });
    $('.box.tabular').removeClass('tabular');
    $('#content_text').after($('#preview'));
    var style = '<style id="livepreview">' +
        '.jstEditor{min-height:310px} ' +
        '#content_text{position:absolute;left:0;top:0;bottom:0;width:49%;min-height:300px;} ' +
        '#preview{width:50%;margin-left:50%} ' +
        '#preview legend{display:none} ' +
        '#buttons_bottom{display:block;position:fixed;bottom:0;left:0;right:0;margin:0;padding:5px 10px;background:#f0f0f0;border-top:2px solid #000;} ' +
        '</style>';
    $('head').append(style);
}
