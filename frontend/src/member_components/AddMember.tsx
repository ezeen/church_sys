import React, { useState } from 'react';
import { Button, Grid, TextField, Typography, Card, CardContent } from '@mui/material';
import { Member } from '../types';

const AddMember = ({ tempMembers, setTempMembers, onSave }: { 
    tempMembers: Member[], 
    setTempMembers: Function,
    onSave: Function 
}) => {
    const [memberType, setMemberType] = useState<'adult' | 'child'>();
    const [newMember, setNewMember] = useState<Partial<Member>>({});

    const handleAdd = () => {
        // Validate required fields based on member type
        const requiredFields = {
          adult: ['first_name', 'last_name', 'dob', 'district', 'id_number', 'email'],
          child: ['first_name', 'last_name', 'dob', 'district']
        };
      
        const missingFields = memberType === 'adult' 
          ? requiredFields.adult.filter(field => !newMember[field as keyof typeof newMember])
          : requiredFields.child.filter(field => !newMember[field as keyof typeof newMember]);
      
        if (missingFields.length > 0) {
          alert(`Missing required fields: ${missingFields.join(', ')}`);
          return;
        }
      
        // Format date to YYYY-MM-DD
        const formattedDob = new Date(newMember.dob!).toISOString().split('T')[0];
      
        setTempMembers([...tempMembers, {
          ...newMember as Member,
          dob: formattedDob,
          isChild: memberType === 'child'
        }]);
        
        setNewMember({});
        setMemberType(undefined);
    };

    // Date validation
    const isValidDate = (dateString: string): boolean => {
        const regex = /^\d{2}-\d{2}-\d{4}$/;
        if (!regex.test(dateString)) return false;
        
        const [month, day, year] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && 
            date.getMonth() === month - 1 && 
            date.getDate() === day;
    };

    // Date formatting
    const formatDateToISO = (dateString: string): string => {
        const [month, day, year] = dateString.split('-');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    return (
        <div>
            <div style={{ marginBottom: '1rem' }}>
                <Button 
                    variant={memberType === 'adult' ? 'contained' : 'outlined'}
                    onClick={() => setMemberType('adult')}
                    sx={{ mr: 2 }}
                >
                    Add Adult
                </Button>
                <Button 
                    variant={memberType === 'child' ? 'contained' : 'outlined'}
                    onClick={() => setMemberType('child')}
                >
                    Add Child
                </Button>
            </div>

            {memberType && (
                <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="First Name"
                                    fullWidth
                                    value={newMember.first_name || ''}
                                    onChange={(e) => setNewMember({...newMember, first_name: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Last Name"
                                    fullWidth
                                    value={newMember.last_name || ''}
                                    onChange={(e) => setNewMember({...newMember, last_name: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    fullWidth
                                    type="email"
                                    value={newMember.email || ''}
                                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                                    disabled={memberType === 'child'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Date of Birth"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={newMember.dob || ''}
                                    onChange={(e) => setNewMember({...newMember, dob: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="District"
                                    fullWidth
                                    value={newMember.district || ''}
                                    onChange={(e) => setNewMember({...newMember, district: e.target.value})}
                                />
                            </Grid>
                            {memberType === 'adult' && (
                                <Grid item xs={12}>
                                    <TextField
                                        label="ID Number"
                                        fullWidth
                                        value={newMember.id_number || ''}
                                        onChange={(e) => setNewMember({...newMember, id_number: e.target.value})}
                                    />
                                </Grid>
                            )}
                        </Grid>
                        <Button 
                            variant="contained" 
                            onClick={handleAdd}
                            sx={{ mt: 2 }}
                        >
                            Add {memberType?.toUpperCase()} to Batch
                        </Button>
                    </CardContent>
                </Card>
            )}

            {tempMembers.length > 0 && (
                <>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Members to be added ({tempMembers.length})
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="success" 
                        onClick={() => onSave()}
                        sx={{ mt: 1 }}
                    >
                        Save All Members
                    </Button>
                </>
            )}
        </div>
    );
};

export default AddMember;