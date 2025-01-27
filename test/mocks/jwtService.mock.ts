import { JwtService } from '@nestjs/jwt';

export const JwtServiceMock = {
  provide: JwtService,
  useValue: {
    signAsync: jest.fn().mockImplementation((payload) => {
      return Promise.resolve(payload);
    }),
    verifyAsync: jest.fn().mockImplementation((payload) => {
      return Promise.resolve(payload);
    }),
    decode: jest.fn().mockReturnValue({ userId: 1 }),
  },
};
