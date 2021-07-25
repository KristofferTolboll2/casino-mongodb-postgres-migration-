import { Casinos } from './../casino/models/casinos.entity';
import * as _ from 'lodash';

export type IRoboticsValueType = string | number | string[] | boolean;

export interface IRobotics {
  Type: string;
  Name: string;
  Description: string;
  Value: IRoboticsValueType;
}

//Here we are defining a static type for
export interface IProvider {
  _id: string;
  imge: string;
  title: string;
  rank: number;
  gameAmount: number;
  gameHyperLink: string;
  casinoHyperLink: string;
}

const dateRegexExp = new RegExp(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d*/);
const isDateRegex = (dateStr: any): boolean => {
  if (typeof dateStr === 'string') return dateRegexExp.test(dateStr);
  else return false;
};

// const isMongoId = (mongoId: any): boolean => {
//   const { ObjectId } = Types;
//   return ObjectId.isValid(mongoId);
// };

export const createType = (value: IRoboticsValueType) => {
  // const stringMongoCond = (value: any) => isMongoId(value);
  if (typeof value === 'number') {
    console.log('num value' + value);
  }
  if (Array.isArray(value)) {
    return 'List';
  } else if (isDateRegex(value)) {
    return 'Date';
  } else if (typeof value === 'number') {
    return 'Number';
  } else if (typeof value === 'string') {
    return 'Text';
  } else if (typeof value === 'boolean') {
    return 'Bool';
  } else {
    return 'NULL';
  }
};

//If it works it's a miracle
const nestedProviderDateTypeMapper = (
  item: IProvider,
  index: number,
): IRobotics[] => {
  return Object.keys(item).map((key) => {
    return {
      Type: createType(item[key]),
      Name: `Providers_Provider${index + 1}_${key}`,
      Description: key,
      Value: item[key],
    };
  });
};

let cachedGame: string = null;
let counter = 0;

const setCachedGameAndCounter = (title: string) => {
  if (cachedGame === null) {
    cachedGame = title;
  } else if (title === cachedGame) {
    counter++;
  } else {
    cachedGame = title;
    counter = 0;
  }
};

const providerDataTypeMapper = (
  key: string,
  value: IProvider,
  index: number,
  title: string,
): IRobotics[] => {
  return _.flatMap(
    Object.entries(value).map(([key, value]) => {
      const parsedValue = value as IProvider;
      setCachedGameAndCounter(title);
      return nestedProviderDateTypeMapper(parsedValue, counter);
    }),
  );
};

export const providerDataTypeMapperWrapper = (
  model: any,
  index: number,
  title?: string,
): IRobotics[] => {
  return _.flatMap(
    Object.entries(model).map(([key, value], _index) => {
      if (key === 'providers') {
        return providerDataTypeMapper(key, value as IProvider, index, title);
      } else {
        return dataTypeMapper(key, value);
      }
    }),
  );
};
/**
 * Used for converting to ICRobotics vaue
 * @param key
 * @param value
 * @returns
 */
const dataTypeMapper = (key: string, value: any): IRobotics => {
  if (value === null) {
  }
  return {
    Type: createType(value),
    Name: key,
    Description: key,
    Value: value,
  };
};

export const casinoDataTypeMapper = (model: Casinos): IRobotics[] => {
  const parsedCasino = model;
  const Id = parsedCasino.id;
  const entries = _.flatMap(
    Object.entries(parsedCasino).map(([key, value], _index) => {
      return dataTypeMapper(key, value);
    }),
  );
  entries.unshift(dataTypeMapper('Id', Id));
  return entries;
};
