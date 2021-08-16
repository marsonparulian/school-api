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

/**
 * Key - text object represent error messages with param name as key and message as the value (string)
 */
export type ErrorMessages = {
    [key: string]: string
}
