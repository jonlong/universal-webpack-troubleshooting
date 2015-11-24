<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <title>{{ title }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="apple-touch-icon" href="/pages/ico/60.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/pages/ico/76.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/pages/ico/120.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/pages/ico/152.png">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="robots" content="noindex">
    <meta content="" name="description" />
    <meta content="" name="author" />

    <!-- BEGIN Vendor CSS-->
    <link href="/plugins/boostrapv3/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="/plugins/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="/plugins/jquery-scrollbar/jquery.scrollbar.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="/plugins/bootstrap-select2/select2.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="/plugins/switchery/css/switchery.min.css" rel="stylesheet" type="text/css" media="screen" />
    <!-- BEGIN Pages CSS-->
    <link href="/pages/css/pages-icons.css" rel="stylesheet" type="text/css">
    <link class="main-stylesheet" href="/css/style.css" rel="stylesheet" type="text/css" />
    <!--[if lte IE 9]>
        <link href="/pages/css/ie9.css" rel="stylesheet" type="text/css" />
    <![endif]-->

    {% block page-styles %}{% endblock %}

    <script type="text/javascript">
    window.onload = function()
    {
      // fix for windows 8
      if (navigator.appVersion.indexOf("Windows NT 6.2") != -1)
        document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="/pages/css/windows.chrome.fix.css" />'
    }
    </script>
    {% block head-scripts %}{% endblock %}
</head>

<body class="{% block body-class %}{% endblock %}">

    <div id="app">{% block content %}{% endblock %}</div>

    <!-- BEGIN VENDOR JS -->
    <script src="/plugins/jquery/jquery-1.11.1.min.js" type="text/javascript"></script>
    <script src="/plugins/modernizr.custom.js" type="text/javascript"></script>
    <script src="/plugins/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>
    <script src="/plugins/boostrapv3/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="/plugins/jquery/jquery-easy.js" type="text/javascript"></script>
    <script src="/plugins/jquery-unveil/jquery.unveil.min.js" type="text/javascript"></script>
    <script src="/plugins/jquery-bez/jquery.bez.min.js"></script>
    <script src="/plugins/jquery-ios-list/jquery.ioslist.min.js" type="text/javascript"></script>
    <script src="/plugins/imagesloaded/imagesloaded.pkgd.min.js"></script>
    <script src="/plugins/jquery-actual/jquery.actual.min.js"></script>
    <script src="/plugins/jquery-scrollbar/jquery.scrollbar.min.js"></script>
    <!-- END VENDOR JS -->

    <!-- BEGIN CORE TEMPLATE JS -->
    <script src="/pages/js/pages.js" type="text/javascript"></script>
    <!-- END CORE TEMPLATE JS -->

    {{ scriptTag | safe }}

    {% if env === 'development' %}
        <script src="//localhost:3000/js/vendors.js"></script>
        <script src="//localhost:3000/js/app.js"></script>
    {% else %}
        <script src="/vendors.js"></script>
        <script src="/app.js"></script>
    {% endif %}

    {% block page-scripts %}{% endblock %}

    <script>
    (function(b, o, i, l, e, r) {
        b.GoogleAnalyticsObject = l;
        b[l] || (b[l] =
            function() {
                (b[l].q = b[l].q || []).push(arguments)
            });
        b[l].l = +new Date;
        e = o.createElement(i);
        r = o.getElementsByTagName(i)[0];
        e.src = '//www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e, r)
    }(window, document, 'script', 'ga'));
    ga('create', 'UA-XXXXX-X');
    ga('send', 'pageview');
    </script>
</body>

</html>
