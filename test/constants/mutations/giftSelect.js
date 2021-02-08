export const giftSelect = `mutation giftSelect ($input: GiftSelectInput!) {
    giftSelect (input: $input) {
        success
        message
    }
}
`
export const giftSelectVariables = {
  input: {
    giftId: '',
    addressId: '',
    products: [
      {
        title: 'Celular Samsung Galaxy S10 Plus 2019 Liberado 4g 128gb 8gb',
        price: 55000,
        meliSellerId: '452287402',
        pictures: [
          'http://mla-s1-p.mlstatic.com/927963-MLA33002241399_112019-O.jpg',
          'http://mla-s1-p.mlstatic.com/602681-MLA33002243869_112019-O.jpg',
          'http://mla-s1-p.mlstatic.com/914705-MLA32934160118_112019-O.jpg',
          'http://mla-s1-p.mlstatic.com/965643-MLA32934143477_112019-O.jpg',
          'http://mla-s1-p.mlstatic.com/622760-MLA33002236939_112019-O.jpg',
          'http://mla-s1-p.mlstatic.com/919072-MLA31754907194_082019-O.jpg',
          'http://mla-s1-p.mlstatic.com/906551-MLA31754924546_082019-O.jpg'
        ],
        meliCategoryId: 'MLA1055',
        meliProductId: 'MLA807314442',
        warranty: 'Garantía de fábrica: 12 meses',
        attributes: [
          {
            meliId: 'ADDITIONAL_INFO_REQUIRED',
            name: 'Información adicional requerida',
            meliValueId: '7435894',
            valueName: 'Tiene número de serie'
          },
          {
            meliId: 'BATTERY_CAPACITY',
            name: 'Capacidad de la batería',
            meliValueId: '902349',
            valueName: '4100 mAh'
          },
          {
            meliId: 'DEPTH',
            name: 'Profundidad',
            meliValueId: '6850489',
            valueName: '7.8 mm'
          },
          {
            meliId: 'FRONT_CAMERAS_NUMBER',
            name: 'Cantidad de cámaras frontales',
            meliValueId: '7477195',
            valueName: '2'
          },
          {
            meliId: 'MEMORY_CARD_TYPES',
            name: 'Tipos de tarjeta de memoria',
            meliValueId: '7199655',
            valueName: 'microSD'
          },
          {
            meliId: 'OPTICAL_ZOOM',
            name: 'Zoom óptico',
            meliValueId: '1344',
            valueName: '2x'
          },
          {
            meliId: 'WITH_BLUETOOTH',
            name: 'Con Bluetooth',
            meliValueId: '242085',
            valueName: 'Sí'
          }
        ],
        variations: [
          {
            meliId: 'COLOR',
            name: 'Color',
            meliValueId: '6807997',
            valueName: 'Negro prisma'
          }
        ]
      }
    ]
  }
}
