var chai = require("chai")
, sinon = require("sinon")
, expect = chai.expect
, middleware = require('index')
;

chai.use(require('sinon-chai'));
chai.config.showDiff = false;

describe("exported value:", function(){
  it('must be a function', function(){
    expect(middleware).to.be.an.instanceof(Function);
  });
});

