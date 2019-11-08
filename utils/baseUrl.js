const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://royalmerchandise.now.sh.now.sh'
    : 'http://localhost:3000';

export default baseUrl;
