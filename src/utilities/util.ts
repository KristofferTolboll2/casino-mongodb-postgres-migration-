import * as moment from 'moment';

export const selectRandomFromList = (list: any[], amount: number) => {
  const shuffled = list.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, amount);
};

export enum DateFormat {
  YYYYMMDD = 'YYYYMMDD',
}

export const parseDateToFormat = (
  dateFormat: keyof typeof DateFormat,
  date: Date,
) => {
  switch (dateFormat.valueOf()) {
    case DateFormat.YYYYMMDD.valueOf():
      const format = 'yyyyMMDD';
      return moment(date).format(format);
  }
};
