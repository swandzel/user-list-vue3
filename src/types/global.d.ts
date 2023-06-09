export type Id = number
export type First_Name = string
export type Last_Name = string
export type Avatar = string

export interface User {
    id: Id;
    first_name: First_Name;
    last_name: Last_Name;
    avatar: Avatar;
}