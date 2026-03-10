import React, { useState } from 'react';

const UserForm = ({ onUserAdded }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        email: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        try {
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setMessage({ type: 'success', text: '¡Usuario creado con éxito!' });
                setFormData({ firstName: '', lastName: '', age: '', email: '' });
                if (onUserAdded) onUserAdded();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al crear usuario');
            }
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(15px)',
            padding: '30px',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
            <h2 style={{ color: 'white', margin: '0 0 10px 0', textAlign: 'center' }}>Nuevo Usuario</h2>

            <input
                name="firstName" placeholder="Nombre" value={formData.firstName} onChange={handleChange} required
                style={inputStyle}
            />
            <input
                name="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleChange} required
                style={inputStyle}
            />
            <input
                name="age" type="number" placeholder="Edad" value={formData.age} onChange={handleChange} required
                style={inputStyle}
            />
            <input
                name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required
                style={inputStyle}
            />

            <button type="submit" disabled={submitting} style={{
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                opacity: submitting ? 0.7 : 1
            }}>
                {submitting ? 'Guardando...' : 'Crear Usuario'}
            </button>

            {message && (
                <p style={{
                    textAlign: 'center',
                    color: message.type === 'success' ? '#00f2fe' : '#ff4b2b',
                    margin: '10px 0 0 0',
                    fontSize: '0.9rem'
                }}>
                    {message.text}
                </p>
            )}
        </form>
    );
};

const inputStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    outline: 'none'
};

export default UserForm;
