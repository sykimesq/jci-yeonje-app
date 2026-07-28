-- ============================================================
-- 연제JC 회원수첩 - 시드 데이터 (2026년)
-- ============================================================

-- 1. 연도
INSERT INTO years (year, slogan, is_current) VALUES
  (2026, '멈추지 않는 가치, 지키는 것이 혁신이다', true);

-- 2. 임원 직책
INSERT INTO executive_positions (year_id, position_name, member_name, member_hanja, order_index)
SELECT id, '회장', '김병훈', '金炳訓', 1 FROM years WHERE year = 2026
UNION ALL SELECT id, '직전회장', '정성규', '鄭成圭', 2 FROM years WHERE year = 2026
UNION ALL SELECT id, '내무부회장', '조용기', '趙容淇', 3 FROM years WHERE year = 2026
UNION ALL SELECT id, '외무부회장', '장세영', '張世榮', 4 FROM years WHERE year = 2026
UNION ALL SELECT id, '감사', '권석호', '權奭浩', 5 FROM years WHERE year = 2026
UNION ALL SELECT id, '감사', '이현주', NULL, 6 FROM years WHERE year = 2026
UNION ALL SELECT id, '운영위원', '김기준', '金技俊', 7 FROM years WHERE year = 2026
UNION ALL SELECT id, '기획위원', '김성윤B', NULL, 8 FROM years WHERE year = 2026
UNION ALL SELECT id, '내무이사', '천자선', NULL, 9 FROM years WHERE year = 2026
UNION ALL SELECT id, '특우회담당이사', '박민', '朴民', 10 FROM years WHERE year = 2026
UNION ALL SELECT id, '외무이사', '김효권', '金孝權', 11 FROM years WHERE year = 2026
UNION ALL SELECT id, '홍보이사', '이제선', '李濟銑', 12 FROM years WHERE year = 2026
UNION ALL SELECT id, '총무이사', '유형석', '劉炯碩', 13 FROM years WHERE year = 2026
UNION ALL SELECT id, '사무국장', '김종현', '金鍾玹', 14 FROM years WHERE year = 2026
UNION ALL SELECT id, '재정이사', '배기현', '裵起賢', 15 FROM years WHERE year = 2026
UNION ALL SELECT id, '회원확충분과위원장', '김성윤A', NULL, 16 FROM years WHERE year = 2026
UNION ALL SELECT id, '지역사회개발분과위원장', '김성수', '金性洙', 17 FROM years WHERE year = 2026;

-- 3. 분과위원회
INSERT INTO committees (year_id, name, chairperson, members, order_index)
SELECT id, '회원확충분과위원회', '김성윤A',
  ARRAY['조용기','이현주','정은택','박상곤','김성윤b','박민','안상우','천자선','박봉규','이제선','유형석','박창민','유창우'],
  1 FROM years WHERE year = 2026
UNION ALL SELECT id, '지역사회개발분과위원회', '김성수',
  ARRAY['정성규','장세영','권석호','이도경','윤광수','김효권','김기준','김종현','김현규','정소라','배기현','전재우'],
  2 FROM years WHERE year = 2026;

-- 4. 정회원
INSERT INTO members (year_id, name, name_hanja, name_english, birth_date, phone, address, workplace, position_in_company, jc_roles, jc_awards, member_type, order_index)
SELECT id, '김병훈', '金炳訓', 'Kim Byoung Hun', '1983.09.17', NULL,
  '진구 백양순환로 115번길 6-13 102호', '보람상조', '마케팅본부장',
  ARRAY['2017년 입회','2018년 사무차장','2019년 국제관계분과위원장','2020년 감사','2021년 홍보이사','2022년 부산지구JC 국제관계이사','2023년 내무이사','2024년 연수이사','2025년 내무부회장','2026년 회장'],
  ARRAY['2018년 국제관계우호증진 공로패','2019년 최우수분과위원장상','2020년 연제구청장상','2021년 연제구의회의장상','2023년 연제구청장상'],
  'regular'::member_type, 1 FROM years WHERE year = 2026
UNION ALL SELECT id, '정성규', '鄭成圭', 'Jung Sung Kyu', '1980.09.06', '010-9232-3711',
  '동래구 중앙대로1335번길 77 문화빌딩', NULL, NULL,
  ARRAY['직전회장'],
  NULL, 'regular'::member_type, 2 FROM years WHERE year = 2026
UNION ALL SELECT id, '조용기', '趙容淇', 'Cho Yong Ki', '1981.10.16', '010-8222-8522',
  '남구 수영로269 5층', 'MetLife금융', '부지점장',
  ARRAY['내무부회장'],
  NULL, 'regular'::member_type, 3 FROM years WHERE year = 2026
UNION ALL SELECT id, '장세영', '張世榮', 'Jang Se Yeong', '1989.10.16', '010-9245-2316',
  '부산진구 전포대로 181, 도시철도 전포역 13호', '주식회사 진정무', NULL,
  ARRAY['외무부회장'],
  NULL, 'regular'::member_type, 4 FROM years WHERE year = 2026
UNION ALL SELECT id, '이현주', NULL, 'Lee Hyun Ju', '1983.07.21', NULL, NULL, NULL, NULL,
  ARRAY['감사'],
  NULL, 'regular'::member_type, 5 FROM years WHERE year = 2026
UNION ALL SELECT id, '권석호', '權奭浩', 'Kwon Suk Ho', '1983.02.26', '010-2848-0013',
  '연제구 해맞이로 85, 1층 린나이대리점', '린나이 우진ENG유통', '대표',
  ARRAY['감사'],
  NULL, 'regular'::member_type, 6 FROM years WHERE year = 2026
UNION ALL SELECT id, '이도경', '李到暻', 'Lee Do Kyung', '1980.08.30', '010-9335-7698',
  '진구 동평로 368', '양정꽃화원,대월기획', '대표',
  ARRAY['특별회원'],
  NULL, 'regular'::member_type, 7 FROM years WHERE year = 2026
UNION ALL SELECT id, '윤광수', '尹光洙', 'Yun Kwang Soo', '1980.01.07', '010-3584-5946',
  '동구 충장대로 334', '(주)동방허치슨', '대표이사',
  ARRAY['특별회원'],
  NULL, 'regular'::member_type, 8 FROM years WHERE year = 2026
UNION ALL SELECT id, '정은택', '鄭銀澤', 'Jeong Eun Taek', '1980.01.17', '010-8522-5992',
  '김해시 김해대로 1155-12', '해동목재', '대표',
  ARRAY['특별회원'],
  NULL, 'regular'::member_type, 9 FROM years WHERE year = 2026
UNION ALL SELECT id, '박상곤', '朴相坤', 'Park Sang Gon', '1982.10.14', NULL,
  '부산진구 백양순환로 132', '(주)거림산업', '대표이사',
  NULL, NULL, 'regular'::member_type, 10 FROM years WHERE year = 2026
UNION ALL SELECT id, '김효권', '金孝權', 'Kim Hyo Gwon', '1984.02.08', '010-2881-2475',
  '해운대구 센텀중앙로48, 903호', '(주)DB금융서비스', NULL,
  ARRAY['외무이사'],
  NULL, 'regular'::member_type, 11 FROM years WHERE year = 2026
UNION ALL SELECT id, '김기준', '金技俊', 'Kim Gi Jun', '1988.07.08', '010-4859-0777',
  '연제구 연제로 2', '연제구의회, ㈜압도바이오텍', '의원, 대표이사',
  ARRAY['운영위원'],
  NULL, 'regular'::member_type, 12 FROM years WHERE year = 2026
UNION ALL SELECT id, '김종현', '金鍾玹', 'Kim Jong Hyun', '1983.09.01', '010-7158-1729',
  '금정구 기찰로6 1층', '에이스OA', '대표',
  ARRAY['사무국장'],
  NULL, 'regular'::member_type, 13 FROM years WHERE year = 2026
UNION ALL SELECT id, '김현규', '金賢規', 'Kim Hyeon Kyu', '1989.08.27', '010-9333-3497',
  NULL, '연제구의회', '의원',
  ARRAY['지역사회개발분과위원'],
  NULL, 'regular'::member_type, 14 FROM years WHERE year = 2026
UNION ALL SELECT id, '박민', '朴民', 'Park Min', '1983.09.24', '010-4184-0924',
  '서구 까치고개로197번길 9 304호', '보상손해사정', '손해사정사',
  ARRAY['특우회담당이사'],
  NULL, 'regular'::member_type, 15 FROM years WHERE year = 2026
UNION ALL SELECT id, '안상우', NULL, 'Ahn Sang Woo', '1983.04.14', NULL, NULL, NULL, NULL,
  NULL, NULL, 'regular'::member_type, 16 FROM years WHERE year = 2026
UNION ALL SELECT id, '천자선', NULL, 'Chun Jasun', '1983.11.06', NULL, NULL, NULL, NULL,
  ARRAY['내무이사'],
  NULL, 'regular'::member_type, 17 FROM years WHERE year = 2026
UNION ALL SELECT id, '정소라', NULL, 'Jeong Sora', '1983.07.21', NULL, NULL, NULL, NULL,
  NULL, NULL, 'regular'::member_type, 18 FROM years WHERE year = 2026
UNION ALL SELECT id, '박봉규', '朴奉圭', 'Park Bong Kyu', '1981.12.13', '010-3844-8118',
  '부산진구 당감동 109-4 금호그랜드타운', '화랑체육관', '관장',
  ARRAY['회원확충분과위원'],
  NULL, 'regular'::member_type, 19 FROM years WHERE year = 2026
UNION ALL SELECT id, '박창민', '朴昶玟', 'Park Chang Min', '1991.08.16', '010-8028-0816',
  '연제구 중앙대로 1076번길 18 가동 605호', 'M인테리어필름', '팀장',
  ARRAY['회원확충분과위원'],
  NULL, 'regular'::member_type, 20 FROM years WHERE year = 2026
UNION ALL SELECT id, '이제선', '李濟銑', 'Lee Je Seon', '1988.03.22', '010-8972-7051',
  '연제구 연산동 587-8외 1필지', '(주)미정테크', '대표',
  ARRAY['홍보이사'],
  NULL, 'regular'::member_type, 21 FROM years WHERE year = 2026
UNION ALL SELECT id, '배기현', '裵起賢', 'Bae Gi Hyun', '1987.02.15', '010-9966-0087',
  '부산 사상구 새벽로131 감전동유통상가 7동124호', '케이알페인트', '대표',
  ARRAY['재정이사'],
  NULL, 'regular'::member_type, 22 FROM years WHERE year = 2026
UNION ALL SELECT id, '유형석', '劉炯碩', 'Yoo Hyung Seuk', '1988.12.21', '010-4844-7795',
  '해운대구 해운대로177번길 10-15', '(주)비포인트디자인그룹', '상무이사',
  ARRAY['총무이사'],
  NULL, 'regular'::member_type, 23 FROM years WHERE year = 2026
UNION ALL SELECT id, '전재우', NULL, 'Jeon Jae Woo', '1996.07.18', NULL, NULL, NULL, NULL,
  NULL, NULL, 'regular'::member_type, 24 FROM years WHERE year = 2026
UNION ALL SELECT id, '유창우', NULL, 'Ryu Chang Woo', '1996.09.25', NULL, NULL, NULL, NULL,
  NULL, NULL, 'regular'::member_type, 25 FROM years WHERE year = 2026
UNION ALL SELECT id, '김성수', '金性洙', 'Kim Sung Su', '1979.11.17', '010-4857-2717',
  '진구 부전동 522-15', '들녘숯불갈비', '상무',
  ARRAY['지역사회개발분과위원장'],
  NULL, 'regular'::member_type, 26 FROM years WHERE year = 2026
UNION ALL SELECT id, '양수호', '楊琇皓', 'Yang Soo Ho', '1980.11.13', '010-3848-4834',
  '수영로 298 산암빌딩 10층', '더존케어메디컬', '대표이사',
  NULL, NULL, 'regular'::member_type, 27 FROM years WHERE year = 2026;

-- 5. 역대회장
INSERT INTO past_presidents (generation, name, name_hanja, term_years, is_deceased, order_index) VALUES
  (1, '황장량', '黃長良', '79~80', false, 1),
  (2, '신재한', '申再漢', '1981', true, 2),
  (3, '이용조', '李龍祚', '1982', false, 3),
  (4, '김영준', '金榮俊', '1983', true, 4),
  (5, '이해옥', '李海鈺', '1984', false, 5),
  (6, '박성영', '朴成永', '1985', false, 6),
  (7, '이항우', '李項雨', '1986', true, 7),
  (8, '박두경', '朴斗敬', '1987', false, 8),
  (9, '김대성', '金大星', '1988', false, 9),
  (10, '김중곤', '金重坤', '1989', false, 10),
  (11, '서이복', '徐利福', '1990', false, 11),
  (12, '심덕군', '沈德君', '1991', false, 12),
  (13, '오준영', '吳俊映', '1992', false, 13),
  (14, '유덕규', '兪德圭', '1993', false, 14),
  (15, '김용술', '金龍述', '1994', false, 15),
  (16, '이주권', '李柱權', '1995', false, 16),
  (17, '신상해', '申相海', '1996', false, 17),
  (18, '윤진섭', '尹進燮', '1997', false, 18),
  (19, '강재경', '姜在京', '1998', false, 19),
  (20, '전홍대', '田洪大', '1999', false, 20),
  (21, '박현철', '朴賢哲', '2000', false, 21),
  (22, '라순원', '羅淳元', '2001', false, 22),
  (23, '안한기', '安漢琪', '2002', false, 23),
  (24, '고두현', '高斗鉉', '2003', false, 24),
  (25, '정진현', '鄭鎭鉉', '2004', false, 25),
  (26, '이양걸', '李亮杰', '2005', false, 26),
  (27, '문정의', '文定義', '2006', false, 27),
  (28, '지광문', '池光文', '2007', false, 28),
  (29, '안도호', '安度鎬', '2008', false, 29),
  (30, '문준삼', '文俊杉', '2009', false, 30),
  (31, '박정민', '朴正敏', '2010', false, 31),
  (32, '안병직', '安炳稷', '2011', false, 32),
  (33, '채형준', '蔡亨埈', '2012', false, 33),
  (34, '강정원', '姜丁元', '2013', false, 34),
  (35, '김재홍', '金宰弘', '2014', false, 35),
  (36, '윤광수', '尹光洙', '2015', false, 36),
  (37, '김성수', '金誠洙', '2016', false, 37),
  (38, '김태형', '金泰亨', '2017', false, 38),
  (39, '윤화춘', '尹華春', '2018', false, 39),
  (40, '권택우', '權宅宇', '2019', false, 40),
  (41, '김성윤', '金聖倫', '2020', false, 41),
  (42, '정은택', '鄭銀澤', '2021', false, 42),
  (43, '김기준', '金技俊', '2022', false, 43),
  (44, '김성윤', '金成允', '2023', false, 44),
  (45, '조용기', '趙容淇', '2024', false, 45),
  (46, '정성규', '鄭成圭', '2025', false, 46),
  (47, '김병훈', '金炳訓', '2026', false, 47);

-- 6. 특우회원
INSERT INTO members (year_id, name, name_hanja, birth_date, phone, address, workplace, position_in_company, member_type, order_index)
SELECT id, '지광문', '池光文', '1968.07.04', NULL, NULL, NULL, NULL, 'special'::member_type, 1 FROM years WHERE year = 2026
 UNION ALL SELECT id, '정은선', '鄭恩先', '1970.09.19', '010-9597-0404',
 '동구 중앙대로 498', 'ANG 인테리어 주문쇼파', '대표', 'special'::member_type, 2 FROM years WHERE year = 2026
 UNION ALL SELECT id, '황장량', '黃長良', '1941.01.17', '010-3586-5434',
 '함안군 법수면 윤외공단길 26-96', '수성산업(주)', '대표이사', 'honorary'::member_type, 3 FROM years WHERE year = 2026
 UNION ALL SELECT id, '안태정', '安泰湞', '1941.02.25', '010-3883-5058',
 '거제시 능포로2길 61. 늘그린모텔', '한일빌딩', '대표', 'honorary'::member_type, 4 FROM years WHERE year = 2026
 UNION ALL SELECT id, '심덕진', '沈德鎭', '1940.09.23', '010-4786-6166',
 '진구 범천1동 839-28 신영B/D 4층', '(주)천지기술단, (주)교통환경연구원, (주)두원', '회장', 'honorary'::member_type, 5 FROM years WHERE year = 2026
 UNION ALL SELECT id, '노명기', '魯明基', '1943.02.19', '010-3870-0641', NULL, NULL, NULL, 'honorary'::member_type, 6 FROM years WHERE year = 2026
 UNION ALL SELECT id, '감건평', '甘建平', '1945.12.08', '010-9140-4441', NULL, '(주)유창ENG', '대표이사', 'honorary'::member_type, 7 FROM years WHERE year = 2026
 UNION ALL SELECT id, '정정기', '鄭正基', '1946.05.22', '010-2548-3791', NULL, NULL, NULL, 'special'::member_type, 8 FROM years WHERE year = 2026
 UNION ALL SELECT id, '이성환', '李成煥', '1947.02.13', NULL,
 '진구 부전로 20번길 28', '이화인재상사', '대표', 'special'::member_type, 9 FROM years WHERE year = 2026
 UNION ALL SELECT id, '공정우', '孔正祐', '1947.07.16', '010-3854-3535',
 '진구 전포1동 서전로 46길 82', '대동금형조각', '대표', 'special'::member_type, 10 FROM years WHERE year = 2026
 UNION ALL SELECT id, '윤위용', NULL, '1947.09.15', '010-3838-0772', NULL, NULL, NULL, 'special'::member_type, 11 FROM years WHERE year = 2026
 UNION ALL SELECT id, '이희철', '李熙鐵', '1950.01.25', '010-3590-1889', NULL, NULL, NULL, 'special'::member_type, 12 FROM years WHERE year = 2026
 UNION ALL SELECT id, '김종철', '金鐘哲', '1950.03.10', '010-3599-8525', NULL, NULL, NULL, 'special'::member_type, 13 FROM years WHERE year = 2026
 UNION ALL SELECT id, '이광재', '李光載', '1950.04.25', '010-3832-0005',
 '동구 범일로 120(범일동)', '광명당', '대표', 'special'::member_type, 14 FROM years WHERE year = 2026
 UNION ALL SELECT id, '이관직', NULL, '1950.07.18', NULL, NULL, NULL, NULL, 'special'::member_type, 15 FROM years WHERE year = 2026
 UNION ALL SELECT id, '김중곤', '金重坤', '1951.04.11', '010-3599-0025', NULL, '(주)세원', '사장', 'special'::member_type, 16 FROM years WHERE year = 2026
 UNION ALL SELECT id, '배규화', '裵圭和', '1952.05.28', '010-3844-9333', NULL, '라뽀아르 수제 디저트 카페', NULL, 'special'::member_type, 17 FROM years WHERE year = 2026
 UNION ALL SELECT id, '송우근', '宋雨瑾', '1953.10.05', '010-3589-9181',
 '연제구 반송로58 농협 연산동지점 별관', '(사)부산농협동인회', '역대회장', 'special'::member_type, 18 FROM years WHERE year = 2026
 UNION ALL SELECT id, '김대성', '金大星', '1953.10.20', '010-3855-1190',
 '김해시 한림면 김해대로 1538번길 46', '페어필드 바이 메리어트 부산송도 (주)케이알', '회장', 'special'::member_type, 19 FROM years WHERE year = 2026
 UNION ALL SELECT id, '정헌용', '鄭憲容', '1954.08.12', NULL, NULL, NULL, NULL, 'special'::member_type, 20 FROM years WHERE year = 2026
 UNION ALL SELECT id, '서이복', '徐利福', '1955.03.12', '010-9597-4111',
 '사상구 감전천로 215 비엠피코리아(주)', '(주)비엠피코리아', '대표이사', 'special'::member_type, 21 FROM years WHERE year = 2026
 UNION ALL SELECT id, '유덕규', '兪德圭', '1955.05.15', '010-3891-6889',
 '진구 부전동 535-10 KH마이우스 1908호', '(주)구하,(주)KH ENC,(주)KH산업개발', '대표이사', 'special'::member_type, 22 FROM years WHERE year = 2026
 UNION ALL SELECT id, '김용술', '金龍述', '1955.10.23', '010-7511-6576',
 '창원시 의창구 충혼로 91 창원문성대학 4호관 4층', '김해시문화재단이사, 대주회계법인', '실장', 'special'::member_type, 23 FROM years WHERE year = 2026
 UNION ALL SELECT id, '백상렬', '白尙烈', '1955.11.22', '010-3884-9111',
 '동래구 여고로 99-1', '(주)대영', '대표이사', 'special'::member_type, 24 FROM years WHERE year = 2026
 UNION ALL SELECT id, '오정수', '吳正洙', '1955.10.05', NULL, NULL, NULL, NULL, 'special'::member_type, 25 FROM years WHERE year = 2026
 UNION ALL SELECT id, '오준영', '吳俊映', '1956.05.29', NULL, NULL, NULL, NULL, 'special'::member_type, 26 FROM years WHERE year = 2026
 UNION ALL SELECT id, '윤진섭', '尹進燮', '1957.02.25', '010-3862-6556',
 '사상구 백양대로 717', '제일꽃집.제일토목', '설계사', 'special'::member_type, 27 FROM years WHERE year = 2026
 UNION ALL SELECT id, '송치업', '宋致業', '1957.03.25', '010-3833-2255',
 '기장군 장안읍 길천길 95 (길천리)', '(주)원앤투노블', '대표이사', 'special'::member_type, 28 FROM years WHERE year = 2026
 UNION ALL SELECT id, '박현수', NULL, '1958.08.14', '010-3878-6066',
 '진구 백양순환로 132(주)거림케미칼', '(주)거림케미칼', '대표', 'special'::member_type, 29 FROM years WHERE year = 2026
 UNION ALL SELECT id, '최황', '崔滉', '1959.03.09', '010-4588-7990',
 '동구 범일로 102번길 20, 4F(범일동, 동화빌딩)', '(주)파인팔래스', '대표이사', 'special'::member_type, 30 FROM years WHERE year = 2026
 UNION ALL SELECT id, '김재만', '金在滿', '1959.09.30', NULL, NULL, NULL, NULL, 'special'::member_type, 31 FROM years WHERE year = 2026
 UNION ALL SELECT id, '강재경', '姜在京', '1960.05.21', '010-8505-8119',
 '경남 양산시 삼호로 106, 도시정원', '(주)노블리아 산업개발', '대표이사', 'special'::member_type, 32 FROM years WHERE year = 2026
 UNION ALL SELECT id, '심술진', NULL, '1960.04.12', NULL, NULL, NULL, NULL, 'special'::member_type, 33 FROM years WHERE year = 2026
 UNION ALL SELECT id, '김대영', '金大榮', '1961.02.14', '010-3874-1100',
 '강서구 낙동남로 483번길 42 (녹산동)', '(주)케이알테크', '대표이사', 'special'::member_type, 34 FROM years WHERE year = 2026
 UNION ALL SELECT id, '박현철', '朴賢哲', '1962.02.22', NULL, NULL, NULL, NULL, 'special'::member_type, 35 FROM years WHERE year = 2026
 UNION ALL SELECT id, '정진현', '鄭鎭鉉', '1964.03.03', '010-3832-2504',
 '김해시 한림면 퇴래리 80-4', '명진', '대표', 'special'::member_type, 36 FROM years WHERE year = 2026
 UNION ALL SELECT id, '전홍대', '田洪大', '1964.04.07', '010-9770-8100',
 '부산진구 신천대로62번길2 KH마이우스 1102호', '중흥토건', NULL, 'special'::member_type, 37 FROM years WHERE year = 2026
 UNION ALL SELECT id, '안한기', '安漢琪', '1964.05.06', '010-3592-7347',
 '사하구 낙동대로 386 (당리동)1', '한영모터스', '대표', 'special'::member_type, 38 FROM years WHERE year = 2026
 UNION ALL SELECT id, '라순원', '羅淳元', '1965.12.11', NULL, NULL, NULL, NULL, 'special'::member_type, 39 FROM years WHERE year = 2026
 UNION ALL SELECT id, '문정의', '文定義', '1967.06.03', '010-5599-9811',
 '연제구 과정로 157 (연산동)', '삼영.동하빌딩', '대표', 'special'::member_type, 40 FROM years WHERE year = 2026
 UNION ALL SELECT id, '유재일', '劉宰馹', '1967.08.16', '010-3594-3757',
 '충남 아산시 영인면 토정샘로66', '티앤에에스산업(주)', '출하주임', 'special'::member_type, 41 FROM years WHERE year = 2026
 UNION ALL SELECT id, '임채근', '林采根', '1967.02.27', '010-3853-9586', NULL, NULL, NULL, 'junior'::member_type, 42 FROM years WHERE year = 2026
 UNION ALL SELECT id, '박인재', '朴仁在', '1968.08.28', '010-9313-9292', NULL, NULL, NULL, 'special'::member_type, 43 FROM years WHERE year = 2026
 UNION ALL SELECT id, '이양걸', '李亮杰', '1968.11.13', '010-3872-5883',
 '사상구 새벽로 223번길 13 2F', '(주)이노아이엔에프,(주)이노아이디', '대표이사', 'special'::member_type, 44 FROM years WHERE year = 2026
 UNION ALL SELECT id, '고두현', '高斗鉉', '1969.09.09', '010-3831-3995',
 '사상구 가야대로 58 (학장동)', '(주)신진스틸', '대표이사', 'special'::member_type, 45 FROM years WHERE year = 2026
 UNION ALL SELECT id, '최규철', '崔圭哲', '1970.09.15', NULL, NULL, NULL, NULL, 'special'::member_type, 46 FROM years WHERE year = 2026
 UNION ALL SELECT id, '남호연', '南鎬演', '1969.09.01', NULL, NULL, NULL, NULL, 'special'::member_type, 47 FROM years WHERE year = 2026
 UNION ALL SELECT id, '류원기', NULL, '1976.10.18', NULL, NULL, NULL, NULL, 'special'::member_type, 48 FROM years WHERE year = 2026
 UNION ALL SELECT id, '김정호', '金定湖', '1974.06.24', '010-5156-0624',
 '경남 창녕군 서리상촌길 307-7', '영신티알', '안전보건 과장', 'special'::member_type, 49 FROM years WHERE year = 2026
 UNION ALL SELECT id, '김상협', '金相浹', '1975.02.01', '010-3576-3459',
 '연제구 법원로 12 로윈타워 2층', '법무법인 정맥', '변호사', 'special'::member_type, 50 FROM years WHERE year = 2026
 UNION ALL SELECT id, '윤화춘', '尹華春', '1976.02.14', NULL,
 '연제구 중앙대로 1217, 3층(거제동,국제문화센터)', 'MetLife 생명보험', 'FSR', 'special'::member_type, 51 FROM years WHERE year = 2026
 UNION ALL SELECT id, '권은영', NULL, '1977.06.10', NULL, NULL, NULL, NULL, 'special'::member_type, 52 FROM years WHERE year = 2026
 UNION ALL SELECT id, '이병희', '李秉禧', '1978.03.04', '010-7185-0005',
 '동래구 미남로 116번길 26-2', '이프로모션', '대표', 'special'::member_type, 53 FROM years WHERE year = 2026
 UNION ALL SELECT id, '김태형', '金泰亨', '1978.08.05', '010-4577-0333',
 '연제구 월드컵대로 144 우전빌딩 2층', '온나라 부동산중개법인', '이사', 'special'::member_type, 54 FROM years WHERE year = 2026
 UNION ALL SELECT id, '김태용', NULL, '1978.09.25', NULL, NULL, NULL, NULL, 'special'::member_type, 55 FROM years WHERE year = 2026
 UNION ALL SELECT id, '권택우', '權宅宇', '1978.10.02', NULL, NULL, NULL, NULL, 'special'::member_type, 56 FROM years WHERE year = 2026
 UNION ALL SELECT id, '이정호', '李正昊', '1979.01.06', '010-8508-9774',
 '부산진구 새싹로 22-1 11층,12층,13층', '루나스카이돔', '대표', 'special'::member_type, 57 FROM years WHERE year = 2026
 UNION ALL SELECT id, '채형준', '蔡亨埈', '1979.01.28', '010-4842-0242',
 '동래구 충렬대로 396', '밝은여행사(모두투어 안락점)', '대표', 'special'::member_type, 58 FROM years WHERE year = 2026
 UNION ALL SELECT id, '강정원', '姜丁元', '1975.12.16', NULL, NULL, NULL, NULL, 'special'::member_type, 59 FROM years WHERE year = 2026;

-- 7. 특우회 역대회장
INSERT INTO special_past_presidents (generation, name, name_hanja, is_deceased, order_index) VALUES
  ('초대', '정윤호', '鄭潤鎬', true, 1),
  ('3대', '양길모', '梁吉模', true, 2),
  ('4대', '심덕진', '沈德鎭', false, 3),
  ('5대', '김창환', '金昌煥', false, 4),
  ('6대', '최재희', '崔宰熙', true, 5),
  ('7대', '황장량', '黃長良', false, 6),
  ('8대', '감건평', '甘建平', false, 7),
  ('9대', '윤위용', '尹瑋容', false, 8),
  ('9대', '이성환', '李成煥', false, 9),
  ('11대', '정문섭', '鄭文燮', false, 10),
  ('12대', '이항우', '李項雨', true, 11),
  ('13·14대', '안태정', '安泰湞', false, 12),
  ('15대', '정정기', '鄭正基', false, 13),
  ('16대', '서정기', '徐正基', false, 14),
  ('17대', '백상렬', '白尙烈', false, 15),
  ('18대', '이희철', '李熙鐵', false, 16),
  ('19대', '김광석', '金光錫', false, 17),
  ('20·21대', '정헌용', '鄭憲容', false, 18),
  ('22·23대', '오정수', '吳正洙', false, 19),
  ('24·25대', '박경수', '朴敬守', false, 20),
  ('26대', '최재희', '崔宰熙', true, 21),
  ('27대', '최남규', '崔南圭', false, 22),
  ('28대', '김철식', '金哲式', false, 23),
  ('29대', '전판현', '全判鉉', false, 24),
  ('30대', '김대영', '金大榮', false, 25),
  ('31대', '김재만', '金在滿', false, 26),
  ('32대', '박현철', '朴賢哲', false, 27),
  ('33대', '안한기', '安漢琪', false, 28),
  ('34대', '라순원', '羅淳元', false, 29),
  ('35대', '문정의', '文定義', false, 30),
  ('36대', '정진현', '鄭鎭鉉', false, 31),
  ('37·38대', '남호연', '南鎬演', false, 32),
  ('39대', '지광문', '池光文', false, 33),
  ('40대', '최규철', '崔圭哲', false, 34),
  ('직전회장', '이금숙', '李錦淑', false, 35);

-- 8. 연간일정
INSERT INTO schedules (year_id, month, day, title, description, is_important, order_index)
SELECT id, 1, 0, '정기총회', '2026년 정기총회', true, 1 FROM years WHERE year = 2026
UNION ALL SELECT id, 2, 0, '신년하례회', '2026년 신년하례회', false, 2 FROM years WHERE year = 2026
UNION ALL SELECT id, 3, 0, '정기총회', '제10-14차 정기총회', true, 3 FROM years WHERE year = 2026
UNION ALL SELECT id, 4, 0, '창립기념식', '연제JC 창립 46주년 기념식', true, 4 FROM years WHERE year = 2026
UNION ALL SELECT id, 5, 0, '체육대회', '연제JC 체육대회', false, 5 FROM years WHERE year = 2026
UNION ALL SELECT id, 6, 0, '지구JC 체육대회', '부산지구JC 체육대회', false, 6 FROM years WHERE year = 2026
UNION ALL SELECT id, 7, 0, '하계수련회', '연제JC 하계수련회', false, 7 FROM years WHERE year = 2026
UNION ALL SELECT id, 8, 0, '지구JC 하계수련회', '부산지구JC 하계수련회', false, 8 FROM years WHERE year = 2026
UNION ALL SELECT id, 9, 0, '추석맞이 행사', '지역사회 추석맞이 행사', false, 9 FROM years WHERE year = 2026
UNION ALL SELECT id, 10, 0, '창립기념식', '연제JC 창립 47주년 기념식', true, 10 FROM years WHERE year = 2026
UNION ALL SELECT id, 11, 0, '지구JC 체육대회', '부산지구JC 체육대회', false, 11 FROM years WHERE year = 2026
UNION ALL SELECT id, 12, 0, '송년회', '2026년 송년회', false, 12 FROM years WHERE year = 2026;
