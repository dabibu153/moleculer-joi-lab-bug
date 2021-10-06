const BaseValidator = require("moleculer").Validator;
const { ValidationError } = require("moleculer").Errors;

class JoiValidator extends BaseValidator {
    constructor() {
        super();
        this.validator = require("joi");
    }

    compile(schema) {
        console.log("innitialize=====>", schema)
        return (params) => this.validate(params, schema);
    }

    validate(params, schema) {
        const res = schema.options({ allowUnknown: true }).validate(params)
        if (res.error)
            throw new ValidationError(res.error.message, null, res.error.details);

        return true;
    }
}

module.exports = JoiValidator;