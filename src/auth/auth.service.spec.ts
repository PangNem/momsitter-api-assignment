import { Test, TestingModule } from '@nestjs/testing';
import { ParentRepository } from 'src/parent/parent.repository';
import { AllowedCreateMemberType } from 'src/user/user.enum';
import { UserRepository } from 'src/user/user.repository';
import { AuthService } from './auth.service';

const mockRepositoy = {
  createUser: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: UserRepository;
  let parentRepository: ParentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: userRepository, useFactory: mockRepositoy },
        { provide: parentRepository, useFactory: mockRepositoy },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    userRepository = module.get<UserRepository>(UserRepository);
    parentRepository = module.get<ParentRepository>(ParentRepository);
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
      expect(parentRepository.createUser).not.toHaveBeenCalled();
      await service.signup(signupTestData);
      expect(parentRepository.createUser).toHaveBeenCalled();
    });
  });
});
