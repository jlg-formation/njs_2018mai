const assert = require('assert');
global.mode = 'dev';
const tp3 = require('../TP3/tp3');

describe('TP3', function() {
	describe('run the test', function() {
		it('should do the etl', function() {
            try {
                console.log('global.mode', global.mode);
                tp3.run();
                assert.ok(true);
            } catch(e) {
                console.log('error', e)
                assert.fail('error');
            }
            
			
		});
	});
});
