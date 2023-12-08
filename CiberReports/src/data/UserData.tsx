import { UUID } from "crypto"

export type UserData = {
    id: UUID,
    role: string,
    email: string,
}