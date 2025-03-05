const ProfileValidData = (req) => {
    
    const AllowedValidField = ["name", "photoUrl", "phoneNumber", "address"];
    const isEditField = Object.keys(req.body).every((field) => AllowedValidField.includes(field))
    return isEditField;

}

module.exports = ProfileValidData

 
