import { Request, Response } from 'express'
import * as Yup from 'yup'
import axios from 'axios'
import map from 'lodash/map'

import { GoogleMapPrediction } from '../types'
import googleMapsConfig from '../config/googleMaps'

class CityController {
  async search (req: Request, res: Response): Promise<Response> {
    const schema = Yup.string().required()

    if (!(await schema.isValid(req.query.search))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    try {
      const response = await axios.get(googleMapsConfig.placeUrl, {
        params: {
          input: req.query.search,
          types: '(cities)',
          language: 'es_US',
          key: process.env.GOOGLE_MAPS_API_KEY
        }
      })

      if (response.data.error_message) {
        return res.status(400).json({ error: response.data.error_message })
      }

      const normalizedCities = map(
        response.data.predictions,
        (prediction: GoogleMapPrediction) => prediction.description
      )

      return res.status(200).json({ cities: normalizedCities })
    } catch (error) {
      return res.status(400).json({ error: 'Unable to search cities' })
    }
  }
}

export default new CityController()
