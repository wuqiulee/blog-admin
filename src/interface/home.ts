export interface TimeInfoType {
  status: string;
  desc: string;
}

export interface TimeMapType {
  [key: string]: TimeInfoType;
}

export interface ShowCountType {
  articleCount: number;
  sayCount: number;
}
