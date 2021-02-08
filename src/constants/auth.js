import { BASE_ENDPOINT } from './base'

export const AUTH_ENDPOINTS = {
  GRANT_ACCESS: `https://auth.mercadolibre.com.ar/authorization?response_type=code`,

  AUTHENTICATED: `${BASE_ENDPOINT}/oauth/token?grant_type=authorization_code`,

  REFRESH_TOKEN: `${BASE_ENDPOINT}/oauth/token?grant_type=refresh_token`,

  USER_INFO: `${BASE_ENDPOINT}/users`
}

export const AUTH_REDIRECTS = {
  localhost: 'http://localhost:3000',
  dev: 'https://dev-meliregalos.netlify.app',
  test: 'https://test-meliregalos.netlify.app',
  prod: 'https://meliregalos.netlify.app'
}
