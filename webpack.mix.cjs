const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
    .js("resources/js/userChat.js", 'public/js')
    .js("resources/js/adminChat.js", 'public/js')
    .js("resources/js/lineTest.js", 'public/js')
    .setPublicPath('public')

// ソースマップを有効化
mix.webpackConfig({
    devtool: 'source-map',
});

// ビルド時にソースマップを生成する設定
mix.sourceMaps();