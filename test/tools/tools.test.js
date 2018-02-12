var assert = require('assert')
var tools = require('../parser/tools');

describe('tools', function() {

  describe('#isRoman("i-v")', function() {
    it('should return true for "i"', function() {
      assert.equal(tools.isRoman('i'), true);
      assert.equal(tools.isRoman('ii'), true);
      assert.equal(tools.isRoman('iii'), true);
      assert.equal(tools.isRoman('iv'), true);
      assert.equal(tools.isRoman('v'), true);
      assert.equal(tools.isRoman('vi'), true);
      assert.equal(tools.isRoman('vii'), true);
      assert.equal(tools.isRoman('viii'), true);
      assert.equal(tools.isRoman('ix'), true);
      assert.equal(tools.isRoman('x'), true);
      assert.equal(tools.isRoman('xc'), true);
      assert.equal(tools.isRoman('cxc'), true);
    });
  });

  describe('#isRoman()', function() {
    it('should return false for an empty argument', function() {
      assert.equal(tools.isRoman(), false);
      assert.equal(tools.isRoman(''), false);
      assert.equal(tools.isRoman(' '), false);
    });
  });

  describe('#isRoman("ia")', function() {
    it('should return false for mix of roman and non-roman', function() {
      assert.equal(tools.isRoman('ai'), false);
      assert.equal(tools.isRoman('iai'), false);
      assert.equal(tools.isRoman('iiai'), false);
      assert.equal(tools.isRoman('iav'), false);
      assert.equal(tools.isRoman('va'), false);
      assert.equal(tools.isRoman('vai'), false);
      assert.equal(tools.isRoman('viia'), false);
      assert.equal(tools.isRoman('viiia'), false);
      assert.equal(tools.isRoman('aix'), false);
      assert.equal(tools.isRoman('aa'), false);
    });
  });

  describe('#isRoman("xc")', function() {
    it('should return false for no proper roman number construction', function() {
      assert.equal(tools.isRoman('iiii'), false);
      assert.equal(tools.isRoman('ivi'), false);
      assert.equal(tools.isRoman('viiii'), false);
      assert.equal(tools.isRoman('xiiii'), false);
      assert.equal(tools.isRoman('lxxxx'), false);
      assert.equal(tools.isRoman('cxxxx'), false);
    });
  });

  describe('#isNumeral()', function() {
    it('should return false for an empty argument', function() {
      assert.equal(tools.isNumeral(), false);
      assert.equal(tools.isNumeral(''), false);
      assert.equal(tools.isNumeral(' '), false);
    });
  });

  describe('#isNumeral("128.º")', function() {
    it('should return true for a arabic number construction followed by "º" or ".º"', function() {
      assert.equal(tools.isNumeral('128º'), true);
      assert.equal(tools.isNumeral('128ª'), true);
      assert.equal(tools.isNumeral('128.º'), true);
      assert.equal(tools.isNumeral('128.ª'), true);
    });
  });

  describe('#isNumeral("128")', function() {
    it('should return false for a arabic number construction not followed by "º" or ".º"', function() {
      assert.equal(tools.isNumeral('128'), false);
      assert.equal(tools.isNumeral('128.'), false);
    });
  });

  describe('#Roman2arabic()', function(){
    it('should return undefined for an empty argument', function() {
      assert(typeof tools.roman2arabic() === 'undefined');
      assert(typeof tools.roman2arabic('') === 'undefined');
      assert(typeof tools.roman2arabic(' ') === 'undefined');
    });
  });
  
  describe('Roman2arabic', function(){
    it('CAAC should return undefined', function(){
      assert(typeof tools.roman2arabic('CAAC') === 'undefined');
    });
  });
  
  describe('Roman2arabic', function(){
    it('ZYZ should return undefined', function(){
      assert(typeof tools.roman2arabic('XYZ') === 'undefined');
    });
  });
  
  describe('Roman2arabic', function(){
    it('I should return 1', function(){
      assert(tools.roman2arabic('I') === 1);
    });
  });
  
  describe('Roman2arabic', function(){
    it('II should return 2', function(){
      assert(tools.roman2arabic('II') === 2);
    });
  });
  
  describe('Roman2arabic', function(){
    it('III should return 3', function(){
      assert(tools.roman2arabic('III') === 3);
    });
  });
  
  describe('Roman2arabic', function(){
    it('IV should return 4', function(){
      assert(tools.roman2arabic('IV') === 4);
    });
  });
  
  describe('Roman2arabic', function(){
    it('V should return 5', function(){
      assert(tools.roman2arabic('V') === 5);
    });
  });
  
  describe('Roman2arabic', function(){
    it('VI should return 6', function(){
      assert(tools.roman2arabic('VI') === 6);
    });
  });
  
  describe('Roman2arabic', function(){
    it('VII should return 7', function(){
      assert(tools.roman2arabic('VII') === 7);
    });
  });
  
  describe('Roman2arabic', function(){
    it('VIII should return 8', function(){
      assert(tools.roman2arabic('VIII') === 8);
    });
  });
  
  describe('Roman2arabic', function(){
    it('IX should return 9', function(){
      assert(tools.roman2arabic('IX') === 9);
    });
  });
  
  describe('Roman2arabic', function(){
    it('X should return 10', function(){
      assert(tools.roman2arabic('X') === 10);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XI should return 11', function(){
      assert(tools.roman2arabic('XI') === 11);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XII should return 12', function(){
      assert(tools.roman2arabic('XII') === 12);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XIII should return 13', function(){
      assert(tools.roman2arabic('XIII') === 13);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XIV should return 14', function(){
      assert(tools.roman2arabic('XIV') === 14);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XV should return 15', function(){
      assert(tools.roman2arabic('XV') === 15);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XVI should return 16', function(){
      assert(tools.roman2arabic('XVI') === 16);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XVII should return 17', function(){
      assert(tools.roman2arabic('XVII') === 17);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XVIII should return 18', function(){
      assert(tools.roman2arabic('XVIII') === 18);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XIX should return 19', function(){
      assert(tools.roman2arabic('XIX') === 19);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XX should return 20', function(){
      assert(tools.roman2arabic('XX') === 20);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XXI should return 21', function(){
      assert(tools.roman2arabic('XXI') === 21);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XXII should return 22', function(){
      assert(tools.roman2arabic('XXII') === 22);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XXIII should return 23', function(){
      assert(tools.roman2arabic('XXIII') === 23);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XXIV should return 24', function(){
      assert(tools.roman2arabic('XXIV') === 24);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XXV should return 25', function(){
      assert(tools.roman2arabic('XXV') === 25);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XXVI should return 26', function(){
      assert(tools.roman2arabic('XXVI') === 26);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XXVII should return 27', function(){
      assert(tools.roman2arabic('XXVII') === 27);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XXVIII should return 28', function(){
      assert(tools.roman2arabic('XXVIII') === 28);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XXIX should return 29', function(){
      assert(tools.roman2arabic('XXIX') === 29);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XXX should return 30', function(){
      assert(tools.roman2arabic('XXX') === 30);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XL should return 40', function(){
      assert(tools.roman2arabic('XL') === 40);
    });
  });
  
  describe('Roman2arabic', function(){
    it('L should return 50', function(){
      assert(tools.roman2arabic('L') === 50);
    });
  });
  
  describe('Roman2arabic', function(){
    it('LX should return 60', function(){
      assert(tools.roman2arabic('LX') === 60);
    });
  });
  
  describe('Roman2arabic', function(){
    it('LXX should return 70', function(){
      assert(tools.roman2arabic('LXX') === 70);
    });
  });
  
  describe('Roman2arabic', function(){
    it('LXXX should return 80', function(){
      assert(tools.roman2arabic('LXXX') === 80);
    });
  });
  
  describe('Roman2arabic', function(){
    it('XC should return 90', function(){
      assert(tools.roman2arabic('XC') === 90);
    });
  });
  
  describe('Roman2arabic', function(){
    it('C should return 100', function(){
      assert(tools.roman2arabic('C') === 100);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CXL should return 140', function(){
      assert(tools.roman2arabic('CXL') === 140);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CL should return 150', function(){
      assert(tools.roman2arabic('CL') === 150);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CLX should return 160', function(){
      assert(tools.roman2arabic('CLX') === 160);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CC should return 200', function(){
      assert(tools.roman2arabic('CC') === 200);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CCXL should return 240', function(){
      assert(tools.roman2arabic('CCXL') === 240);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CCL should return 250', function(){
      assert(tools.roman2arabic('CCL') === 250);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CCLX should return 260', function(){
      assert(tools.roman2arabic('CCLX') === 260);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CCC should return 300', function(){
      assert(tools.roman2arabic('CCC') === 300);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CCCXL should return 340', function(){
      assert(tools.roman2arabic('CCCXL') === 340);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CCCL should return 350', function(){
      assert(tools.roman2arabic('CCCL') === 350);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CCCLX should return 360', function(){
      assert(tools.roman2arabic('CCCLX') === 360);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CD should return 400', function(){
      assert(tools.roman2arabic('CD') === 400);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CDXL should return 440', function(){
      assert(tools.roman2arabic('CDXL') === 440);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CDL should return 450', function(){
      assert(tools.roman2arabic('CDL') === 450);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CDLX should return 460', function(){
      assert(tools.roman2arabic('CDLX') === 460);
    });
  });
  
  describe('Roman2arabic', function(){
    it('D should return 500', function(){
      assert(tools.roman2arabic('D') === 500);
    });
  });
  
  describe('Roman2arabic', function(){
    it('DXL should return 540', function(){
      assert(tools.roman2arabic('DXL') === 540);
    });
  });
  
  describe('Roman2arabic', function(){
    it('DL should return 550', function(){
      assert(tools.roman2arabic('DL') === 550);
    });
  });
  
  describe('Roman2arabic', function(){
    it('DLX should return 560', function(){
      assert(tools.roman2arabic('DLX') === 560);
    });
  });
  
  describe('Roman2arabic', function(){
    it('DC should return 600', function(){
      assert(tools.roman2arabic('DC') === 600);
    });
  });
  
  describe('Roman2arabic', function(){
    it('DCXL should return 640', function(){
      assert(tools.roman2arabic('DCXL') === 640);
    });
  });
  
  describe('Roman2arabic', function(){
    it('DCL should return 650', function(){
      assert(tools.roman2arabic('DCL') === 650);
    });
  });
  
  describe('Roman2arabic', function(){
    it('DCLX should return 660', function(){
      assert(tools.roman2arabic('DCLX') === 660);
    });
  });
  
  describe('Roman2arabic', function(){
    it('DCC should return 700', function(){
      assert(tools.roman2arabic('DCC') === 700);
    });
  });
  
  describe('Roman2arabic', function(){
    it('DCCXL should return 740', function(){
      assert(tools.roman2arabic('DCCXL') === 740);
    });
  });
  
  describe('Roman2arabic', function(){
    it('DCCL should return 750', function(){
      assert(tools.roman2arabic('DCCL') === 750);
    });
  });
  
  describe('Roman2arabic', function(){
    it('DCCLX should return 760', function(){
      assert(tools.roman2arabic('DCCLX') === 760);
    });
  });
  
  describe('Roman2arabic', function(){
    it('DCCC should return 800', function(){
      assert(tools.roman2arabic('DCCC') === 800);
    });
  });
  
  describe('Roman2arabic', function(){
    it('DCCCXL should return 840', function(){
      assert(tools.roman2arabic('DCCCXL') === 840);
    });
  });
  
  describe('Roman2arabic', function(){
    it('DCCCL should return 850', function(){
      assert(tools.roman2arabic('DCCCL') === 850);
    });
  });
  
  describe('Roman2arabic', function(){
    it('DCCCLX should return 860', function(){
      assert(tools.roman2arabic('DCCCLX') === 860);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CM should return 900', function(){
      assert(tools.roman2arabic('CM') === 900);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CMXL should return 940', function(){
      assert(tools.roman2arabic('CMXL') === 940);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CML should return 950', function(){
      assert(tools.roman2arabic('CML') === 950);
    });
  });
  
  describe('Roman2arabic', function(){
    it('CMLX should return 960', function(){
      assert(tools.roman2arabic('CMLX') === 960);
    });
  });
  
  describe('Roman2arabic', function(){
    it('M should return 1000', function(){
      assert(tools.roman2arabic('M') === 1000);
    });
  });
  
  describe('Roman2arabic', function(){
    it('MM should return 2000', function(){
      assert(tools.roman2arabic('MM') === 2000);
    });
  });
  
  describe('Roman2arabic', function(){
    it('MMM; should return 3000', function(){
      assert(tools.roman2arabic('MMM') === 3000);
    });
  });
  
  describe('Roman2arabic', function(){
    it('MCMXCIX should return 1999', function(){
      assert(tools.roman2arabic('MCMXCIX') === 1999);
    });
  });
  
  describe('Roman2arabic', function(){
    it('MCDXLVI should return 1446', function(){
      assert(tools.roman2arabic('MCDXLVI') === 1446);
    });
  });
  
});
