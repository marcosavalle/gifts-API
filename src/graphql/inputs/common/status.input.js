export const status = `
input StatusInput {
    id: ID
    name: String
    isMain: Boolean
}

input StatusObjectInput {
    main: StatusInput
    secondary: [StatusInput]
  }
`
