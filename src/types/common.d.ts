// Common type definitions

//Base interface for all document / record
export interface Entity {
    _id?: string,
}
// Suburb
export interface Suburb extends Entity {
    name: string,
    postCode: string,
}
