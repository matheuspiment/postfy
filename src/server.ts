/* istanbul ignore file */

import { AddressInfo } from 'net'
import app from './app'

const listener = app.listen(process.env.PORT || 3333, () => {
  const { address, port } = listener.address() as AddressInfo
  console.log(`Listening on address ${address === '::' ? 'localhost' : address} and port ${port}`)
})
