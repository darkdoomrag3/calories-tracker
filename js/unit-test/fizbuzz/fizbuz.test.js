const fizzBuzz = require('./fizbuz')

describe('fizzbuzz',()=>{
    it('should be a function',()=>{
        expect(typeof fizzBuzz).toEqual('function');
    });
    it('should return number if not divided by 3 or 5',()=>{
        expect(fizzBuzz(1)).toEqual(1);
        expect(fizzBuzz(13)).toEqual(13);
        expect(fizzBuzz(17)).toEqual(17);
    })
})


