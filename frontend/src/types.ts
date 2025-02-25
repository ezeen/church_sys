export interface User {
    email: string;
    first_name: string;
    last_name: string;
    dob: string;
    id_number?: string;
    district: string;
    is_primary: boolean;
}

export interface Member extends User {
    isChild: boolean;
}