import React from 'react';
import { parseDiff, Diff, Hunk } from 'react-diff-view';
import { diffLines, formatLines } from 'unidiff';
import { CollapseHeader } from './CollapseHeader';

/**
 * Gets the difference between the two strings in a format for the
 * react-diff-view lib
 *
 * @param {string} originalText
 * @param {string} changedText
 */
const getGitDifference = (originalText, changedText) => {
  const diffText = formatLines(diffLines(originalText, changedText), {
    context: 3,
  });
  const [diff] = parseDiff(diffText, { nearbySequences: 'zip' });
  return diff;
};

export const DiffListItem = ({ diff, viewStyle, children }) => {
  const parsedDiff = getGitDifference(
    diff.afterFileState,
    diff.beforeFileState
  );

  return (
    <CollapseHeader title={diff.filePath} rightButtons={children}>
      <Diff
        viewType={viewStyle}
        diffType={parsedDiff.type}
        hunks={parsedDiff.hunks}
      >
        {(hunks) =>
          hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)
        }
      </Diff>
    </CollapseHeader>
  );
};

// export default React.memo(DiffListItem);
export default DiffListItem;
