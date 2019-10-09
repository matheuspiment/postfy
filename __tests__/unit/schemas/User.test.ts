import bcrypt from 'bcryptjs'

describe('User', () => {
  it('should encrypt user password', async () => {
    const hash = await bcrypt.hash('123456', 8)

    expect(await bcrypt.compare('123456', hash)).toBe(true)
  })
})
