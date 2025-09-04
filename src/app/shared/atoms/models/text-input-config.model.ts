export type TextInputType = 'text' | 'password' | 'email' | 'number' | 'tel';

export interface TextInputConfig {
  type?: TextInputType;
  placeholder?: string;
  ariaLabel?: string;
  hasError?: boolean;
}
