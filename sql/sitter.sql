CREATE TABLE Sitter
(
    `회원번호`             INT            NOT NULL    AUTO_INCREMENT COMMENT 'user_id', 
    `케어 가능한 아이 최소 연령`  INT            NOT NULL    COMMENT 'careable_baby_age', 
    `자기 소개`            VARCHAR(45)    NOT NULL    COMMENT 'bio', 
    PRIMARY KEY (회원번호)
);

ALTER TABLE Sitter
    ADD CONSTRAINT FK_Sitter_회원번호_User_회원번호 FOREIGN KEY (회원번호)
        REFERENCES User (회원번호) ON DELETE RESTRICT ON UPDATE RESTRICT;