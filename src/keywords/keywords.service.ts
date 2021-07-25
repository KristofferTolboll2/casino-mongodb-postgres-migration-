import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const gid = '1aNZw6tauWU8LBtJOxBTMd-jNDONV4FNVYvYgqjopcZQ';
const apiKey = 'AIzaSyBZb4unCDJi1RS6f0xfhvOMCX4fzP_JZ2s';

const privateKey = `-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDYGUGT1n/+P/yR\nu5f4J0Z3mY9+mGq2SN/7ePJY6Kuhm250oabQvzTV80Omy5y1geEALWY0tXtZ3kUK\nPdoHQiRAUhuh8qllnPOJpeXX+OYctDnZoRCE1LDI9SYwzFk3rrejQJeq9+1mGCAH\nm9cHZKC9pg7WWsQx0XoopszPQgmyCH+coAwzJ+etIBxXWSsY/ldHmyIPmJg2SLEb\nMdI2hhI+79soiJaa4O6MBQUoFO4ZbymDOgpe/vzfdt3RvUJ128Wh8pFYHL2GuxuJ\nqd88sKebJmsJbowVWs8f+xUQjzXOKM26Bpl/s1VemAMcXtT24dpmH+/93uVWjxVF\nfCaV4mUFAgMBAAECggEABADPxZKAgbcxn6W48ST1HWShr7X1OQCwfRS04tMW0KIz\n38oEYkF3oigdx1NmLJybYdODspN93KfUYbJ3S5F10wNu0fIJId5eg3lTHS/WBo9S\nls3GMi0TJ8FsLKMisDE2xuR8tXMl/RTn4owy5bjGVGmBYTFJl3rjjn46wyvqniyZ\nEtUHHHeujl2+j8GyX0T4e4EIFZbSVCHI0L7BozMCMp6tn9mZbHi1FeEGIGN0/Gd6\nQb81WsG0k5Xy6UnSb93DzlaxCgZuwTRJd0uv2niGVx2Mt2ki3vruPrpC+IE+nlKa\nnm55AhdgQViO+O00+5WpePZHC23CRXo4JzE1g+3SIQKBgQD1XgPPhQ7+NhzV6Y/U\nf4BbHWSKO6jAtjyLTBfCsPaBzZAfq2ucnd8kUVIcv2xt/R89HrQ5OH+Owd4BWJ5b\nBABmUPFqsiHLMyDGJcZh47G6m5ng0juHIYBxTFGmCt7NG8q1QSLpcCBD+XpEUyJY\nCLhQFmWSFx0JgRjG6HJolUzBtQKBgQDhdoy9Ic+wxIMV2Ri/guSBWp18z9hKDkND\nstG5W7Jv312Mfs++JY8RdaK0kQtdAfZCwKRq7JFmgo9re3YYcUmGHe3e+rfbPkj/\ngSSact0uOx4hNsYDiLG0UVjIj0FsAm/kB67qDuhiA+OJ08za2vpydSyASYeYQsX8\nKDLvF7hoEQKBgQCixZ+ZhxePJK60aaD0wzCPQUx1N2aXkU1Qy0Xn7iVZrtixabKV\nz1U8boYedA6mWIjkrv24B/b26T0xf2xtzJXHSmMc+NbaSiyvxld4kOhSdu756f17\ng4oFny97CzMKtikfXPqgCbYd4d5ufQgHhqFe37y50YN9zpp1ObbMEl89EQKBgE3o\nXx2Dr3bPkNRd3jVfD4K7Qyw7zetZHlkoU1wPmYsazgKcV0DHTbakxYJLlHehE+1h\nD+96q4uWleR4Fwi/LL7RXL7uN9XkoejYQUO1aURuXSzw9l+GPpGmgl1bUyn1daCA\nHyr118r2uQuJSoJdpKkkYCo8PkSY3j0RzvfbZHdhAoGBANPTT3GZpF8o39C00gA1\n8ftqgMSNI6YYNpp7I+pDzWqgsWTSE3WhpHy4jn+StcWKKXZe91RTy4JtjAVdulCR\n/MXOi3E1TcEC6SnY0xVL2wx7ZQqsqXnO7w//NeJ10LGW3pFLBjQRYBKl+QfuDDiN\nhzIvpThxksOavT1E/kVZ79Xs\n-----END PRIVATE KEY-----\n`;
const clientEmail =
  'admin-585@keyword-spreadsheet-analysis.iam.gserviceaccount.com';

export interface KeywordData {
  gameTitle: string;
  allKeywords: string[];
}
@Injectable()
export class KeywordsService {
  private spreadsheetClinet: GoogleSpreadsheet;

  constructor(private readonly configService: ConfigService) {
    this.spreadsheetClinet = new GoogleSpreadsheet(gid);
    this.initializeClient(clientEmail, privateKey);
  }

  private async initializeClient(clientEmail: string, privateKey: string) {
    await this.spreadsheetClinet.useServiceAccountAuth({
      client_email: clientEmail,
      private_key: privateKey,
    });
  }

  async getKeywordData(limit: number, offset = 0): Promise<KeywordData[]> {
    await this.initializeDocumentInfo();
    const sheet = this.spreadsheetClinet.sheetsByIndex[1];
    const rows = await sheet.getRows({ limit: limit, offset: offset });
    return rows.map((row) => {
      return this.convertRows(row._rawData);
    });
  }

  private convertRows(rawData: any): KeywordData {
    console.log(rawData);
    const title = rawData[0] as string;
    const parsedTitle = title.split('/').slice(-2)[0];
    const allKeywords = rawData.slice(-1)[0] as string;
    const parsedKeywords = allKeywords
      .split(',')
      .map((entry) => entry.trim()) as string[];
    return { gameTitle: parsedTitle, allKeywords: parsedKeywords };
  }

  private async initializeDocumentInfo() {
    await this.spreadsheetClinet.loadInfo();
  }

  async getTitle() {
    await this.initializeDocumentInfo();
    return this.spreadsheetClinet.title;
  }
}
