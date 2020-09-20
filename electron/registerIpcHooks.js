// const ipc = require('electron').ipcMain;

// ipc.on('gitPull', async (event, args) => {
//   const git = require('isomorphic-git');
//   const fs = require('fs');
//   const http = require('isomorphic-git/http/node');

//   console.log('pullling!!!');
//   try {
//     await git.pull({
//       fs,
//       http: http,
//       dir: args.gitDir,
//       singleBranch: true,
//       fastForwardOnly: true,
//       author: {
//         email: 'asdas',
//         name: 'asdasd',
//       },
//     });
//   } catch (error) {
//     console.log('FAILED TO PULL CHANGES!!!!!!!!!!!!');
//     event.sender.send('gitPullCompleted', {
//       success: false,
//       message: error.message,
//     });
//   }
//   console.log('done pulling');

//   event.sender.send('gitPullCompleted', {
//     success: true,
//     message: ':)',
//   });
// });

// ipc.on('gitPush', async (event, args) => {
//   const git = require('isomorphic-git');
//   const fs = require('fs');
//   const http = require('isomorphic-git/http/node');

//   try {
//     await git.push({
//       fs,
//       http: http,
//       dir: args.gitDir,
//     });
//   } catch (error) {
//     event.sender.send('gitPushCompleted', {
//       success: false,
//       message: error.message,
//     });
//   }

//   event.sender.send('gitPushCompleted', {
//     success: true,
//     message: ':)',
//   });
// });
