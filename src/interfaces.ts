export interface PathDataType {
  id: number;
  name: string;
  extension: string;
  floderName: string;
  useDigit: boolean;
  digit: number;
  filename1: string;
  filename2: string;
}

export interface playbackDataType {
  id: number;
  settingsNameType: string;
  settingsNameAuto: string,
  settingsNameCustom: string, 
  settingsType: number,
  settingsSpeed: number,
  settingsOrder: number,
  settingsRepetition: number,
  number1: number;
  number2: number;
}
