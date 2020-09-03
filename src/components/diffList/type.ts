enum ModificationType {
  equal = 'equal',
  added = 'added',
  modified = 'modified',
  deleted = 'removed',
}

export interface CommitDiff {
  filePath: string;
  modificationType: ModificationType;
  afterFileState: string;
  beforeFileState: string;
}
