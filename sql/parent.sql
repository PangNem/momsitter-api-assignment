CREATE TABLE Parent
(
    `회원번호`           INT            NOT NULL    AUTO_INCREMENT COMMENT 'user_id', 
    `케어를 원하는 아이 나이`  INT            NOT NULL    COMMENT 'desired_baby_age', 
    `신청 내용`          VARCHAR(45)    NOT NULL    COMMENT 'request_infomation', 
    PRIMARY KEY (회원번호)
);

ALTER TABLE Parent
    ADD CONSTRAINT FK_Parent_회원번호_User_회원번호 FOREIGN KEY (회원번호)
        REFERENCES User (회원번호) ON DELETE RESTRICT ON UPDATE RESTRICT;