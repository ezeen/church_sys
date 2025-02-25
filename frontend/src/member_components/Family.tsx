import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Grid, Card, CardContent, TextField } from '@mui/material';
import AddMember from './AddMember';
import { User } from '../types';
import api from '../utils/axiosConfig';
import { useAuth } from '../context/AuthContext';

interface Member extends User {
    isChild: boolean;
}

const Family = ({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) => {
    const [viewMode, setViewMode] = useState<'view' | 'add'>('view');
    const [members, setMembers] = useState<Member[]>([]);
    const [tempMembers, setTempMembers] = useState<Member[]>([]);

    const { user } = useAuth();

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await api.get('family-members/', config);
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        if (user) {
            fetchMembers();
        }
    }, [user]);
    
    if (!user) {
        return <div>Loading...</div>;
    }

    const currentUser = { is_primary: true };

    const handleSaveMembers = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    
            const responses = await Promise.all(tempMembers.map(member => 
                api.post('family-members/', {
                    ...member,
                    member_type: member.isChild ? 'child' : 'adult',
                    primary_user: user.email
                }, config)
            ));
            
            const newMembers = responses.map(response => response.data);
            setMembers([...members, ...tempMembers]);
            setTempMembers([]);
            alert('Members saved successfully!');
        } catch (error) {
            console.error('Error saving members:', error);
            alert('Error saving members');
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Family Management
            </Typography>

            <Typography variant="h4" gutterBottom>
                Welcome, {user.first_name} {user.last_name}
            </Typography>
            
            <div style={{ marginBottom: '1rem' }}>
                <Button 
                    variant={viewMode === 'view' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('view')}
                    sx={{ mr: 2 }}
                >
                    Show Members
                </Button>
                <Button 
                    variant={viewMode === 'add' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('add')}
                    disabled={!currentUser?.is_primary}
                >
                    Add Members
                </Button>
            </div>

            {viewMode === 'view' ? (
                <Grid container spacing={3}>
                    {members.map((member) => (
                        <MemberCard 
                            key={member.email}
                            member={member}
                            setMembers={setMembers}
                        />
                    ))}
                </Grid>
            ) : (
                <AddMember 
                    tempMembers={tempMembers}
                    setTempMembers={setTempMembers}
                    onSave={handleSaveMembers}
                />
            )}
        </Container>
    );
};

const MemberCard = ({ member, setMembers }: { member: Member, setMembers: Function }) => {
    const [editMode, setEditMode] = useState(false);
    const [idNumber, setIdNumber] = useState(member.id_number || '');
    
    const age = new Date().getFullYear() - new Date(member.dob).getFullYear();
    
    const handleUpdate = async () => {
        if (age >= 18 && idNumber) {
            try {
                await api.patch(`family-members/${member.email}/`, { id_number: idNumber });
                setMembers((prev: { email: string; }[]) => prev.map((m: { email: string; }) => 
                    m.email === member.email ? {...m, id_number: idNumber} : m
                ));
                setEditMode(false);
            } catch (error) {
                console.error('Update failed:', error);
            }
        }
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        {member.first_name} {member.last_name}
                    </Typography>
                    <Typography>Email: {member.email}</Typography>
                    <Typography>DOB: {new Date(member.dob).toLocaleDateString()}</Typography>
                    <Typography>District: {member.district}</Typography>
                    
                    {member.isChild ? (
                        age >= 18 && (
                            editMode ? (
                                <>
                                    <TextField
                                        label="ID Number"
                                        value={idNumber}
                                        onChange={(e) => setIdNumber(e.target.value)}
                                        size="small"
                                        sx={{ mt: 1 }}
                                    />
                                    <Button onClick={handleUpdate} size="small">
                                        Save
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={() => setEditMode(true)} size="small">
                                    Add ID Number
                                </Button>
                            )
                        )
                    ) : (
                        <Typography>ID: {member.id_number}</Typography>
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Family;