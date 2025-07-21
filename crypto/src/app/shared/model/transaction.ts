export interface Transaction {
    id: string;
    transactionType: string;
    status: string;
    subject: string;
    foundationName: string;
    foundationCode: string;
    createdAt: Date;
    createUsername: string;
    createFullName: string;
}

export interface Foundation {
    id: string;
    code: string;
    parentId: string;
    name: string;
}
export interface TransactionDetail {
    id: string;
    transactionType: string;
    status: string;
    subject: string;
    foundationName: string;
    foundationCode: string;
    createdAt: Date;
    createUsername: string;
    createFullName: string;
    creatorId: string;
    creatorFullName: string;
    creatorUsername: string;
    creatorPhoneNumber: string;
    creatorEmail: string;
    creatorAddress: string;
}

export interface TransactionCreateRequest<T> {
    transactionType: string;
    foundationId: string;
    content: string;
    request: T;
}

export interface WorkingCalendarRequest {
    startDate: Date;
    endDate: Date;
    accessRole: string;
    ownerId: string;
    receiverId: string;
}

export interface EnrollmentRequest {
    frontIdCard: string;
    backIdCard: string;
    portrait: string;
}

export class FormDataTransactionRequest {
    data!: string; // stringify the object
    attachFile!: File | null;
    frontIdCard: File | null | undefined;
    backIdCard: File | null | undefined;
    portrait: File | null | undefined;
}
