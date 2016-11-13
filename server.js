import path from'path';
import webpack from 'webpack';
import express from 'express';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';

let app = express();
let compiler = webpack(config);

app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}));

app.use(hotMiddleware(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

let port = 3000;
app.listen(port,  (err) => {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening at http://localhost: ${port}/`);
});
