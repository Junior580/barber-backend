// import AppError from '../../../shared/errors/AppError'

import { InMemoryUserRepository } from '../repositories/InMemory/InMemoryUserRepository'
import { InMemoryUserTokensRepository } from '../repositories/InMemory/InMemoryUserTokensRepository'
import { ResetPasswordService } from './ResetPasswordService'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryUserTokensRepository: InMemoryUserTokensRepository
let resetPasswordService: ResetPasswordService

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryUserTokensRepository = new InMemoryUserTokensRepository()
    resetPasswordService = new ResetPasswordService(
      inMemoryUserRepository,
      inMemoryUserTokensRepository
    )
  })

  it('should be able recover the password using the email', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'user1',
      email: 'user1@email.com',
      password: 'teste123',
    })

    const updatedUser = await inMemoryUserRepository.findOneById(user.id)

    const { token } = await inMemoryUserTokensRepository.generate(user.id)

    await resetPasswordService.execute({ password: '123teste123', token })
    expect(updatedUser?.password).toBe('123teste123')
  })
})
