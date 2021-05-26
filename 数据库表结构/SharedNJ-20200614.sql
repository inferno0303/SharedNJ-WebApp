
CREATE DATABASE IF NOT EXISTS `shared_nj` DEFAULT CHARACTER SET utf8mb4;
USE `shared_nj`;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for DispatchFee
-- ----------------------------
DROP TABLE IF EXISTS `DispatchFee`;
CREATE TABLE `DispatchFee`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city_start` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city_end` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dispatch_fee` decimal(10, 2) DEFAULT NULL,
  `note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 197 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of DispatchFee
-- ----------------------------
INSERT INTO `DispatchFee` VALUES (1, '南宁', '南宁', 40.00, NULL);
INSERT INTO `DispatchFee` VALUES (2, '南宁', '柳州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (3, '南宁', '桂林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (4, '南宁', '梧州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (5, '南宁', '北海', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (6, '南宁', '防城港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (7, '南宁', '钦州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (8, '南宁', '贵港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (9, '南宁', '玉林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (10, '南宁', '百色', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (11, '南宁', '贺州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (12, '南宁', '河池', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (13, '南宁', '来宾', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (14, '南宁', '崇左', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (15, '柳州', '南宁', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (16, '柳州', '柳州', 40.00, NULL);
INSERT INTO `DispatchFee` VALUES (17, '柳州', '桂林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (18, '柳州', '梧州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (19, '柳州', '北海', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (20, '柳州', '防城港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (21, '柳州', '钦州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (22, '柳州', '贵港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (23, '柳州', '玉林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (24, '柳州', '百色', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (25, '柳州', '贺州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (26, '柳州', '河池', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (27, '柳州', '来宾', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (28, '柳州', '崇左', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (29, '桂林', '南宁', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (30, '桂林', '柳州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (31, '桂林', '桂林', 40.00, NULL);
INSERT INTO `DispatchFee` VALUES (32, '桂林', '梧州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (33, '桂林', '北海', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (34, '桂林', '防城港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (35, '桂林', '钦州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (36, '桂林', '贵港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (37, '桂林', '玉林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (38, '桂林', '百色', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (39, '桂林', '贺州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (40, '桂林', '河池', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (41, '桂林', '来宾', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (42, '桂林', '崇左', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (43, '梧州', '南宁', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (44, '梧州', '柳州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (45, '梧州', '桂林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (46, '梧州', '梧州', 40.00, NULL);
INSERT INTO `DispatchFee` VALUES (47, '梧州', '北海', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (48, '梧州', '防城港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (49, '梧州', '钦州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (50, '梧州', '贵港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (51, '梧州', '玉林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (52, '梧州', '百色', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (53, '梧州', '贺州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (54, '梧州', '河池', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (55, '梧州', '来宾', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (56, '梧州', '崇左', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (57, '北海', '南宁', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (58, '北海', '柳州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (59, '北海', '桂林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (60, '北海', '梧州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (61, '北海', '北海', 40.00, NULL);
INSERT INTO `DispatchFee` VALUES (62, '北海', '防城港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (63, '北海', '钦州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (64, '北海', '贵港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (65, '北海', '玉林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (66, '北海', '百色', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (67, '北海', '贺州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (68, '北海', '河池', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (69, '北海', '来宾', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (70, '北海', '崇左', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (71, '防城港', '南宁', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (72, '防城港', '柳州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (73, '防城港', '桂林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (74, '防城港', '梧州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (75, '防城港', '北海', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (76, '防城港', '防城港', 40.00, NULL);
INSERT INTO `DispatchFee` VALUES (77, '防城港', '钦州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (78, '防城港', '贵港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (79, '防城港', '玉林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (80, '防城港', '百色', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (81, '防城港', '贺州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (82, '防城港', '河池', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (83, '防城港', '来宾', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (84, '防城港', '崇左', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (85, '钦州', '南宁', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (86, '钦州', '柳州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (87, '钦州', '桂林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (88, '钦州', '梧州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (89, '钦州', '北海', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (90, '钦州', '防城港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (91, '钦州', '钦州', 40.00, NULL);
INSERT INTO `DispatchFee` VALUES (92, '钦州', '贵港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (93, '钦州', '玉林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (94, '钦州', '百色', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (95, '钦州', '贺州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (96, '钦州', '河池', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (97, '钦州', '来宾', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (98, '钦州', '崇左', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (99, '贵港', '南宁', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (100, '贵港', '柳州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (101, '贵港', '桂林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (102, '贵港', '梧州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (103, '贵港', '北海', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (104, '贵港', '防城港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (105, '贵港', '钦州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (106, '贵港', '贵港', 40.00, NULL);
INSERT INTO `DispatchFee` VALUES (107, '贵港', '玉林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (108, '贵港', '百色', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (109, '贵港', '贺州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (110, '贵港', '河池', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (111, '贵港', '来宾', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (112, '贵港', '崇左', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (113, '玉林', '南宁', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (114, '玉林', '柳州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (115, '玉林', '桂林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (116, '玉林', '梧州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (117, '玉林', '北海', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (118, '玉林', '防城港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (119, '玉林', '钦州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (120, '玉林', '贵港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (121, '玉林', '玉林', 40.00, NULL);
INSERT INTO `DispatchFee` VALUES (122, '玉林', '百色', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (123, '玉林', '贺州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (124, '玉林', '河池', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (125, '玉林', '来宾', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (126, '玉林', '崇左', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (127, '百色', '南宁', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (128, '百色', '柳州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (129, '百色', '桂林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (130, '百色', '梧州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (131, '百色', '北海', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (132, '百色', '防城港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (133, '百色', '钦州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (134, '百色', '贵港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (135, '百色', '玉林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (136, '百色', '百色', 40.00, NULL);
INSERT INTO `DispatchFee` VALUES (137, '百色', '贺州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (138, '百色', '河池', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (139, '百色', '来宾', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (140, '百色', '崇左', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (141, '贺州', '南宁', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (142, '贺州', '柳州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (143, '贺州', '桂林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (144, '贺州', '梧州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (145, '贺州', '北海', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (146, '贺州', '防城港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (147, '贺州', '钦州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (148, '贺州', '贵港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (149, '贺州', '玉林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (150, '贺州', '百色', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (151, '贺州', '贺州', 40.00, NULL);
INSERT INTO `DispatchFee` VALUES (152, '贺州', '河池', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (153, '贺州', '来宾', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (154, '贺州', '崇左', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (155, '河池', '南宁', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (156, '河池', '柳州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (157, '河池', '桂林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (158, '河池', '梧州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (159, '河池', '北海', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (160, '河池', '防城港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (161, '河池', '钦州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (162, '河池', '贵港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (163, '河池', '玉林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (164, '河池', '百色', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (165, '河池', '贺州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (166, '河池', '河池', 40.00, NULL);
INSERT INTO `DispatchFee` VALUES (167, '河池', '来宾', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (168, '河池', '崇左', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (169, '来宾', '南宁', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (170, '来宾', '柳州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (171, '来宾', '桂林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (172, '来宾', '梧州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (173, '来宾', '北海', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (174, '来宾', '防城港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (175, '来宾', '钦州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (176, '来宾', '贵港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (177, '来宾', '玉林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (178, '来宾', '百色', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (179, '来宾', '贺州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (180, '来宾', '河池', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (181, '来宾', '来宾', 40.00, NULL);
INSERT INTO `DispatchFee` VALUES (182, '来宾', '崇左', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (183, '崇左', '南宁', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (184, '崇左', '柳州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (185, '崇左', '桂林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (186, '崇左', '梧州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (187, '崇左', '北海', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (188, '崇左', '防城港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (189, '崇左', '钦州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (190, '崇左', '贵港', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (191, '崇左', '玉林', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (192, '崇左', '百色', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (193, '崇左', '贺州', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (194, '崇左', '河池', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (195, '崇左', '来宾', 100.00, NULL);
INSERT INTO `DispatchFee` VALUES (196, '崇左', '崇左', 40.00, NULL);

-- ----------------------------
-- Table structure for Machine
-- ----------------------------
DROP TABLE IF EXISTS `Machine`;
CREATE TABLE `Machine`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `machine_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` decimal(10, 2) DEFAULT NULL,
  `machine_function` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `machine_features` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `machine_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Machine
-- ----------------------------
INSERT INTO `Machine` VALUES (1, '多功能大马力履带旋耕机', 2000.00, '开沟，旋耕，起垄，除草，回填', '可原地调头，刀具液压升降，可载人，爬坡能力强', NULL);
INSERT INTO `Machine` VALUES (2, '拓戈手推式微耕机小型松土机', 1029.00, '绿色松土，菜园耕种，田地耕种', '重量轻，体积小，结构简单，操作方便，易于维修，油耗低', NULL);
INSERT INTO `Machine` VALUES (3, '小型新式履带式微旋耕机遥控家用柴油拖拉机旋耕机乘坐式农机', 2650.00, '花圃培栽，果园种植，农田改造，大棚养殖', '远程遥控，实现人机分离。高低速可调配，可以人工驾驶', NULL);
INSERT INTO `Machine` VALUES (4, '微耕机四驱自走式旋耕机柴油松土多功能耕地机小型农机开沟拖拉机', 4325.00, '适合旱地、果园、大棚、菜地，可以耕地、除草、开沟', '此款机器适合旱地旱田，不适合水田使用，使用前请加好机油 ，检测没问题方可启动', NULL);
INSERT INTO `Machine` VALUES (5, '果园管理机多功能农机机械四轮拖拉机404柴油机504四驱农用耕地机', 32500.00, '体型小，可自由穿梭。超大功率，可悬挂旋耕机/打药机/开沟机', '可满足果园、大鹏、平原、丘陵、牧区、菜园的机械化要求，广泛用于各项田间工作', NULL);

-- ----------------------------
-- Table structure for ProductList
-- ----------------------------
DROP TABLE IF EXISTS `ProductList`;
CREATE TABLE `ProductList`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `machine_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `machine_id` int(11) DEFAULT NULL,
  `total_count` int(11) DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `detail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `unit_price` decimal(10, 2) DEFAULT NULL,
  `release_time` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ProductList
-- ----------------------------
INSERT INTO `ProductList` VALUES (17, 'offer001', '微耕机四驱自走式旋耕机柴油松土多功能耕地机小型农机开沟拖拉机', 4, 49, '防城港', '该商品进行促销活动，欢迎各位购买', 2200.00, '2020-05-30 17:21:32');
INSERT INTO `ProductList` VALUES (18, 'offer002', '多功能大马力履带旋耕机', 1, 49, '梧州', '本商品清仓甩卖，望顾客大力抢购', 2900.00, '2020-06-09 10:59:19');
INSERT INTO `ProductList` VALUES (19, 'offer002', '小型新式履带式微旋耕机遥控家用柴油拖拉机旋耕机乘坐式农机', 3, 19, '柳州', '本农机适合多种类型的土地耕种', 4707.00, '2020-06-09 11:00:17');
INSERT INTO `ProductList` VALUES (20, 'offer001', '微耕机四驱自走式旋耕机柴油松土多功能耕地机小型农机开沟拖拉机', 4, 500, '贵港', '本产品符合绿色农业的产品需求，希望广大顾客大大支持', 4500.00, '2020-06-09 11:02:10');
INSERT INTO `ProductList` VALUES (21, 'offer003', '果园管理机多功能农机机械四轮拖拉机404柴油机504四驱农用耕地机', 5, 15, '北海', '本产品综合性强、适用范围广、使用起来简单方便是顾客的不二之选', 8000.00, '2020-06-09 11:03:55');
INSERT INTO `ProductList` VALUES (22, 'offer003', '小型新式履带式微旋耕机遥控家用柴油拖拉机旋耕机乘坐式农机', 3, 50, '梧州', '精品之选，值得信赖', 4800.00, '2020-06-09 11:08:30');
INSERT INTO `ProductList` VALUES (23, 'offer003', '多功能大马力履带旋耕机', 1, 60, '来宾', '清仓甩卖', 1800.00, '2020-06-09 11:10:15');
INSERT INTO `ProductList` VALUES (24, 'offer001', '拓戈手推式微耕机小型松土机', 2, 49, '桂林', '商品说明233', 2899.00, '2020-06-09 23:36:51');

-- ----------------------------
-- Table structure for TransactionRecord
-- ----------------------------
DROP TABLE IF EXISTS `TransactionRecord`;
CREATE TABLE `TransactionRecord`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_md5` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `offer_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `machine_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `machine_id` int(11) DEFAULT NULL,
  `unit_price` decimal(10, 2) DEFAULT NULL,
  `require_number` int(11) DEFAULT NULL,
  `offer_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dispatch_fee` decimal(10, 2) DEFAULT NULL,
  `total_price` decimal(10, 2) DEFAULT NULL,
  `msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `deliver_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `release_time` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of TransactionRecord
-- ----------------------------
INSERT INTO `TransactionRecord` VALUES (22, 'b3dc5942b4089efc2414606f061762af', 'offer001', 'user001', '多功能大马力履带旋耕机', 1, 3000.00, 1, '河池', '南宁', 100.00, 3100.00, '快速发货', 'deliver001', 3, '2020-05-30 21:34:00');
INSERT INTO `TransactionRecord` VALUES (23, '6fb947d0ca82e743e99952f19db848bd', 'offer001', 'user001', '拓戈手推式微耕机小型松土机', 2, 3191.00, 3, '南宁', '钦州', 100.00, 9673.00, '请尽快配送', '', 4, '2020-05-31 10:36:59');
INSERT INTO `TransactionRecord` VALUES (24, '888324ace55d13d7568a3ee306724a3a', 'offer001', 'user001', '拓戈手推式微耕机小型松土机', 2, 3191.00, 1, '南宁', '南宁', 40.00, 3231.00, '立即配送哦', '', 3, '2020-05-31 14:11:30');
INSERT INTO `TransactionRecord` VALUES (25, '00184e871c8acdadb77c36a365fa9eb1', 'offer003', 'user002', '小型新式履带式微旋耕机遥控家用柴油拖拉机旋耕机乘坐式农机', 3, 4800.00, 3, '梧州', '南宁', 100.00, 14500.00, '请按时配送', '', 1, '2020-06-09 12:54:10');
INSERT INTO `TransactionRecord` VALUES (26, 'cca35a1f53e52e62418fb5a38815ef3d', 'offer001', 'user002', '微耕机四驱自走式旋耕机柴油松土多功能耕地机小型农机开沟拖拉机', 4, 2200.00, 4, '防城港', '桂林', 100.00, 8900.00, '希望有配送员配送', 'deliever02', 3, '2020-06-09 12:54:39');
INSERT INTO `TransactionRecord` VALUES (27, 'b3a189fd63fb1743f05616dd3939e4d5', 'offer002', 'user002', '小型新式履带式微旋耕机遥控家用柴油拖拉机旋耕机乘坐式农机', 3, 4700.00, 4, '柳州', '钦州', 100.00, 18900.00, '这次可以单独配送', 'deliever03', 3, '2020-06-09 12:55:17');
INSERT INTO `TransactionRecord` VALUES (29, 'd75d0c5c0f94dcef9a69ba0ba2ae8402', 'offer003', 'user001', '小型新式履带式微旋耕机遥控家用柴油拖拉机旋耕机乘坐式农机', 3, 4800.00, 2, '梧州', '南宁', 100.00, 9700.00, '希望快速发货哦', '', 1, '2020-06-14 18:40:18');

-- ----------------------------
-- Table structure for User
-- ----------------------------
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `balance` decimal(10, 2) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of User
-- ----------------------------
INSERT INTO `User` VALUES (1, 'user001', '123456', 'user', '2020-06-14 18:39:33.721000', 801633.00);
INSERT INTO `User` VALUES (2, 'offer001', '123456', 'offer', '2020-06-14 18:40:46.040000', 11219.00);
INSERT INTO `User` VALUES (3, 'deliver001', '123456', 'deliver', '2020-06-14 18:39:16.507000', 1340.00);
INSERT INTO `User` VALUES (8, 'admin', '123456', 'admin', '2020-06-14 18:43:33.305000', 98777.00);
INSERT INTO `User` VALUES (24, 'user002', '123456', 'user', '2020-06-09 12:53:24.365000', 57699.00);
INSERT INTO `User` VALUES (25, 'offer002', '123456', 'offer', '2020-06-14 18:41:13.193000', 100099.00);
INSERT INTO `User` VALUES (26, 'offer003', '123456', 'offer', '2020-06-09 11:07:45.669000', 100199.00);
INSERT INTO `User` VALUES (27, 'deliever02', '123456', 'deliver', '2020-06-09 16:03:58.129000', 100099.00);
INSERT INTO `User` VALUES (28, 'deliever03', '123456', 'deliver', '2020-06-14 18:43:13.980000', 100101.00);
INSERT INTO `User` VALUES (29, 'user003', '123456', 'user', '2020-06-09 10:58:08.902000', 99999.00);

-- ----------------------------
-- Table structure for UserDemand
-- ----------------------------
DROP TABLE IF EXISTS `UserDemand`;
CREATE TABLE `UserDemand`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `machine_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `machine_id` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `start_time` datetime(0) DEFAULT NULL,
  `end_time` datetime(0) DEFAULT NULL,
  `offer_price` decimal(10, 2) DEFAULT NULL,
  `detail_info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `delete_flag` int(11) DEFAULT NULL,
  `release_time` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of UserDemand
-- ----------------------------
INSERT INTO `UserDemand` VALUES (1, 'user001', '多功能大马力履带旋耕机', 1, 2, '桂林', '2020-04-01 19:57:45', '2020-05-28 19:57:50', 4100.00, '急需这玩意儿啊，求租啊', 0, '2020-05-11 19:58:17');
INSERT INTO `UserDemand` VALUES (2, 'user001', '小型新式履带式微旋耕机遥控家用柴油拖拉机旋耕机乘坐式农机', 3, 1, '柳州', '2020-05-13 14:53:43', '2020-05-20 14:53:43', 2100.00, 'ew', 0, '2020-05-13 14:53:47');
INSERT INTO `UserDemand` VALUES (5, 'user001', '微耕机四驱自走式旋耕机柴油松土多功能耕地机小型农机开沟拖拉机', 4, 1, '桂林', '2020-05-13 17:46:09', '2020-05-20 17:46:09', 2100.00, 'sasq', 0, '2020-05-13 17:46:14');
INSERT INTO `UserDemand` VALUES (10, 'user004', '拓戈手推式微耕机小型松土机', 2, 1, '柳州', '2020-05-21 23:20:03', '2020-05-28 23:20:03', 2100.00, '1234', 0, '2020-05-21 23:20:11');
INSERT INTO `UserDemand` VALUES (12, 'user001', '拓戈手推式微耕机小型松土机', 2, 1, '桂林', '2020-05-27 23:36:35', '2020-06-03 23:36:35', 2100.00, '2333', 0, '2020-05-27 23:45:11');
INSERT INTO `UserDemand` VALUES (13, 'user001', '微耕机四驱自走式旋耕机柴油松土多功能耕地机小型农机开沟拖拉机', 4, 3, '桂林', '2020-05-27 23:36:35', '2020-06-03 23:36:35', 2100.00, '2333', 0, '2020-05-27 23:48:31');
INSERT INTO `UserDemand` VALUES (14, 'user001', '微耕机四驱自走式旋耕机柴油松土多功能耕地机小型农机开沟拖拉机', 4, 1, '防城港', '2020-05-28 14:22:53', '2020-06-04 14:22:53', 2100.00, '23456', 0, '2020-05-28 14:23:04');
INSERT INTO `UserDemand` VALUES (15, 'user001', '果园管理机多功能农机机械四轮拖拉机404柴油机504四驱农用耕地机', 5, 1, '北海', '2020-05-30 10:37:09', '2020-06-06 10:37:09', 2100.00, '123456', 0, '2020-05-30 10:41:25');
INSERT INTO `UserDemand` VALUES (16, 'user002', '小型新式履带式微旋耕机遥控家用柴油拖拉机旋耕机乘坐式农机', 3, 5, '桂林', '2020-06-09 12:53:31', '2020-06-16 12:53:31', 2100.00, '希望尽快配送', 0, '2020-06-09 12:53:46');
INSERT INTO `UserDemand` VALUES (17, 'user002', '果园管理机多功能农机机械四轮拖拉机404柴油机504四驱农用耕地机', 5, 4, '桂林', '2020-06-09 12:55:28', '2020-06-16 12:55:28', 4800.00, '希望能尽快到手', 0, '2020-06-09 12:55:45');

SET FOREIGN_KEY_CHECKS = 1;
