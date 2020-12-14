import { forwardRef } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ParentRepository } from '../parent/parent.repository';
import { AllowedCreateMemberType } from '../user/user.enum';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const mockRepository = () => ({
  createUser: jest.fn(),
});

describe('AuthService', () => {
  let authService;
  let authController;

  let userRepository;
  let parentRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        authService,
        {
          provide: parentRepository,
          useFactory: mockRepository,
        },
      ],
    }).compile();

    authService = await moduleRef.get<AuthService>(AuthService);
    authController = await moduleRef.get<AuthController>(AuthController);

    parentRepository = await moduleRef.get<ParentRepository>(ParentRepository);
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
      parentRepository.createUser.mockResolvedValue('Create Parent User');

      await authService.signup(signupTestData);

      expect(parentRepository.createUser).toHaveBeenCalled();
    });
  });
});
