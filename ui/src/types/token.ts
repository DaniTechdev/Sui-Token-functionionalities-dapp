// types/token.ts
export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  maxSupply: string;
  remainingSupply: string;
  isPaused: boolean;
}

export interface TokenObjects {
  treasuryCap: string | null;
  totalSupply: string | null;
  transferPause: string | null;
  metadata: string | null;
}

export interface TransactionResult {
  success: boolean;
  digest?: string;
  error?: string;
}
