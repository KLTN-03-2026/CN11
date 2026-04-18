export interface PayloadEmailRecieve {
  email: string;
}

export interface PayloadEmailOTP {
  email: string;
  otp: string;
}

export interface PayloadOTPResetPassword {
  email: string;
  otp: string;
}

export interface PayloadEmailOlder {
  email: string;
  tableId: string;
  day: string;
  number: string;
  hour: string;
}

export interface PayloadEmailMessage {
  email: string;
  message: string;
  id: number;
  name: string;
}

