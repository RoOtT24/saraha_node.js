import joi from 'joi';


export const signupSchema = {
    body:joi.object({
    userName:joi.string().alphanum().min(3).max(20).required(),
    email:joi.string().email({minDomainSegments:2, tlds:{allow: ['com','net', 'edu', 'org']}}).required(),
    password:joi.string().min(8).required(),
    cPassword:joi.valid(joi.ref('password')).required(),
    age:joi.number().min(18).max(80),
    gender:joi.string().valid('male', 'female').required(),
}).required(),

    query:joi.object({
        test:joi.boolean().required(),
    }).required()
}

export const loginSchema = {
    body:joi.object({
    email:joi.string().email({minDomainSegments:2, tlds:{allow:['com','net', 'edu', 'org']}}).required(),
    password:joi.string().min(8).required(),
}).required()
}