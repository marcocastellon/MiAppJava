import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import UserForm from './UserForm';

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = () => {
        setLoading(true);
        fetch('http://localhost:8080/api/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al conectar con la API');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
        }}>
            <h1 style={{ color: 'white', fontFamily: 'sans-serif', marginBottom: '20px' }}>
                Sistema de Gestión de Usuarios
            </h1>

            {/* Formulario para añadir usuarios */}
            <UserForm onUserAdded={fetchUsers} />

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <h2 style={{ color: 'white', opacity: 0.9, marginBottom: '20px' }}>Listado de Usuarios</h2>
                {loading && <p style={{ color: 'white' }}>Cargando usuarios reales desde SQL Server...</p>}
                {error && <p style={{ color: '#ff4b2b' }}>Error: {error}</p>}

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '20px'
                }}>
                    {!loading && !error && users.map(user => (
                        <UserCard
                            key={user.userId}
                            name={`${user.firstName} ${user.lastName}`}
                            age={user.age}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
