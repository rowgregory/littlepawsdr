interface EcardProps {
  _id: string;
  category?: string; // Category of the eCard (optional)
  price?: number; // Price of the eCard (optional)
  image?: string; // URL of the eCard image (optional)
  name?: string; // Name of the eCard (optional)
  isEcard?: boolean; // Indicates if it's an eCard, defaults to true (optional)
  thumb?: string; // URL of the thumbnail image (optional)
  sendNow?: boolean; // Indicates if the eCard can be sent immediately, defaults to true (optional)
  createdAt?: Date; // Timestamp for when the eCard was created (optional)
  updatedAt?: Date; // Timestamp for when the eCard was last updated (optional)
}

interface EcardStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  ecards: [EcardProps] | any;
  ecard: EcardProps;
  categories: [];
}

export type { EcardProps, EcardStatePayload };
