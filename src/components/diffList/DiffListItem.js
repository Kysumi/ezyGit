import React, { useState } from 'react';
import { parseDiff, Diff, Hunk } from 'react-diff-view';
import { diffLines, formatLines } from 'unidiff';
import { Collapse, Button, Icon, Text } from '@blueprintjs/core';

const buttonStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
};

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

export const DiffListItem = ({ forcedOpenState, diff, viewStyle }) => {
  const [isOpen, setOpen] = useState(true);
  const parsedDiff = getGitDifference(diff.aFileContents, diff.bFileContents);
  const icon = isOpen ? 'chevron-up' : 'chevron-down';

  return (
    <div>
      <Button onClick={() => setOpen(!isOpen)} style={buttonStyle}>
        <div style={buttonStyle}>
          <Icon icon={icon} />
          <Text>
            <b>{diff.filePath}</b>
          </Text>
        </div>
      </Button>
      <Collapse isOpen={isOpen}>
        <Diff
          viewType={viewStyle}
          diffType={parsedDiff.type}
          hunks={parsedDiff.hunks}
        >
          {(hunks) =>
            hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)
          }
        </Diff>
      </Collapse>
    </div>
  );
};

export default React.memo(DiffListItem);
