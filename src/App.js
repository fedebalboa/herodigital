import React, { useState } from "react";
import Input from "./components/Input";
import validation from "./validation";
import "./App.css";
import "./normalize.css";
import api from "./api";

const INITIAL_VALUES = {
    firstname: "",
    lastname: "",
    email: "",
}

const App = () => {
  const [successMessage, setSuccessMessage] = useState()
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { hasErrors, errors } = validation(values);
    setErrors(errors);

    if (!hasErrors) {
        try {
            const result = await api(values);

            if (result.status === "success") {
                setSuccessMessage(result.message)
            } else {
                throw result;
            }
        } catch (e) {
            alert(e?.message || "Oops, somthing went wrong, try again")
        }
    }
  };

  if (successMessage) {
      return (
          <>
        <p>{successMessage}</p>
        <button onClick={(e) => {
            e.preventDefault();
            setSuccessMessage(null);
            setValues(INITIAL_VALUES);
        }}>OK</button>
        </>
      )
  }

  return (
    <div className="main-container">
      <div>
        <div>
          <h2 className="title">Sign up for email updates</h2>
          <h5>*Indicates Required Field</h5>
        </div>

        <form className="form-container">
          <Input
            type="text"
            name="firstname"
            required
            label="First name"
            value={values.firstname}
            onChange={(text) => {
              setValues({
                ...values,
                firstname: text,
              });
            }}
            error={errors.firstname}
          />

          <Input
            type="text"
            name="lastname"
            value={values.lastname}
            required
            label="Last Name"
            onChange={(text) => {
              setValues({
                ...values,
                lastname: text,
              });
            }}
            error={errors.lastname}
          />

          <Input
            type="text"
            name="email"
            value={values.email}
            required
            label="Email address"
            onChange={(text) => {
              setValues({
                ...values,
                email: text,
              });
            }}
            error={errors.email}
          />

          <Input
            type="text"
            name="organization"
            value={values.organization}
            label="Organization"
            onChange={(text) => {
              setValues({
                ...values,
                organization: text,
              });
            }}
            error={errors.organization}
          />
          <div className="test">
            <label htmlFor="eu-select">
              EU Resident*
              <select name="resident" required>
                <option value="">- SELECT ONE -</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>

          <div>
            {errors.advances && <p className="error">{errors.advances}</p>}
            <label className="container"
            htmlFor="advances"
            onClick={() => {
                setValues({
                    ...values,
                    advances: !values.advances,
                });
            }}
            >
              <input
                type="checkbox"
                name="advances"
                checked={values.advances}
                onChange={() => {
                  setValues({
                    ...values,
                    advances: !values.advances,
                  });
                }}
              />
              Advances *
              <span className="checkmark"></span>
            </label>
          </div>

          <div>
            <label className="container"
            htmlFor="alerts"
            onClick={() => {
                setValues({
                    ...values,
                    alerts: !values.alerts,
                });
            }}
            >
              <input
                type="checkbox"
                name="alerts"
                checked={values.alerts}
              />
              Alerts
              <span className="checkmark"></span>
            </label>
          </div>

          <div>
            <label className="container"
                htmlFor="other-communictions"
                onClick={() => {
                    setValues({
                        ...values,
                        otherComs: !values.otherComs,
                    });
                }}
            >
              <input
                type="checkbox"
                name="otherComs"
                checked={values.otherComs}
              />
              other communications
              <span className="checkmark"></span>
            </label>
          </div>

          <div className="button_container">
            <button type="submit" className="submit pill scale" onClick={handleSubmit}>
              Submit
            </button>
            <button type="button" className="reset scale" onClick={() => {
                if(window.confirm("Are you sure?")) {
                    setValues(INITIAL_VALUES)
                }
            }}>Reset</button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
