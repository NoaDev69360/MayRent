import React, { useState } from 'react';
import { api } from '../config/api';

function SignupForm() {
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        email: '',
        password: '',
        confirmPassword: '',
        telephone: '',
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        let formErrors = {};
        if (!formData.prenom) formErrors.prenom = 'Prenom is required';
        if (!formData.nom) formErrors.nom = 'Nom is required';
        if (!formData.email) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Email address is invalid';
        }
        if (!formData.password) formErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) {
            formErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.telephone) formErrors.telephone = 'Telephone is required';
        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await api.post('/register', formData);
                if (response.error) {
                    setErrors({ apiError: response.error });
                } else {
                    setSubmitted(true);
                    setFormData({
                        prenom: '',
                        nom: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        telephone: '',
                    });
                    setErrors({});
                }
            } catch (error) {
                setErrors({ apiError: 'An error occurred while submitting the form' });
            }
        } else {
            setErrors(formErrors);
        }
    };


    return (
        <div>
            <h2>Signup Form</h2>
            {submitted && <p>Form submitted successfully!</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Prenom</label>
                    <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                    />
                    {errors.prenom && <p>{errors.prenom}</p>}
                </div>
                <div>
                    <label>Nom</label>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                    />
                    {errors.nom && <p>{errors.nom}</p>}
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                </div>
                <div>
                    <label>Telephone</label>
                    <input
                        type="text"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                    />
                    {errors.telephone && <p>{errors.telephone}</p>}
                </div>
                <button type="submit">Sign Up</button>
                {errors.apiError && <p>{errors.apiError}</p>}
            </form>
        </div>
    );
}

export default SignupForm;
