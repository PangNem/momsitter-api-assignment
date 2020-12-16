import { Test } from '@nestjs/testing';
import { ParentRepository } from '../parent/parent.repository';
import { SitterRepository } from '../sitter/sitter.repository';
import { UserController } from './user.controller';
import { AllowedCreateMemberType, MemberType } from './user.enum';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const userRepositoryMock = () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  findOneQuery: jest.fn(),
  findSitter: jest.fn(),
  findParent: jest.fn(),
  findAll: jest.fn(),
  updateProfile: jest.fn(),
});

const memberRepositoryMock = () => ({
  createUser: jest.fn(),
  updateProfile: jest.fn(),
});

describe('UserService', () => {
  let userService;
  let userRepository;
  let sitterRepository;
  let parentRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: userRepositoryMock,
        },
        {
          provide: SitterRepository,
          useFactory: memberRepositoryMock,
        },
        {
          provide: ParentRepository,
          useFactory: memberRepositoryMock,
        },
      ],
    }).compile();

    userService = await moduleRef.get<UserService>(UserService);
    userRepository = await moduleRef.get<UserRepository>(UserRepository);
    sitterRepository = await moduleRef.get<SitterRepository>(SitterRepository);
    parentRepository = await moduleRef.get<ParentRepository>(ParentRepository);
  });

  const baseUserData = {
    name: '박시터',
    birth: 19980206,
    gender: '여',
    username: 'sitter1234',
    password: 'A123456789',
    email: 'wonderfulPark0206@gmail.com',
    member_type: MemberType.PARENT,
    desired_baby_age: 5,
    request_infomation: '잘 부탁 드립니다.',
  };

  describe('getUserProfile', () => {
    it('return parent user profile', async () => {
      userRepository.findParent.mockResolvedValue('parent profile');

      expect(userRepository.findParent).not.toHaveBeenCalled();
      const profile = await userService.getUserProfile(baseUserData);

      expect(userRepository.findParent).toHaveBeenCalled();
      expect(profile).toEqual('parent profile');
    });
  });

  describe('updateUserProfile', () => {
    it('update user profile and return', async () => {
      const updateTestData = {
        name: 'profile 업데이트2',
        birth: 20010720,
        request_information: 'request',
        desired_baby_age: 3,
        request_infomation: '아기 조심히 다뤄주세요',
      };
      parentRepository.updateProfile.mockResolvedValue('update profile');

      expect(parentRepository.updateProfile).not.toHaveBeenCalled();
      await userService.updateProfile(baseUserData, updateTestData);

      expect(parentRepository.updateProfile).toHaveBeenCalled();
      expect(userRepository.findParent).toHaveBeenCalled();
    });
  });

  describe('additionalRegister', () => {
    it('parent member create sitter membmer', async () => {
      const data = {
        careable_baby_age: 2,
        self_introduction: '안녕하세요',
      };
      sitterRepository.createUser.mockResolvedValue('new sitter user');

      expect(sitterRepository.createUser).not.toHaveBeenCalled();
      await userService.additionalRegister(baseUserData, data);

      expect(sitterRepository.createUser).toHaveBeenCalled();
    });
  });
});
