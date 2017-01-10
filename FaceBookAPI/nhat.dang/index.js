(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.8&appId=1854509121472419";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

(function () {

    $('#fb-login').on('click', function () {
        FB.login(function (resp) {
            if (resp.status === 'connected') {
                getInfo();
            } else {
                $('#fb-login').show();
                $('#fb-share').hide();
                $('#fb-photos').hide();
            }
        }, {
            scope: 'email,user_photos,public_profile'
        });
    });

    $('#fb-share').on('click', function () {
        FB.ui({
            method: 'share',
            href: window.location.href
        });
    });

    $('#fb-photos').on('click', function () {
        FB.api(
            '/me/photos?fields=images',
            function (resp) {
                var data = resp.data;
                var tmpImg = '';
                for (var i = 0, length = data.length; i < length; i++) {
                    var images = data[i].images;
                    tmpImg += '<img height=\"300\" width=\"300\" src=\"' + images[0].source + '\" />';
                }
                $('#fb-user-photos').append(tmpImg);
            }
        );
    });

    showInfo = function (info) {
        var tmpContent = '';
        for (var item in info) {
            tmpContent += '<strong>' + item + '</strong>: ';

            if (item === 'picture') {
                tmpContent += '<p><img src=\"' + info[item].data.url + '\" /></p>';
            } else {
                tmpContent += '<p>' + info[item] + '</p>';
            }
        }
        $('#fb-info').append(tmpContent);
    }

    getInfo = function () {
        $('#fb-login').hide();
        $('#fb-share').show();
        $('#fb-photos').show();
        FB.api('/me?fields=email,name,picture', function (resp) {
            showInfo(resp);
        });
    }

    window.fbAsyncInit = function () {
        FB.init({
            appId: '390145291021310',
            xfbml: true,
            version: 'v2.8'
        });
        FB.getLoginStatus(function (resp) {
            if (resp.status === 'connected') {
                getInfo();
            } else {
                $('#fb-login').show();
                $('#fb-share').hide();
                $('#fb-photos').hide();
            }
        });
    };
}());