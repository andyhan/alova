import bodyParser from 'body-parser';
import express from 'express';
import hbs from 'hbs';
import path from 'path';
import { clearLogs, flushLogs } from './logs';
import pscRouter from './routes/psc';
import rateLimitRouter from './routes/rateLimit';
import retryRouter from './routes/retry';

const app = express();
const port = 3000;
const sourceBranch = 'next';
const pkgName = 'server';

// disable Keep-Alive to random hit different process
app.use((_, res, next) => {
  res.set('Connection', 'close');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);
hbs.registerPartials(__dirname + '/views/partials');

// set global variable
app.use((_, res, next) => {
  res.locals.sourceUrl = `https://github.com/alovajs/alova/blob/${sourceBranch ? `${sourceBranch}/` : ''}examples/${pkgName}/routes`;
  res.locals.docUrl = `https://alova.js.org${sourceBranch ? `/${sourceBranch}` : ''}`;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(retryRouter, pscRouter, rateLimitRouter);

app.get('/', (_, res) => {
  res.render('index', { title: 'Home' });
});
app.get('/retry', (req, res) => {
  res.render('retry', {
    title: 'retry',
    docPath: '/tutorial/server/strategy/retry'
  });
});
app.get('/rateLimit', (req, res) => {
  res.render('rateLimit', {
    title: 'rate limit',
    filePath: 'rateLimit',
    docPath: '/tutorial/server/strategy/rate-limit'
  });
});
app.get('/psc', (req, res) => {
  res.render('psc', {
    title: 'psc',
    docPath: '/resource/storage-adapter/psc'
  });
});

app.delete('/logs', (_, res) => {
  clearLogs();
  return res.json({});
});
app.get('/logs', (_, res) => {
  return res.json(flushLogs());
});

app.listen(port, () => {
  console.log(`[pid:${process.pid}] Server listening on port http://127.0.0.1:${port}`);
});