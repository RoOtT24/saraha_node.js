import bcrypt from 'bcrypt'
export const hash = (password, saltRounds = parseInt(process.env.SALT_ROUNDS)) => {
    return bcrypt.hashSync(password, saltRounds);
}


export const compare = async (password, hashValue) => {
    return bcrypt.compareSync(password, hashValue);
}