 /* Noterfy :: teeny tiny plugin for field or element notifications
  * Author: Austin
  * 2012 Austin Anderson
  * MIT license
  *
  * example:
  *   $('.hold1').hover(function(){
        $(this).noterfy({
         eventType : "tooltip", //tooltip, notify
         type : "happy", //utoh, happy, allgood, justsoyouknow
         message : "Everything is chill and crisply",
         icon : "!", //add a character
         time : 250, //time in ms or "infinite" for.. well.. you know
         hold : 950
       });
  */
 
 (function($){
       var defaults = {
         eventType : "notify",
         type : "utoh", //utoh, happy, allgood, justsoyouknow
         message : "none",
         icon : "!", //add a character
         time : 200,
         hold : 300
       };
       var methods = {
           create : function(){
            var el = this;
            var width;

             width = $(el).css('width');
              
              $('body').find('.noterfy-el, .noterfy-hold').remove();
              if($(el).parent().attr('class') != "noterfy-hold"){
                 $(el).prepend("<span class='noterfy-hold' />");
              }
              var parent = $(el).parent();
                 el.prepend("<div class='noterfy-el "+defaults.type+"'>\
                         <span class='noterfy-icon'>"+defaults.icon+"</span><span class='noterfy-msg'>"+defaults.message+"</span>\
                         </div>");
                
             if(width !== undefined){
                var w = Number(width.split('px')[0]);
                console.log(w);
                if(w < 250 && parent.find('.noterfy-msg').html().length > 15){
                parent.find('.noterfy-icon').css({"display" : "block"});
                parent.find('.noterfy-msg').css({"font-size" : "0.8em"});
                }
                 parent.find('.noterfy-el').css({'width' : width}); 
             }
             if(defaults.eventType == "tooltip"){
                    methods.followMouse(el.find('.noterfy-el'));           
             }
              var tim;
              if(defaults.eventType != "tooltip"){
              parent.find('.noterfy-el').fadeIn(defaults.time, function(){
                var sel = $(this);
                 
                  console.log(defaults);
                     tim = setTimeout(function(){
                              methods.kill(sel,defaults.time);
                             
                               clearTimeout(tim);
                            },defaults.hold);
                     });
               }                  
                     
              },
              kill : function(el,time){
                 el.fadeOut(time, function(){
                                    $(this).remove();
                                   });  
              },
              followMouse : function(el){
                  var self = this;
                  var par = el.parent();
                  var el_w = par.offset().left,
                      el_h = par.offset().top,
                      outerH = el.outerHeight(),
                      outerW = el.outerWidth();
                    
                  par.unbind('mousemove').bind('mousemove', function(e){
                        el.fadeIn(200);
                       el.css({"margin-left" : e.pageX - el_w, "margin-top" : (e.pageY - el_h) - outerH});
                        });
                  par.one('mouseleave', function(e){
                        console.log(e.relatedTarget.className);
                        if(!e.relatedTarget.className.match(/noterfy-el/g)){
                        self.kill(el,200);
                        }
                        });
              }
              
       };
       $.fn.noterfy = function(opts){
       defaults = $.extend(defaults,opts);
       methods.create.call(this);
       return this;
       }
       
       }(jQuery));