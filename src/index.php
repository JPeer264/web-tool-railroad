<!DOCTYPE html>
<html>
    <head>
        <title>WeToVi</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="/assets/css/global.css">
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600|Raleway:800,500' rel='stylesheet' type='text/css'>
        <base href="/">
    </head>
    <body>
        <div class="railroad-body">
            <!-- if the user is loggedin -->
            <div data-ui-view></div>
            <!-- if the user is not loggedin -->
            <div data-ui-view="header"></div>
            <div data-ui-view="main"></div>
            <div data-ui-view="footer"></div>
        </div>

        <script type="text/javascript" src="/assets/js/vendor.js"></script>
        <script type="text/javascript" src="/assets/js/app.js"></script>
        <script type="text/javascript" src="/assets/js/main.js"></script>
        <script>

            jQuery(document).ready(function($) {
                $(document).foundation();
            });

        </script>
    </body>
</html>
