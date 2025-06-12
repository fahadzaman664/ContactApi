import { Contact } from '../Models/contact.js'

// create new contact
export const newContact = async (req, res) => {
    try {
        const { name, email, phone, type } = req.body;
        if (name == "" || email == "" || phone == "" || type == "") {
            return res.json({ message: 'All fields are required', Sucess: false });
        }

        let savecontact = await Contact.create({
            name: name,
            email: email,
            phone: phone,
            type: type,
            user: req.user // its coming from middle ware, global variable

        })

        res.json({ message: 'contact created successfuly', success: true, newcontact: savecontact })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });
    }

}

// update contact by id
export const updateContactbyId = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, phone, type } = req.body;
        const updatedcontact = await Contact.findByIdAndUpdate(id, {
            name: name,
            email: email,
            phone: phone,
            type: type

        },
            { new: true }
        );

        if (!updatedcontact) { return res.json({ message: 'no contact found', success: false }) }

        res.json({ message: 'contact updated succesfuly', succes: true, updatedcontact: updatedcontact });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });
    }

}

// delete contact by id
export const deleteContactbyId = async (req, res) => {
    try {
        const id = req.params.id;
        const deletecontact = await Contact.findByIdAndDelete(id);

        if (!deletecontact) { return res.json({ message: 'no contact found', success: false }) }

        res.json({ message: 'contact deleted succesfuly', succes: true, deletecontact: deletecontact });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });
    }

}

//get all contact
export const getallContact = async (req, res) => {
    try {
        const contact = await Contact.find();
        if (!contact) {
            return res.json({ message: 'no contact found', Sucess: false });
        }

        res.json({ message: 'contact found', Sucess: true, contact: contact })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });
    }

}

// get contact by id
export const getcontactbyId = async (req, res) => {
    try {
        const id = req.params.id
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.json({ message: 'no contact found', Sucess: false });
        }

        res.json({ message: 'contact fetched', Sucess: true, contact: contact });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });
    }


}

// get contact by userid
export const getcontactbyuserId = async (req, res) => {
    try {
        const id = req.params.id
        const contact = await Contact.find({
            user: id
        });
        if (!contact) {
            return res.json({ message: 'no contact found', Sucess: false });
        }

        res.json({ message: 'user specific contact fetched', Sucess: true, contact: contact });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });
    }


}