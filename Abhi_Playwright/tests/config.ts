export const config = {
  login: {
    url: process.env.TEST_LOGIN_URL || '',
    username: process.env.TEST_LOGIN_USER || '',
    password: process.env.TEST_LOGIN_PASS || '',
    usernameSelector: process.env.TEST_LOGIN_USER_SELECTOR || '#username',
    passwordSelector: process.env.TEST_LOGIN_PASS_SELECTOR || '#password',
    submitSelector: process.env.TEST_LOGIN_SUBMIT_SELECTOR || 'button[type=submit]'
    ,
    // optional selector that appears after successful login
    postLoginSelector: process.env.TEST_LOGIN_POST_SELECTOR || ''
  },
  download: {
    timeout: Number(process.env.TEST_DOWNLOAD_TIMEOUT || '15000')
  }
  ,
  // mapping of flaky test owners by filename pattern -> GitHub username
  flakyOwners: {
    'downloadUploadExcel.spec.ts': process.env.FLAKY_OWNER_DOWNLOAD || '',
    'WebApiPart1.spec.js': process.env.FLAKY_OWNER_API || ''
  }
};

export default config;
