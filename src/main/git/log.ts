import { Commit } from 'nodegit';
import { nodeGit } from './nodegit';

export const log = async (callback: (commits: Commit[]) => void) => {
  const repo = await nodeGit();

  // Todo add ability to focus specific branches
  const recentCommit = await repo.getHeadCommit();
  const history = recentCommit.history();

  let count = 0;
  const commits: Commit[] = [];

  history.on('commit', (commit: Commit) => {
    // Disregard commits past 9.
    if (++count >= 9) {
      callback(commits);

      return;
    }

    commits.push(commit);
  });

  history.start();
};

// // Open the master branch.
// .then(function (repo) {
//     return repo.getMasterCommit();
//   })
//   // Display information about commits on master.
//   .then(function (firstCommitOnMaster) {
//     // Create a new history event emitter.
//     var history = firstCommitOnMaster.history();

//     // Create a counter to only show up to 9 entries.
//     var count = 0;

//     // Listen for commit events from the history.
//     history.on('commit', function (commit) {
//       // Disregard commits past 9.
//       if (++count >= 9) {
//         return;
//       }

//       // Show the commit sha.
//       console.log('commit ' + commit.sha());

//       // Store the author object.
//       var author = commit.author();

//       // Display author information.
//       console.log('Author:\t' + author.name() + ' <' + author.email() + '>');

//       // Show the commit date.
//       console.log('Date:\t' + commit.date());

//       // Give some space and show the message.
//       console.log('\n    ' + commit.message());
//     });

//     // Start emitting events.
//     history.start();
//   })
