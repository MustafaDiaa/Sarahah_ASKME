import joi from "joi"
const dataMethods = ['body', 'query', 'params']

export const generalFields = {
    password: joi.string().pattern(new RegExp(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/)).required(),
    email: joi.string().email({minDomainSegments: 2, maxDomainSegments: 3, tlds:{allow:['com', 'net', 'edu']}}).required(),
    cPassword: joi.string().required(),
    id: joi.string().min(24).max(24).required()
}

const validation = (schema)=> {
    return (req, res, next)=> {
        const validationArray = []

        dataMethods.forEach(key => {
            if(schema[key]) {
                const validationResult = schema[key].validate(req[key], {abortEarly: false});
                if(validationResult.error) validationArray.push(validationResult.error.details);
            }
        });

        if(validationArray.length > 0) return res.json({message: "Validation error", validationArray})
        else return next();
    }
}

export default validation;