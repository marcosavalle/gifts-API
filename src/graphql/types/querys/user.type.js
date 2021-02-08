export const user = `
type User {
  id: ID
  name: String
  lastName: String
  email: String
  phone: String
  address: [Address]
  avatarUrl: String
  giftSent: [Gift]
  giftReceived: [Gift]
  points: Int
}
`
