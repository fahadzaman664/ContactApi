import express from 'express'
import { deleteContactbyId, getallContact, getcontactbyId, getcontactbyuserId, newContact, updateContactbyId } from '../Controller/contactController.js'
import { isAuthenticated } from '../middleware/auth.js';


const contactRouter = express.Router();

// @api desc :- before creating new contact we check if the user is login or not so we use isauthenticated middleware before create contact against user
// @api method :- post
// @api end point:- api/contact/new
contactRouter.post('/new',isAuthenticated, newContact)


// @api desc :- get all contact 
// @api method :- get
// @api end point:- api/contact
contactRouter.get('/', getallContact)

// @api desc :- get contact by id 
// @api method :- get
// @api end point:- api/contact/:id
contactRouter.get('/:id', getcontactbyId)

// @api desc :- updated contact by id 
// @api method :- put
// @api end point:- api/contact/:id
contactRouter.put('/:id',isAuthenticated, updateContactbyId)

// @api desc :- delete contact by id 
// @api method :- delete
// @api end point:- api/contact/:id
contactRouter.delete('/:id',isAuthenticated, deleteContactbyId)

// get contact by specific user id

contactRouter.get('/userid/:id', getcontactbyuserId)



export default contactRouter;