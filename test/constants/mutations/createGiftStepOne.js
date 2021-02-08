export const createGiftStepOne = `mutation createGiftStepOne ($input: CreateGiftStepOneInput) {
    createGiftStepOne (input: $input) {
        success
        message
        id
    }
}`

export const variablesCreateGiftStepOne = `{
    "input": {
      "senderName": "Marquiños",
      "receiverName": "Micaela"
    }
  }`
