import React from 'react';
import { parseDiff, Diff, Hunk } from 'react-diff-view';
import { diffLines, formatLines } from 'unidiff';
import { CollapseHeader } from './CollapseHeader';
import { Text } from 'evergreen-ui';

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

// TODO remove from here and proccess the diff in a worker much earlier in the life cycle
const handeNonLargeFile = (diff, viewStyle) => {
  const parsedDiff = getGitDifference(
    diff.afterFileState,
    diff.beforeFileState
  );
  return (
    <Diff
      viewType={viewStyle}
      diffType={parsedDiff.type}
      hunks={parsedDiff.hunks}
    >
      {(hunks) => hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)}
    </Diff>
  );
};

export const DiffListItem = ({ diff, viewStyle, children }) => {
  return (
    <CollapseHeader title={diff.filePath} rightButtons={children}>
      {diff.largeFileDiff ? (
        <Text>
          <b>WOAH! BIG FILE NO THANKS!</b>
        </Text>
      ) : (
        handeNonLargeFile(diff, viewStyle)
      )}
    </CollapseHeader>
  );
};

// export default React.memo(DiffListItem);
export default DiffListItem;
