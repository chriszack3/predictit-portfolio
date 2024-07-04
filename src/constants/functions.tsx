import { Post } from '@/constants/interfaces';

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
