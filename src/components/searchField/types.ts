import { Email } from ".."

type EmailOption = Email &
{
    label: string,
    value: string,
    key: string
}

export type {EmailOption}