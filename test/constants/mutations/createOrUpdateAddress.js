export const createOrUpdateAddress = `mutation createOrUpdateAddress ($input: AddressInput) {
    createOrUpdateAddress (input: $input) {
        success
        message
    }
}`

export const createOrUpdateAddressVariables = {
  input: {
    street: 'Isabel Funes',
    number: '650',
    description: 'Casa con puerta y ventana',
    postalCode: '5000',
    localityId: '',
    name: 'Fede',
    contactPhone: '3512183807'
  }
}
