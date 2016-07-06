import { expect } from 'chai';

import renderIf from '../../../../app/lib/renderIf';

describe('renderIf', function () {
    it('should render a function when predicate function is true', function () {
        expect(renderIf(() => true, () => 'Test')).to.equal('Test');
    });

    it('should render a function when predicate value is true', function () {
        expect(renderIf(true, () => 'Test')).to.equal('Test');
    });

    it('should NOT render a function when predicate function is false', function () {
        expect(renderIf(() => false, () => 'Test')).to.equal(null);
    });

    it('should NOT render a function when predicate value is false', function () {
        expect(renderIf(false, () => 'Test')).to.equal(null);
    });

    it('should render the else element when predicate function returns false and the else element is passed', function () {
        expect(renderIf(() => false, () => 'True', () => 'False')).to.equal('False');
    });

    it('should render the else element when predicate value is false and the else element is passed', function () {
        expect(renderIf(false, () => 'True', () => 'False')).to.equal('False');
    });
});
