// Get narration name based on the reciter identifier
export const narrationIdentifierFromReciterId = (identifier: string | undefined) => {
  // Outdated, not used now, but still works
  let riwayaahIdentifier = '';
  switch (true) {
    case identifier?.includes('hafs'):
      riwayaahIdentifier = 'quran-hafs';
      break;
    case identifier?.includes('shoba'):
      riwayaahIdentifier = 'quran-shoba';
      break;
    case identifier?.includes('warsh'):
      riwayaahIdentifier = 'quran-warsh';
      break;
    case identifier?.includes('qunbul'):
      riwayaahIdentifier = 'quran-qunbul';
      break;
    case identifier?.includes('albazzi'):
      riwayaahIdentifier = 'quran-albazzi';
      break;
    case identifier?.includes('qaloon'):
      riwayaahIdentifier = 'quran-qaloon';
      break;
    case identifier?.includes('alsoosi'):
      riwayaahIdentifier = 'quran-alsoosi';
      break;
    case identifier?.includes('aldouri'):
      riwayaahIdentifier = 'quran-aldouri';
      break;
    default:
      riwayaahIdentifier = '';
  }
  return riwayaahIdentifier;
};
