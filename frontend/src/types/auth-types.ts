import { User } from './user-types';

interface AuthStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  user: User | null;
  message: string | null;
  validations: any[];
  strength: number;
  isExpired: boolean | null;
  statusCode?: number | null;
  refreshToken: string | null;
  tokenIsValid: boolean;
  passwordsMatch: boolean;
}

interface AccountCreatedModalProps {
  accountCreated: boolean;
  closeModal: () => void;
}

export type { AuthStatePayload, AccountCreatedModalProps };
