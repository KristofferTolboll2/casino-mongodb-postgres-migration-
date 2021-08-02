import { Everymatrixes } from './../models/everymatrixes.entity';
import * as _ from 'lodash';
import { createType, IRobotics } from 'src/utilities/roboticsTypes';

interface NameMapping {
  modelName: string;
  actual: string;
}

export const inferredDataTypeMapper = (
  name: string,
  value: any,
  description: string,
): IRobotics => {
  if (name == undefined || value == undefined) {
    console.log('null');
    return null;
  }
  return {
    Type: createType(value),
    Name: name,
    Description: description,
    Value: value,
  };
};

export class IRoboticsEveryMatrix {
  values: IRobotics[];

  private static NAMES_MAPPINGS: NameMapping[] = [
    { modelName: 'name', actual: 'game_name' },
    { modelName: 'everyMatrixId', actual: 'game_id' },
    { modelName: 'thumbnail', actual: 'game_thumbnail' },
    { modelName: 'logo', actual: 'game_logo' },
    //{ modelName: 'ftp', actual: 'game_id' },
    { modelName: 'fpp', actual: 'game_fpp' },
    { modelName: 'restrictedTerritories', actual: 'country_restrictions' },
    { modelName: 'langauges', actual: 'game_languages' },
    { modelName: 'description', actual: 'game_description' },
    { modelName: 'creationTime', actual: 'game_creation' },
    { modelName: 'lastModified', actual: 'game_last_modified' },
    { modelName: 'newGameExpiryTime', actual: 'new_expiration' },
    { modelName: 'width', actual: 'property_width' },
    { modelName: 'height', actual: 'property_height' },
    { modelName: 'license', actual: 'property_license' },
    { modelName: 'defaultCoin', actual: 'property_coin' },
    { modelName: 'terminal', actual: 'property_terminal' },
    { modelName: 'currencies', actual: 'game_currencies' },
    { modelName: 'id', actual: 'game_id' },
    { modelName: 'jurisdictions', actual: 'property_jurisdictions' },
    { modelName: 'coefficient', actual: 'popularity_coefficient' },
    { modelName: 'ranking', actual: 'popularity_ranking' },
    { modelName: 'fun', actual: 'playmode_fun' },
    { modelName: 'anonymity', actual: 'playmode_anonymity' },
    { modelName: 'realMoney', actual: 'playmode_realmoney' },
    { modelName: 'jackpotType', actual: 'jackpot_type' },
    { modelName: 'realMoney', actual: 'playmode_realmoney' },
    { modelName: 'jackpotType', actual: 'jackpot_type' },
    { modelName: 'jackpotContribution', actual: 'jackpot_contribution' },
    { modelName: 'jackpotContributionEnable', actual: 'contribution_enabled' },
    { modelName: 'bonusContribution', actual: 'bonus_contribution' },
    { modelName: 'overridable', actual: 'bonus_overridable' },
    { modelName: 'excluded', actual: 'bonus_excluded' },
    { modelName: 'shortName', actual: 'game_shortname' },
    { modelName: 'playURL', actual: 'html5_launch' },
    { modelName: 'payout', actual: 'game_payout' },
    { modelName: 'topPrize', actual: 'top_prize' },
    {
      modelName: 'defaultMaxMultiplier',
      actual: 'vendor_limits_max_multiplier',
    },
    { modelName: 'vendorDisplayName', actual: 'game_vendor' },
    { modelName: 'contentProvider', actual: 'game_provider' },
    { modelName: 'highStakeValue', actual: 'additional_highstake' },
    { modelName: 'categories', actual: 'game_categories' },
  ];

  private static NESTED_NAMES_MAPPINGS = [
    {
      modelName: 'hitFrequency',
      values: [
        { key: 'min', actual: 'hit_frequency_min' },
        { key: 'max', actual: 'hit_frequency_max' },
      ],
    },
    {
      modelName: 'freeSpin',
      values: [
        { key: 'support', actual: 'freespin_support' },
        { key: 'supportFeatureBonus', actual: 'freespin_feature_support' },
      ],
    },
    {
      modelName: 'defaultMaxBet',
      values: [{ key: 'EUR', actual: 'vendor_limits_max_bet' }],
    },
    {
      modelName: 'defaultMaxWin',
      values: [{ key: 'EUR', actual: 'vendor_limits_max_multiplier' }],
    },
  ];

  constructor(values: IRobotics[]) {
    this.values = values;
  }

  private static createFromEntry([key, value]: [string, any]) {
    const modelNames = this.NESTED_NAMES_MAPPINGS.map(
      (entry) => entry.modelName,
    );
    const foundEntry = this.NAMES_MAPPINGS.filter(
      (entry) => entry.modelName === key,
    ).pop();

    if (modelNames.includes(key)) {
      return this.NESTED_NAMES_MAPPINGS.filter(
        (entry) => entry.modelName === key,
      ).map((entry) => {
        return entry.values.map((_value) => {
          return inferredDataTypeMapper(
            _value.actual,
            value[_value.key],
            'Lorem Ipsum',
          );
        });
      });
    }

    if (!foundEntry) {
      return;
    }

    return inferredDataTypeMapper(foundEntry.actual, value, 'Lorem Ipsum');
  }

  static createFromeData(item: Everymatrixes) {
    console.log('item', item);
    const values = Object.entries(item).map((entry) => {
      return this.createFromEntry(entry);
    });
    const parsedValues = _.flatMap(_.flatMap(values)) as IRobotics[];
    const IRobotics = new IRoboticsEveryMatrix(parsedValues);
    return IRobotics;
  }
}
