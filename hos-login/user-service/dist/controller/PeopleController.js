import PeopleService from "../services/PeopleService.js";
import People from "../database/models/peopleModel.js";
/**
 * @class PeopleController
 */
class PeopleController {
    /**
     * @method addFriend
     * @static
     * @async
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    static async addFriend(req, res, next) {
        try {
            const { username } = req.body;
            const {id}= await req.user;
            const people = await People.create({
                loggedid: id,
                username
              })
              if (people) {
                res.status(201).json({
                  username: people.username
                })
              } else {
                res.status(400)
                throw new Error('Invalid user data')
              }}
        catch (err) {
            next(err);
        }
    }
    /**
     * @method listFriends
     * @static
     * @async
     * @param {IUserRequest} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    static async listFriends(req, res, next) {
        try {
            const {id}= await req.user;
            const allfriends = await People.find({loggedid:id})
            res.status(200).json(allfriends)
        }
        catch (err) {
            next(err);
        }
    }
    /**
     * @method acceptFriend
     * @static
     * @async
     * @param {IUserRequest} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    static async acceptFriend(req, res, next) {
        try {
            // const {id}= await req.user;
            const user=await People.findOne({userid: req.params.id});
            if(!user.userid){
                res.status(400)
                throw new Error('User not found')
            }
            const accepted = await People.findOneAndUpdate({userid: req.params.id}, { requestStatus: "accepted" }, { new: true })
            
              res.status(200).json(accepted)
        }
        catch (err) {
            next(err);
        }
    }
    // /**
    //  * @method updateProfile
    //  * @static
    //  * @async
    //  * @param {IUserRequest} req
    //  * @param {Response} res
    //  * @param {NextFunction} next
    //  * @returns {object}
    //  */
    // static async updateProfile(req, res, next) {
    //     try {
    //         const { firstName, lastName, phoneNumber, dateOfBirth } = req.body;
    //         const updateData = { firstName, lastName, phoneNumber, dateOfBirth };
    //         const updatedProfile = await PeopleService.updateProfile(req.user.id, updateData);
    //         ResponseHandler.ok(res, updatedProfile, "Profile updated successfully!");
    //     }
    //     catch (err) {
    //         next(err);
    //     }
    // }
}
export default PeopleController;
