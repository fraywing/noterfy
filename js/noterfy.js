 /* Noterfy :: teeny tiny plugin for field or element notifications
  * Author: Austin
  * 2012 Dyologic LLC
  * MIT license
  */
 
 (function($){
       var defaults = {
         type : "utoh", //utoh, happy, allgood, justsoyouknow
         message : "none",
         icon : "!", //add a character
         time : 200,
         hold : 300
       };
       var methods = {
           create : function(el){
            var width;
            if($(el).css('width')){
             width = $(el).css('width');
            }
              $('body').find('.noterfy-el').remove();
              if($(el).parent().attr('class') != "noterfy-hold"){
                 $(el).wrap("<span class='noterfy-hold' />");
              }
              var parent = $(el).parent();
                 parent.prepend("<div class='noterfy-el "+defaults.type+"'>\
                         <span class='noterfy-icon'>"+defaults.icon+"</span><span class='noterfy-msg'>"+defaults.message+"</span>\
                         </div>");
             if(width !== undefined){
                var w = Number(width.split('px')[0]);
                if(w < 250 && parent.find('.noterfy-msg').html().length > 15){
                parent.find('.noterfy-icon').css({"display" : "block"});
                parent.find('.noterfy-msg').css({"font-size" : "0.8em"});
                }
                 parent.find('.noterfy-el').css({'width' : width}); 
             }
              var tim;
              parent.find('.noterfy-el').fadeIn(defaults.time, function(){
                var sel = $(this);
                     tim = setTimeout(function(){
                              sel.fadeOut(defaults.time, function(){
                                    $(this).remove();
                                   });
                             
                               clearTimeout(tim);
                            },defaults.hold);
                   
                     });
              }   
              
       };
       $.fn.noterfy = function(opts){
       defaults = $.extend(defaults,opts);
       methods.create(this);
       return this;
       }
       
       }(jQuery));