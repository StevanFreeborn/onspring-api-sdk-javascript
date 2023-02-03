import { HttpStatusCode } from '../src/enums/HttpStatusCode';
import { expect } from 'chai';

describe('HttpStatusCode', function () {
  describe('OK', function () {
    it('should return the correct value', function () {
      const result = HttpStatusCode.OK;
      expect(result).to.equal(200);
    });
  });

  describe('Created', function () {
    it('should return the correct value', function () {
      const result = HttpStatusCode.Created;
      expect(result).to.equal(201);
    });
  });

  describe('Accepted', function () {
    it('should return the correct value', function () {
      const result = HttpStatusCode.Accepted;
      expect(result).to.equal(202);
    });
  });

  describe('NoContent', function () {
    it('should return the correct value', function () {
      const result = HttpStatusCode.NoContent;
      expect(result).to.equal(204);
    });
  });

  describe('BadRequest', function () {
    it('should return the correct value', function () {
      const result = HttpStatusCode.BadRequest;
      expect(result).to.equal(400);
    });
  });

  describe('Unauthorized', function () {
    it('should return the correct value', function () {
      const result = HttpStatusCode.Unauthorized;
      expect(result).to.equal(401);
    });
  });

  describe('Forbidden', function () {
    it('should return the correct value', function () {
      const result = HttpStatusCode.Forbidden;
      expect(result).to.equal(403);
    });
  });

  describe('NotFound', function () {
    it('should return the correct value', function () {
      const result = HttpStatusCode.NotFound;
      expect(result).to.equal(404);
    });
  });

  describe('MethodNotAllowed', function () {
    it('should return the correct value', function () {
      const result = HttpStatusCode.MethodNotAllowed;
      expect(result).to.equal(405);
    });
  });

  describe('Conflict', function () {
    it('should return the correct value', function () {
      const result = HttpStatusCode.Conflict;
      expect(result).to.equal(409);
    });
  });

  describe('InternalServerError', function () {
    it('should return the correct value', function () {
      const result = HttpStatusCode.InternalServerError;
      expect(result).to.equal(500);
    });
  });

  describe('NotImplemented', function () {
    it('should return the correct value', function () {
      const result = HttpStatusCode.NotImplemented;
      expect(result).to.equal(501);
    });
  });

  describe('BadGateway', function () {
    it('should return the correct value', function () {
      const result = HttpStatusCode.BadGateway;
      expect(result).to.equal(502);
    });
  });

  describe('ServiceUnavailable', function () {
    it('should return the correct value', function () {
      const result = HttpStatusCode.ServiceUnavailable;
      expect(result).to.equal(503);
    });
  });

  describe('GatewayTimeout', function () {
    it('should return the correct value', function () {
      const result = HttpStatusCode.GatewayTimeout;
      expect(result).to.equal(504);
    });
  });
});
