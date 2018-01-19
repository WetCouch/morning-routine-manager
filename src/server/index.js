import Koa from 'koa'; // koa@2
import KoaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import koaSession from 'koa-session';
import { graphqlKoa } from 'apollo-server-koa';
import { Nuxt, Builder } from 'nuxt';

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.port || 3000;

// koaBody is needed just for POST.
app.use(koaBody());

//session setup
app.keys = ['!lyN@mIsAwes0m3#'];
app.use(koaSession({
  key: 'koa:session',
  maxAge: 86400000,
  overwrite: true,
}, app));

// router.post('/graphql', graphqlKoa({ schema: myGraphQLSchema }));
// router.get('/graphql', graphqlKoa({ schema: myGraphQLSchema }));


router.all('/graphql', graphqlKoa(ctx => {
  return {
    schema,
    pretty: true,
    context: ctx,
  }
}));


const config = require('../../config/nuxt.config');
config.dev = !(process.env.NODE_ENV === 'production');
config.srcDir = 'src/';

const nuxt = new Nuxt(config);

if (config.dev)
  new Builder(nuxt)
    .build()
    .catch(e => {
      console.error(e);
      process.exit(1);
    });


app.use(ctx => {
  ctx.status = 200; // koa defaults to 404 when it sees that status is unset

  return new Promise((resolve, reject) => {
    ctx.res.on('close', resolve);
    ctx.res.on('finish', resolve);
    ctx.req.session = ctx.session; // for nuxtServerInit
    ctx.req.state = ctx.state; // for nuxtServerInit

    nuxt.render(ctx.req, ctx.res, promise => {
      // nuxt.render passes a rejected promise into callback on error.
      promise.then(resolve).catch(reject)
    })
  })
});


app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, (err) => {
  if (err)
    console.error(err);
  else
    console.log(`> Server is listening on 0.0.0.0:${PORT}`);
});
