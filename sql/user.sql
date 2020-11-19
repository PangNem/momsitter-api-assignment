CREATE TABLE User
(
    `회원번호`   INT                                NOT NULL    AUTO_INCREMENT COMMENT 'id', 
    `이름`     VARCHAR(45)                        NOT NULL    COMMENT 'name', 
    `생년월일`   DATE                               NOT NULL    COMMENT 'birth', 
    `성별`     VARCHAR(45)                        NOT NULL    COMMENT 'gender', 
    `아이디`    VARCHAR(45)                        NOT NULL    COMMENT 'username', 
    `비밀번호`   VARCHAR(45)                        NOT NULL    COMMENT 'password', 
    `이메일`    VARCHAR(45)                        NOT NULL    COMMENT 'email', 
    `멤버 타입`  ENUM("sitter", "parent", "all")    NOT NULL    COMMENT 'member_type', 
    PRIMARY KEY (회원번호)
);