export const saveLocalStorage = (local, itemTosave) => localStorage
  .setItem(local, JSON.stringify(itemTosave));

export const getLocalStorage = (localName) => JSON.parse(localStorage.getItem(localName));

export const saveRankingStorage = (itemTosave) => {
  const savedRanking = JSON.parse(localStorage.getItem('ranking'));
  if (savedRanking === null) {
    localStorage.setItem('ranking', JSON.stringify([itemTosave]));
  } else {
    const rankingToSave = [...savedRanking, itemTosave];
    rankingToSave.sort((a, b) => {
      const NEGATIVE_ONE = -1;
      if (a.score > b.score) return NEGATIVE_ONE;
      if (a.score < b.score) return 1;
      return 0;
    });
    localStorage.setItem('ranking', JSON.stringify(rankingToSave));
  }
};
