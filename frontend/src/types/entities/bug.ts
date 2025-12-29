export interface IBug {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  category: 'ui' | 'functionality' | 'performance' | 'payment' | 'other';
  url?: string;
  userAgent?: string;
  screenshots?: IScreenshot[];
  steps?: string;
  expectedBehavior?: string;
  actualBehavior?: string;
  notes?: INote[];
  resolvedAt?: Date;
  resolvedBy?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IScreenshot {
  url: string;
  uploadedAt: Date;
}

export interface INote {
  _id?: string;
  text: string;
  createdBy?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt?: Date;
}
