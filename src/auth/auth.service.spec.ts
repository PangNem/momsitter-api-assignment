import { Test } from '@nestjs/testing';
import { AllowedCreateMemberType } from 'src/user/user.enum';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService;
  let authController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  afterAll(async () => {});

  describe('auth signup', () => {
    it('create parent user', async () => {
      const signupTestData = {
        name: '박시터',
        birth: 19980206,
        gender: '여',
        username: 'sitter1234',
        password: 'A123456789',
        email: 'wonderfulPark0206@gmail.com',
        member_type: AllowedCreateMemberType.PARENT,
        desired_baby_age: 5,
        request_infomation: '잘 부탁 드립니다.',
      };
      jest
        .spyOn(authService, 'auth signup')
        .mockImplementation(() => signupTestData);

      expect(await authController.signup()).toBe(signupTestData);
    });
  });
});
