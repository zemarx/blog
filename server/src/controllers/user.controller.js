import User from '../models/user';
import logger from '../utils/logger';
import getFullUrl from '../utils/full-url';


// Save a user
export function addUser(req, res) {
    logger.debug(`Requested to save user: ${req.body.post} from : ${getFullUrl(req)}`);

    let newUser = new User();

    newUser.username = ""; // get from request
    newUser.password = ""; // get from request

    //sanitize above inputs

    //check that user with that username is not already in database

    //save user to database
}

// Get single user( PROBABLY USED WHEN USER LOGIN)
export function getUser(req, res) {
    logger.info(`Requested one user with id: ${req.params._id} from: ${getFullUrl(req)}`);

    //get username
    //get password

    //get user by that username from database

    //check that password is right

    //approve/decline authentication or something..
}

// Delete single user
export function deleteUser(req, res) {
    logger.info(`Requested to delete user with id: ${req.params._id} from: ${getFullUrl(req)}`);

    //TODO: is not necessery at that point
}
