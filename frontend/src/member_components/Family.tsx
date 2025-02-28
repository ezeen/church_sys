import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Grid, Card, CardContent} from '@mui/material';
import AddMember from './AddMember';
import { User } from '../types';
import api from '../utils/axiosConfig';
import { useAuth } from '../context/AuthContext';

interface Member extends User {
    family_rank: string;
    phone_number: string;
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
                    primary_user: user.email,
                    family_rank: member.family_rank, // Add family_rank
                    phone_number: member.phone_number?.startsWith('0') 
                        ? `+254${member.phone_number.slice(1)}` 
                        : member.phone_number // Format phone number
                }, config)
            ));
            
            const newMembers = responses.map(response => response.data);
            setMembers([...members, ...newMembers]);
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
    
    const age = new Date().getFullYear() - new Date(member.dob).getFullYear();

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
                    <Typography>Family Rank: {member.family_rank}</Typography>
                    <Typography>Phone: {member.phone_number}</Typography>
                    <Typography>ID: {member.id_number}</Typography>
                    
                    {/* Keep the Edit button for future functionality */}
                    <Button size="small" sx={{ mt: 1 }}>
                        Edit
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Family;