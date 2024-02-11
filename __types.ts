export interface Charge {
    duplicated: any;
    object: string;
    id: string;
    creation_date: number;
    amount: number;
    amount_refunded: number;
    current_amount: number;
    installments: number;
    installments_amount: any;
    currency_code: string;
    email: string;
    description: string;
    source: ChargeSource;
    outcome: Outcome;
    fraud_score: any;
    antifraud_details: AntifraudDetails;
    dispute: boolean;
    capture: boolean;
    reference_code: string;
    authorization_code: string;
    metadata: ChargeMetadata;
    total_fee: number;
    fee_details: FeeDetails;
    total_fee_taxes: number;
    transfer_amount: number;
    paid: boolean;
    statement_descriptor: string;
    transfer_id: any;
    operations: any[];
    capture_date: number;
}

export interface AntifraudDetails {
    first_name: string;
    last_name: string;
    address: string;
    address_city: string;
    country_code: string;
    phone: string;
    object: string;
}

export interface FeeDetails {
    fixed_fee: FixedFee;
    variable_fee: VariableFee;
}

export interface FixedFee {
    amount: number;
    currency_code: string;
    total: number;
}

export interface VariableFee {
    currency_code: string;
    commision: number;
    total: number;
}

export interface ChargeMetadata {
    documentNumber: string;
}

export interface Outcome {
    type: string;
    code: string;
    merchant_message: string;
    user_message: string;
}

export interface ChargeSource {
    object: string;
    id: string;
    active: boolean;
    creation_date: number;
    customer_id: string;
    source: SourceSource;
    metadata: PurpleMetadata;
}

export interface PurpleMetadata {
}

export interface SourceSource {
    object: string;
    id: string;
    type: string;
    creation_date: number;
    email: string;
    card_number: string;
    last_four: string;
    active: boolean;
    iin: Iin;
    client: Client;
    metadata: FluffyMetadata;
}

export interface Client {
    ip: any;
    ip_country: any;
    ip_country_code: any;
    browser: any;
    device_fingerprint: any;
    device_type: any;
}

export interface Iin {
    object: string;
    bin: string;
    card_brand: string;
    card_type: string;
    card_category: any;
    issuer: Issuer;
    installments_allowed: any[];
}

export interface Issuer {
    name: string;
    country: string;
    country_code: string;
    website: any;
    phone_number: any;
}

export interface FluffyMetadata {
    installments: string;
}

export type ExcelRow = {
    codigo: string;
    ventaCulqi: string;
    monto: string;
    moneda: string;
    email: string;
    fechaEmision: string;
}

export interface Strategy {
    getData(data: ExcelRow, newRows: ExcelRow[]): Promise<void>;
}

export interface Context {
    strategy: Strategy;
    setStrategy(strategy: Strategy): void;
    getData(data: ExcelRow, newRows: ExcelRow[]): Promise<void>;
}

export interface Order {
    object: string;
    id: string;
    amount: number;
    payment_code: string;
    currency_code: string;
    description: string;
    order_number: string;
    state: string;
    total_fee: null;
    net_amount: null;
    fee_details: null;
    creation_date: number;
    expiration_date: number;
    updated_at: null;
    paid_at: null;
    available_on: null;
    metadata: null;
    qr: string;
    cuotealo: string;
    url_pe: string;
}
