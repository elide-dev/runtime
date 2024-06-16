
export type PrimordialsObject = {
  [key: string]: any;
};

declare global {
  const primordials: PrimordialsObject;
}

export {};
