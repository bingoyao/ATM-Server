/**
 * bank-server 配置文件
 */

// 本地开发时使用的数据库配置
const DEV_Database = {
  name: 'bank',
  user: 'postgres',
  host: 'localhost',
  password: 'bang8468824925',
  dialect: 'postgres'
};

// 服务器上的数据库配置
const PRO_Database = {
  name: 'bank',
  user: 'root',
  host: '192.168.0.161',
  password: 'Iam23yearsold',
  dialect: 'postgres'
};

module.exports = {
  // 数据库配置信息
  Database: PRO_Database,

  // jwt密钥
  SECRET: 'bank-server-secret',
  // 信用积分阈值
  CREDITS_LIMIT: 85
}