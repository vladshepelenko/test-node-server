import HttpException from './HttpException';

class NoEntityFoundException extends HttpException {
  constructor(entityName: String) {
    super(400, `${entityName} wasn\'t found`);
  }
}

export default NoEntityFoundException;
