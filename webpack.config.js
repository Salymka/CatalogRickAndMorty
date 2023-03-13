const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    mode: "development",
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "main.js"
    },
    target: "web",
    devServer: {
        port: "9500",
        static: ["./public"],
        open: true,
        hot: true ,
        liveReload: true
    },
    resolve: {
        extensions: ['.js','.jsx','.json']
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use:  'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { modules: { localIdentName: '[local]' }, importLoaders: 1 } },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { modules: { localIdentName: '[local]' }, importLoaders: 1 } },
                    { loader: 'sass-loader',},
                ],
            },
		{
        	    test: /\.(png|jpe?g|gif)$/i,
                use: [
          		{
            		loader: 'file-loader',
         		 },
       		 ],
     		 }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html')
        })
    ]
}