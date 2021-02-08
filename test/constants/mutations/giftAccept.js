export const giftAccept = `mutation giftAccept ($input: GiftAcceptInput!) {
    giftAccept (input: $input) {
        success
        message
    }
}`
export const giftAcceptVariables = {
  input: {
    giftId: 0,
    accept: true,
    blocked: false
  }
}
