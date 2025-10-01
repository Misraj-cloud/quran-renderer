// Get narration name based on the reciter identifier
export const narrationIdentifierFromReciterId = (identifier: string | undefined) => {
  // Outdated, not used now, but still works
  let riwayaahIdentifier = '';
  switch (true) {
    case identifier?.includes('hafs'):
      riwayaahIdentifier = 'mushaf-hafs';
      break;
    case identifier?.includes('shoba'):
      riwayaahIdentifier = 'mushaf-shoba';
      break;
    case identifier?.includes('warsh'):
      riwayaahIdentifier = 'mushaf-warsh';
      break;
    case identifier?.includes('qunbul'):
      riwayaahIdentifier = 'mushaf-qunbul';
      break;
    case identifier?.includes('albazzi'):
      riwayaahIdentifier = 'mushaf-albazzi';
      break;
    case identifier?.includes('qaloon'):
      riwayaahIdentifier = 'mushaf-qaloon';
      break;
    case identifier?.includes('alsoosi'):
      riwayaahIdentifier = 'mushaf-alsoosi';
      break;
    case identifier?.includes('aldouri'):
      riwayaahIdentifier = 'mushaf-aldouri';
      break;
    default:
      riwayaahIdentifier = '';
  }
  return riwayaahIdentifier;
};
