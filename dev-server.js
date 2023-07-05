import webpackConfig from "./webpack.config.js";
import WebpackDevServer from 'webpack-dev-server';
import Webpack from 'webpack';

const compiler = Webpack(webpackConfig);

const devServerOptions = { ...webpackConfig.devServer, open: true }
const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log('Staring server...');
  await server.start();
}

runServer();