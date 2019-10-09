/* eslint-disable @typescript-eslint/camelcase */

import request from 'supertest'
import moxios from 'moxios'

import app from '../../../src/app'

describe('CityController', () => {
  beforeEach(function () {
    moxios.install()
  })

  afterEach(function () {
    moxios.uninstall()
  })

  describe('search', () => {
    it('should return the cities when the request is mada with valid args', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: {
            predictions: [
              {
                description: 'Victoria, BC, Canadá',
                id: 'd5892cffd777f0252b94ab2651fea7123d2aa34a',
                matched_substrings: [
                  {
                    length: 4,
                    offset: 0
                  }
                ],
                place_id: 'ChIJcWGw3Ytzj1QR7Ui7HnTz6Dg',
                reference: 'ChIJcWGw3Ytzj1QR7Ui7HnTz6Dg',
                structured_formatting: {
                  main_text: 'Victoria',
                  main_text_matched_substrings: [
                    {
                      length: 4,
                      offset: 0
                    }
                  ],
                  secondary_text: 'BC, Canadá'
                },
                terms: [
                  {
                    offset: 0,
                    value: 'Victoria'
                  },
                  {
                    offset: 10,
                    value: 'BC'
                  },
                  {
                    offset: 14,
                    value: 'Canadá'
                  }
                ],
                types: [
                  'locality',
                  'political',
                  'geocode'
                ]
              },
              {
                description: 'Victorville, CA, EUA',
                id: 'dd296d3fde2a539b9279cdd817c01183f69d07a7',
                matched_substrings: [
                  {
                    length: 4,
                    offset: 0
                  }
                ],
                place_id: 'ChIJedLdY1pkw4ARdjT0JVkRlQ0',
                reference: 'ChIJedLdY1pkw4ARdjT0JVkRlQ0',
                structured_formatting: {
                  main_text: 'Victorville',
                  main_text_matched_substrings: [
                    {
                      length: 4,
                      offset: 0
                    }
                  ],
                  secondary_text: 'CA, EUA'
                },
                terms: [
                  {
                    offset: 0,
                    value: 'Victorville'
                  },
                  {
                    offset: 13,
                    value: 'CA'
                  },
                  {
                    offset: 17,
                    value: 'EUA'
                  }
                ],
                types: [
                  'locality',
                  'political',
                  'geocode'
                ]
              }
            ]
          }
        })
      })

      const response = await request(app)
        .get('/cities?search=Vict')

      expect(response.body.cities).toHaveLength(2)
    })

    it('should return an error when the google maps api request return an error message', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: {
            error_message: 'You have exceeded your daily request quota for this API.'
          }
        })
      })

      const response = await request(app)
        .get('/cities?search=anycity')

      expect(response.status).toBe(400)
    })

    it('should not return the cities if the search string is invalid', async () => {
      const response = await request(app)
        .get('/cities?search=')

      expect(response.status).toBe(400)
    })
  })
})
