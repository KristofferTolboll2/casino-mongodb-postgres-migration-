import { Articles } from './../../articles/models/articles.entity';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { promises as fs } from 'fs';
import { EveryMatrixService } from '../every-matrix.service';

export interface EveryMatrixEntry {
  name: string;
  article: Articles | null;
  everyMatrixId: number;
  thumbnail?: string;
  logo?: string;
  ftp?: number;
  fpp?: number;
  contentProvider?: string;
  restrictedTerritories?: string[];
  langauges?: string[];
  currencies?: string[];
  description?: string;
  vendorID?: number;
  vendorDisplayName: string;
  gameBundleID: string;
  creationTime?: string;
  lastModified?: string;
  newGameExpiryTime?: string;
  width?: number;
  height?: number;
  license?: string;
  defaultCoin?: number;
  terminal?: string[];
  jurisdictions?: string[];
  report?: {
    category: string;
    invoicingGroup: string;
  };
  freeSpin?: {
    support: boolean;
    supportFeatureBonus: boolean;
  };
  hitFrequency?: {
    min: number;
    max: number;
  };
  coefficient?: number;
  ranking?: number;
  fun?: boolean;
  anonymity?: boolean;
  realMoney?: boolean;
  jackpotType?: string;
  jackpotContribution?: number;
  jackpotContributionEnable?: boolean;
  bonusContribution?: number;
  overridable?: boolean;
  excluded?: boolean;
  gameName?: string;
  categories?: string[];
  shortName?: string;
  playURL?: string;
  payout?: number;
  topPrize?: number[];
  defaultMaxBet?: {
    EUR: number;
  };
  defaultMaxMultiplier?: number;
  defaultMaxWin?: {
    EUR: number;
  };
  highStakeValue: boolean;
}

function* multiJson(str: string) {
  while (str) {
    try {
      yield JSON.parse(str);
      str = '';
    } catch (e) {
      const m = String(e).match(/position\s+(\d+)/);
      if (m !== null) {
        yield JSON.parse(str.slice(0, m[1] as unknown as number));
        str = str.slice(m[1] as unknown as number);
      }
    }
  }
}

@Injectable()
export class EveryMatrixDataService {
  private everyMatrixUrl: string;
  private filePrefix =
    '/home/kristoffer/Desktop/projects/vitamedia/casino/casino-server/src/every-matrix/data/Every_Matrix.json';
  private everyMatrixFilepath: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly everyMatrixService: EveryMatrixService,
  ) {
    this.everyMatrixUrl = this.configService.get<string>('EVERY_MATRIX_URL');
    console.log(__dirname);
    this.everyMatrixFilepath =
      this.configService.get<string>('EVERY_MATRIX_FILE_PATH') ||
      `${this.filePrefix}`;
  }
  private readonly logger = new Logger(EveryMatrixDataService.name);

  async createEveryMatrixFile() {
    try {
      const content = (await axios.get(this.everyMatrixUrl)).data;
      await fs.writeFile(this.everyMatrixFilepath, content, {
        encoding: 'utf8',
        flag: 'w',
      });
      console.log('file created');
      return true;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async readAndParseFile() {
    try {
      const fileStats = await fs.stat(this.everyMatrixFilepath);
      console.log(fileStats);
    } catch (error) {
      this.logger.error('Files does not exists');
      await this.createEveryMatrixFile();
    }
    const responses: EveryMatrixEntry[] = [];
    const jsonData = await fs.readFile(this.everyMatrixFilepath);
    for (const entry of multiJson(jsonData.toString())) {
      if (entry.hasOwnProperty('data')) {
        const name: string = entry.data.presentation.gameName['*'];

        const images: any = entry.data.presentation.thumbnails;
        const thumbnail: string =
          images['*'].length > 0 ? images['*'].pop().url : null;
        const logo: string = entry.data.presentation.logo
          ? entry.data.presentation.logo['*']
          : null;
        const ftp: number = entry.data.ftp;
        const fpp: number = entry.data.fpp;
        const restrictedTerritories: string[] =
          entry.data.restrictedTerritories;
        const langauges: string[] = entry.data.langauges;
        //always null
        const currencies: string[] = entry.data.currencies;
        const description: string = entry.data.description;
        const {
          time: creationTime,
          lastModified,
          newGameExpiryTime,
        }: {
          time: string;
          lastModified: string;
          newGameExpiryTime: string;
        } = entry.data.creation;
        //should be renamed to game_iframe
        const {
          width,
          height,
          license,
          defaultCoin,
          terminal: property_terminal,
          jurisdictions,
          freeSpin,
          hitFrequency,
        }: {
          width: number;
          height: number;
          license: string;
          defaultCoin: number;
          terminal: string[];
          jurisdictions: string[];
          freeSpin: { support: boolean; supportFeatureBonus: boolean };
          hitFrequency: { min: number; max: number; ageLimit: boolean };
        } = entry.data.property;
        const {
          coefficient,
          ranking,
        }: { coefficient: number; ranking: number } = entry.data.popularity;
        const {
          fun,
          anonymity,
          realMoney,
        }: {
          fun: boolean;
          anonymity: boolean;
          realMoney: boolean;
        } = entry.data.playMode;

        const jackpotType: string = entry.data?.jackpot?.type || null;
        const jackpotContribution: number =
          entry.data?.jackpot?.contribution && null;
        const jackpotContributionEnable: boolean =
          entry.data?.jackpot?.contributionEnable && null;

        const {
          contribution: bonusContribution,
          overridable,
          excluded,
        }: {
          contribution: number;
          overridable: boolean;
          excluded: boolean;
        } = entry.data.bonus;
        const gameName: string = Object.values(
          entry.data.presentation.gameName,
        ).pop() as string;
        const shortName: string = Object.values(
          entry.data.presentation.shortName,
        ).pop() as string;

        const categories: string[] = entry.data.categories;
        //html 5 launch
        const playURL = entry.data.url;
        //const { support, supportFeatureBonus } = entry.data.property.freespin;

        const vendorID: number = entry.data.vendorID;
        const vendorDisplayName: string = entry.data.vendorDisplayName;
        const gameBundleID: string = entry.data.gameBundleID;
        const payout = entry.data.theoreticalPayOut;
        //devices
        const report: { category: string; invoicingGroup: string } =
          entry.data.report;
        const topPrize: number = entry.data.topPrize;
        const contentProvider: string = entry.data.contentProvider;
        const { defaultMaxBet, defaultMaxMultiplier, defaultMaxWin } =
          entry.data.vendorLimits;
        const { displayName, value: highStakeValue } =
          entry.data.additional.highStake;
        const everyMatrixId = entry.data.id;

        const everyMatrixEntry: EveryMatrixEntry = {
          name,
          article: null,
          vendorID,
          report,
          contentProvider,
          vendorDisplayName,
          gameBundleID,
          everyMatrixId,
          thumbnail,
          logo,
          ftp,
          fpp,
          restrictedTerritories,
          langauges,
          currencies,
          description,
          creationTime,
          lastModified,
          newGameExpiryTime,
          width,
          height,
          license,
          defaultCoin,
          terminal: property_terminal,
          jurisdictions,
          coefficient,
          ranking,
          freeSpin,
          hitFrequency,
          fun,
          anonymity,
          realMoney,
          jackpotType,
          jackpotContribution,
          jackpotContributionEnable,
          bonusContribution,
          overridable,
          excluded,
          gameName,
          categories,
          shortName,
          playURL,
          payout,
          defaultMaxBet,
          defaultMaxMultiplier,
          defaultMaxWin,
          highStakeValue,
        };
        console.log(everyMatrixEntry);
        const createdEntry =
          await this.everyMatrixService.createOrIgnoreEveryMatrixEntry(
            everyMatrixEntry,
          );
        responses.push(createdEntry);
      }
    }
    return responses;
  }
}
