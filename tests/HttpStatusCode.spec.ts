import { HttpStatusCode } from '../src/enums/HttpStatusCode';
import { expect } from 'chai';

describe('HttpStatusCode', () => {
  describe('OK', () => {
    it('should return the correct value', () => {
      const result = HttpStatusCode.OK;
      expect(result).to.equal(200);
    });
  });

  describe('Created', () => {
    it('should return the correct value', () => {
      const result = HttpStatusCode.Created;
      expect(result).to.equal(201);
    });
  });

  describe('Accepted', () => {
    it('should return the correct value', () => {
      const result = HttpStatusCode.Accepted;
      expect(result).to.equal(202);
    });
  });

  describe('NoContent', () => {
    it('should return the correct value', () => {
      const result = HttpStatusCode.NoContent;
      expect(result).to.equal(204);
    });
  });

  describe('BadRequest', () => {
    it('should return the correct value', () => {
      const result = HttpStatusCode.BadRequest;
      expect(result).to.equal(400);
    });
  });

  describe('Unauthorized', () => {
    it('should return the correct value', () => {
      const result = HttpStatusCode.Unauthorized;
      expect(result).to.equal(401);
    });
  });

  describe('Forbidden', () => {
    it('should return the correct value', () => {
      const result = HttpStatusCode.Forbidden;
      expect(result).to.equal(403);
    });
  });

  describe('NotFound', () => {
    it('should return the correct value', () => {
      const result = HttpStatusCode.NotFound;
      expect(result).to.equal(404);
    });
  });

  describe('MethodNotAllowed', () => {
    it('should return the correct value', () => {
      const result = HttpStatusCode.MethodNotAllowed;
      expect(result).to.equal(405);
    });
  });

  describe('Conflict', () => {
    it('should return the correct value', () => {
      const result = HttpStatusCode.Conflict;
      expect(result).to.equal(409);
    });
  });

  describe('InternalServerError', () => {
    it('should return the correct value', () => {
      const result = HttpStatusCode.InternalServerError;
      expect(result).to.equal(500);
    });
  });

  describe('NotImplemented', () => {
    it('should return the correct value', () => {
      const result = HttpStatusCode.NotImplemented;
      expect(result).to.equal(501);
    });
  });

  describe('BadGateway', () => {
    it('should return the correct value', () => {
      const result = HttpStatusCode.BadGateway;
      expect(result).to.equal(502);
    });
  });

  describe('ServiceUnavailable', () => {
    it('should return the correct value', () => {
      const result = HttpStatusCode.ServiceUnavailable;
      expect(result).to.equal(503);
    });
  });

  describe('GatewayTimeout', () => {
    it('should return the correct value', () => {
      const result = HttpStatusCode.GatewayTimeout;
      expect(result).to.equal(504);
    });
  });
});
