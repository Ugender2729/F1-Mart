export interface OrderVerification {
  orderId: string;
  verifiedAt: string | null;
  verificationDeadline: string;
  isVerified: boolean;
  canRefund: boolean;
  deliveredAt: string;
  verificationImages?: string[];
  verificationNotes?: string;
}

export interface VerificationStatus {
  isWithinVerificationWindow: boolean;
  timeRemaining: number; // in seconds
  canVerify: boolean;
  canRefund: boolean;
  message: string;
}

