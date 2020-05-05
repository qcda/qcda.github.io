'use strict';
window.onload=function(){

    window.SwaggerTranslator = {
        _words: [],

        translate: function () {
            var $this = this;
            $('[data-sw-translate]').each(function () {
                $(this).html($this._tryTranslate($(this).attr('data-id')));
            });
        },

        _tryTranslate: function (word) {
            return this._words[$.trim(word)];
        },

        learn: function (wordsMap) {
            this._words = wordsMap;
        }
    };


    function changelanguage(lange){
        if(lange=="ch_list"){
            window.SwaggerTranslator.learn(ch_list);
        }else if(lange=="en_list"){
            window.SwaggerTranslator.learn(en_list);
        }else if(lange=="kr_list"){
            window.SwaggerTranslator.learn(kr_list);
        }else if(lange=="jp_list"){
            window.SwaggerTranslator.learn(jp_list);
        }else if(lange=="th_list"){
            window.SwaggerTranslator.learn(th_list);
        }else if(lange=="sg_list"){
            window.SwaggerTranslator.learn(sg_list);
        }
        window.SwaggerTranslator.translate();
    }



    $('.search-result-head').click(function(){
        var _language=$(this).attr('data-type');

        setCookie("language_for_select",_language,7);
        var _iconPath='./images/'+_language+'.png';

        var language=_language+'_list';

        $('.header-icon-menu').find('img').attr('src',_iconPath);
        //console.log(window.SwaggerTranslator.learn(ch_list));
        //window.SwaggerTranslator.learn(language);

        changelanguage(language)


    });


    function initlang(){
        window.SwaggerTranslator.learn(ch_list);
        //$(".menu ul li span").css("font-size","12px");
        var _iconPath='./images/'+'ch.png';
        $('.header-icon-menu').find('img').attr('src',_iconPath);
        window.SwaggerTranslator.translate();
    }


    initlang();


    var languageforselect=getCookie('language_for_select');
    if(languageforselect!=null&&languageforselect!=''){

        var _iconPath='./images/'+languageforselect+'.png';
        var cookielanguage=languageforselect+'_list';
        $('.header-icon-menu').find('img').attr('src',_iconPath);
        changelanguage(cookielanguage);
    }
};
