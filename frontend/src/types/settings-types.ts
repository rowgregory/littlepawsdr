interface UserProfileDetailsFormProps {
  inputs: Record<string, string | number>; // or a more specific type based on your input structure
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateUser: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  errors: Record<string, string>; // or a more specific error type based on your error structure
}

export type { UserProfileDetailsFormProps };
