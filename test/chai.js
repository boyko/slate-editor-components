/**
 * Created by amarov on 6/8/17.
 */

const chai = require('chai');
const chaiEnzyme = require('chai-enzyme');

chai.use(chaiEnzyme());

const expect = chai.expect;

export { expect };
