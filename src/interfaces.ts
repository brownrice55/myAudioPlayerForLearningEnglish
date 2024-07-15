export interface PathDataType {
  id: number;
  settingsName: string;
  folderName: string;
  setDigit: boolean;
  digit: number;
  extension: string;
  fileNoBefore: string;
  fileNoAfter: string;
}

export interface PlaybackDataType {
  id: number;
  settingsNameType: string;
  settingsNameAuto: string,
  settingsNameCustom: string, 
  numType: string,
  numberStart: number;
  numberEnd: number;
  numberType2Array: string;
  initialSpeed: number;
  order: number;
  setRepetition: boolean;
  repetition: number;
  setAcceleration: boolean;
  acceleration: number;
}

export interface HistoryDataType {
  id: number;
  date: string;
  pathName: string;
  noArray: any;
  repetition: number;
  acceleration: number;
}