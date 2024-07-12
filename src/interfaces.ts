export interface PathDataType {
  id: number;
  settingsName: string;
  folderName: string;
  setDigit: boolean;
  digit: number;
  fileNoBefore: string;
  fileNoAfter: string;
}

export interface playbackDataType {
  id: number;
  settingsNameType: string;
  settingsNameAuto: string,
  settingsNameCustom: string, 
  numType: string,
  numberStart: number;
  numberEnd: number;
  initialSpeed: number;
  order: number;
  setRepetition: boolean;
  repetition: number;
  setAcceleration: boolean;
  acceleration: number;
}
