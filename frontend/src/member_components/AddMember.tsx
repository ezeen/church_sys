import React, { useState } from 'react';
import { Button, Grid, TextField, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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
            adult: ['first_name', 'last_name', 'dob', 'district', 'id_number', 'email', 'family_rank'],
            child: ['first_name', 'last_name', 'dob', 'district', 'family_rank']
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
      
        // Format phone number if provided
        const formattedPhoneNumber = newMember.phone_number?.startsWith('0') 
            ? `+254${newMember.phone_number.slice(1)}` 
            : newMember.phone_number;

        setTempMembers([...tempMembers, {
            ...newMember as Member,
            dob: formattedDob,
            phone_number: formattedPhoneNumber,
            isChild: memberType === 'child'
        }]);
        
        setNewMember({});
        setMemberType(undefined);
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
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Family Rank</InputLabel>
                                    <Select
                                        value={newMember.family_rank || ''}
                                        label="Family Rank"
                                        onChange={(e) => setNewMember({...newMember, family_rank: e.target.value as string})}
                                    >
                                        <MenuItem value="Father">Father</MenuItem>
                                        <MenuItem value="Mother">Mother</MenuItem>
                                        <MenuItem value="Son">Son</MenuItem>
                                        <MenuItem value="Daughter">Daughter</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Phone Number"
                                    fullWidth
                                    value={newMember.phone_number || ''}
                                    onChange={(e) => setNewMember({...newMember, phone_number: e.target.value})}
                                    inputProps={{ pattern: "^0[0-9]{9}$", title: "Phone number must start with 0 and be 10 digits long (e.g., 0712345678)" }}
                                    helperText={memberType === 'child' ? "Optional" : "Enter your phone number starting with 0 (e.g., 0712345678)"}
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