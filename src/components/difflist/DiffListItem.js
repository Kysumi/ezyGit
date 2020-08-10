import React, { useState } from 'react';
import { parseDiff, Diff, Hunk } from 'react-diff-view';
import { diffLines, formatLines } from 'unidiff';
import { Collapse, Button, Icon } from '@blueprintjs/core';

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

export const DiffListItem = ({ forcedOpenState, diff }) => {
  const [isOpen, setOpen] = useState(true);
  const parsedDiff = getGitDifference(diff.aFileContents, diff.bFileContents);
  const icon = isOpen ? 'chevron-up' : 'chevron-down';

  return (
    <div>
      <Button
        onClick={() => setOpen(!isOpen)}
        minimal={true}
        style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}
      >
        <Icon icon={icon} />
      </Button>
      <Collapse isOpen={isOpen}>
        <Diff
          viewType="split"
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
