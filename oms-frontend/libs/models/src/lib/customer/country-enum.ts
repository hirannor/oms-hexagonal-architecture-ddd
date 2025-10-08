export enum CountryCode {
  HUNGARY = 'HUNGARY',
  GERMANY = 'GERMANY',
}

export const CountryLabels: Record<CountryCode, string> = {
  [CountryCode.HUNGARY]: 'Hungary',
  [CountryCode.GERMANY]: 'Germany',
};

export const Countries: { label: string; value: CountryCode }[] = Object.values(
  CountryCode
).map((code) => ({
  label: CountryLabels[code],
  value: code,
}));
