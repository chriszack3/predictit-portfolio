import { FlatPost, Post } from '@/constants/interfaces';

export const getPosCount = (comArr: Array<Post>) => {
  let i = 0;
  comArr.forEach((com) => {
    const score = com?.result?.documentSentiment?.score || 0;
    if (score >= 0.25) {
      i++;
    }
  });
  return i;
};
export const getNegCount = (comArr: Array<Post>) => {
  let i = 0;
  comArr.forEach((com) => {
    const score = com?.result?.documentSentiment?.score || 0;
    if (score <= -0.25) {
      i++;
    }
  });
  return i;
};
export const getNeutCount = (comArr: Array<Post>) => {
  let i = 0;
  comArr.forEach((com) => {
    const score = com?.result?.documentSentiment?.score || 0;
    if (score >= -0.25 && score <= 0.25) {
      i++;
    }
  });
  return i;
};

export const getDateRange = (comArr: Array<FlatPost>) => {
  let minDate = Date.now();
  let maxDate = 0;
  comArr.forEach((com) => {
    if (com?.postedAtMS && com?.postedAtMS < minDate) {
      minDate = com.postedAtMS;
    }
    if (com?.postedAtMS && com?.postedAtMS > maxDate) {
      maxDate = com.postedAtMS;
    }
  });
  return [minDate, maxDate];
};
