import {getRealm} from './Realm';

import _ from 'lodash';
import moment from '../vendors/moment';
import {getUUID} from './UUID';
import Colors from '../styles/Colors';

export const getBalance = async (daysToSubtract = 0) => {
  const realm = await getRealm();

  let entries = realm.objects('Entry');

  if (daysToSubtract > 0) {
    const date = moment()
      .subtract(daysToSubtract, 'days')
      .toDate();

    entries = entries.filtered('entryAt < $0', date);
  }

  return entries.sum('amount');
};

export const getBalanceSumByDate = async days => {
  const realm = await getRealm();

  const startBalance = await getBalance(days);

  let entries = realm.objects('Entry');

  if (days > 0) {
    const date = moment()
      .subtract(days, 'days')
      .toDate();

    entries = entries.filtered('entryAt >= $0', date);
  }

  entries = entries.sorted('entryAt');

  entries = _(entries)
    .groupBy(({entryAt}) => moment(entryAt).format('YYYYMMDD'))
    .map(entry => _.sumBy(entry, 'amount'))
    .map((amount, index, collection) => {
      (index === 0 ? startBalance : 0) +
        _.sum(_.slice(collection, 0, index)) +
        amount;
    });

  console.log('getBalanceSumByDays :: ', JSON.stringify(entries));

  return entries;
};

export const getBalanceSumByCategory = async (days, showOthers = true) => {
  const realm = await getRealm();

  let entries = realm.objects('Entry');

  if (days > 0) {
    const date = moment()
      .subtract(days, 'days')
      .toDate();

    entries = entries.filtered('entryAt >= $0', date);
  }

  entries = _(entries)
    .groupBy(({category: {id}}) => id)
    .map(entry => ({
      category: _.omit(entry[0].category, 'entries'),
      amount: Math.abs(_.sumBy(entry, 'amount')),
    }))
    .filter(({amount}) => amount > 0)
    .orderBy('amount', 'desc');

  const othersLimit = 3;

  if (showOthers && _.size(entries) >= othersLimit) {
    const data1 = _(entries).slice(0, othersLimit);

    const data2 = [
      {
        category: {id: getUUID(), name: 'Outros', color: Colors.metal},
        amount: _(entries)
          .slice(othersLimit)
          .map(({amount}) => amount)
          .sum(),
      },
    ];

    entries = [...data1, ...data2];
  }
  console.log('getBalanceSumByCategory :: ', JSON.stringify(entries));

  return entries;
};
