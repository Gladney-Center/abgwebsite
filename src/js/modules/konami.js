var Konami = {

    /*
    *--------------------------------------------------------
    * KONAMI, BITCHES!!! FTW
    *--------------------------------------------------------
    */
    init: function() {
        var user_keys = [],
            konami = '38,38,40,40,37,39,37,39,66,65';
        document.onkeydown = function(e){
            user_keys.push(e.keyCode);
            if (user_keys.toString().indexOf(konami) >= 0) {
                alert('UNLOCKED! You are now invincible. (cheater!)');
                user_keys = [];
            }
        }
    }

};



