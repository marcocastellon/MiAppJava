import React from 'react';

const UserCard = ({ name, age, ...props }) => (
    <div
        style={{
            padding: '20px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            maxWidth: '300px',
            fontFamily: 'sans-serif',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
        }}
        {...props}
    >
        <h2 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>{name}</h2>
        <p style={{ margin: 0, opacity: 0.8 }}>{`${name} tiene ${age} años`}</p>
    </div>
);

export default UserCard;
