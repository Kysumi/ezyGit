import React from 'react';
import ReactList from 'react-list';
import { parseDiff, Diff, Hunk } from 'react-diff-view';
import { diffLines, formatLines } from 'unidiff';

class DiffList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forceExpandedAllItems: false,
    };
  }

  /**
   * Gets the difference between the two strings in a format for the
   * react-diff-view lib
   *
   * @param {string} originalText
   * @param {string} changedText
   */
  getGitDifference = (originalText, changedText) => {
    const diffText = formatLines(diffLines(originalText, changedText), {
      context: 3,
    });
    const [diff] = parseDiff(diffText, { nearbySequences: 'zip' });
    return diff;
  };

  renderItem = (index, key) => {
    const { items } = this.props;
    const diff = items[index];

    const parsedDiff = this.getGitDifference(
      diff.aFileContents,
      diff.bFileContents
    );

    return (
      <Diff
        key={key}
        viewType="split"
        diffType={parsedDiff.type}
        hunks={parsedDiff.hunks}
      >
        {(hunks) =>
          hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)
        }
      </Diff>
    );
  };

  render() {
    const { items } = this.props;

    return (
      <div>
        {items ? (
          <ReactList
            itemRenderer={this.renderItem}
            length={items.length}
            type="simple"
          />
        ) : null}
      </div>
    );
  }
}

export default DiffList;
