import { Test } from '@nestjs/testing';
import { UserRepository } from '../user/user.repository';
import { ParentRepository } from '../parent/parent.repository';
import { AllowedCreateMemberType } from '../user/user.enum';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SitterRepository } from '../sitter/sitter.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';

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
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '30000s' },
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useFactory: mockRepository,
        },
        {
          provide: ParentRepository,
          useFactory: mockRepository,
        },
        {
          provide: SitterRepository,
          useFactory: mockRepository,
        },
      ],
    }).compile();

    authService = await moduleRef.get<AuthService>(AuthService);
    authController = await moduleRef.get<AuthController>(AuthController);

    parentRepository = await moduleRef.get<ParentRepository>(ParentRepository);
    userRepository = await moduleRef.get<UserRepository>(UserRepository);
  });

  afterAll(async () => {});

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
  describe('auth signup', () => {
    it('create parent user', async () => {
      parentRepository.createUser.mockResolvedValue('Create Parent User');

      expect(parentRepository.createUser).not.toHaveBeenCalled();
      await authService.signup(signupTestData);

      expect(parentRepository.createUser).toHaveBeenCalled();
      expect(userRepository.createUser).toHaveBeenCalled();
    });
  });
  describe('auth login', () => {
    it('login user', async () => {
      const { username, password } = signupTestData;
      const login = await authService.login({ username, password });

      expect(login).toHaveProperty('access_token');
    });
  });
});
