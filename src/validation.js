const validation = (values) => {
    let errors = {};

    if (!values.firstname){
        errors.firstname= "First name is required";
    }

    if (!values.lastname) {
        errors.lastname= "Last name is required";
    }

    if (!values.email) {
        errors.email= "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email="Email is in the wrong format";
    }

    if (!values.advances) {
        errors.advances="Advances is required"
    }

    return {
        hasErrors: Object.values(errors).length > 0,
        errors
    };
}

export default validation
