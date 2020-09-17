// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

ctx.addEventListener('message', (event) => {
  console.log('asdasdasdass');
  ctx.postMessage('Hello MOTO');
});

export default ctx;
