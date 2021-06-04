const path = require('path');
const theme = require('./theme.json')
const {
    override,
    fixBabelImports,
    addWebpackAlias,
    overrideDevServer,
} = require('customize-cra'); // show https://github.com/arackaf/customize-cra
const CompressionWebpackPlugin = require('compression-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

const alter_config= ()=>(config, env)=>{
    const oneOf_loc= config.module.rules.findIndex(n=>n.oneOf)
    config.module.rules[oneOf_loc].oneOf=[    //例如要增加处理less的配置
        {
            test: /\.less$/,
            use: [
                require.resolve('style-loader'),
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        importLoaders: 1,
                    },
                },
                {
                    loader: require.resolve('less-loader'),
                    options: {
                        // theme vars, also can use theme.js instead of this.
                        modifyVars: theme,
                    },
                },
            ],
        },
        ...config.module.rules[oneOf_loc].oneOf
    ]

    return config;
}

const addCustomize = () => config => {
    if (process.env.NODE_ENV === 'production') {
        // 关闭sourceMap
        config.devtool = false;
        // 配置打包后的文件位置
        // config.output.path = resolve('dist');
        // config.output.publicPath = './';
        // 添加js打包gzip配置
        config.plugins.push(
            new CompressionWebpackPlugin({
                test: /\.js$|\.css$/,
                threshold: 1024,
            }),
        )
    }
    return config;
}

const devServerConfig = () => config => {
    return {
        ...config,
        proxy: {
            '/api': {
                target: 'xxx',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api',
                },
            }
        }
    }
}

module.exports = {

    webpack: override(
        alter_config(),   //将自定义配置组合进来
        // 配置antd 的按需引入
        fixBabelImports('import',{
            libraryName: 'antd',
            libraryDirectory:'es',
            style: true
        }),
        // 配置路径访问快捷键 @/xxx
        addWebpackAlias({
            "@": path.resolve(__dirname, "./src"),
            "@api": path.resolve(__dirname, "./src/api"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@views": path.resolve(__dirname, "./src/views"),
        }),
        // postCss 自动将px转为rem 需要配合 lib-flexible 使用
        // addPostcssPlugins([
        //     // require('postcss-pxtorem')({ rootValue: 75, propList: ['*'], minPixelValue: 2, selectorBlackList: ['am-'] })
        // ]),
        // 压缩js等
        addCustomize(),

    ),
    // 本地启动配置，可以设置代理
    devServer: overrideDevServer(
        devServerConfig()
    )
};
