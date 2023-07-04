import { User } from './user.model'

export const findLastUserId = async () => {
    const lastUser = await User.findOne({}, { id: 1, _id: 0 })
        .sort({
            createdAt: -1, //dec => last jey user create hyce tar id pabo 
        })
        .lean() //faster mongoose query with lean 

    return lastUser?.id
}

export const generateUserId = async () => {
    // (0).toString().padStart(5, '0') = for first time user
    const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0') //00000
    //increment by 1
    const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
    return incrementedId
}