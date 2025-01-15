export interface Case {
  id: number;
  title: string;
  description: string;
  status: string;
  // Add other case properties
}

export interface CasesState {
  cases: Case[];
  selectedCase: Case | null;
  loading: boolean;
  error: string | null;
}

export const initialCasesState: CasesState = {
  cases: [],
  selectedCase: null,
  loading: false,
  error: null
};
