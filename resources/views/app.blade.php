<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="icon" href="https://i.postimg.cc/J0dz34vm/tarea.png"sizes="32x32" />
        <link rel="icon" href="https://i.postimg.cc/J0dz34vm/tarea.png"sizes="192x192" />
        <link rel="apple-touch-icon" href="https://i.postimg.cc/J0dz34vm/tarea.png" />
        <meta name="msapplication-TileImage"
        content="https://i.postimg.cc/J0dz34vm/tarea.png" />
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
        @routes
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
