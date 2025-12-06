import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { uploadInstructorImage, deleteInstructorImage } from '../../services/uploadService';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import { UserCircle, Plus, Trash2, Edit2, Save, X, Upload, Tag } from 'lucide-react';

const ManageInstructors = () => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        brief: '',
        skills: '',
        imageUrl: '',
        imageFile: null
    });

    useEffect(() => {
        fetchInstructors();
    }, []);

    const fetchInstructors = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'instructors'), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            setInstructors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.error('Error fetching instructors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, imageFile: file });
            // Preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = formData.imageUrl;

            // Upload new image if file selected
            if (formData.imageFile) {
                imageUrl = await uploadInstructorImage(formData.imageFile);
            }

            const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);

            const instructorData = {
                name: formData.name,
                brief: formData.brief,
                skills: skillsArray,
                imageUrl,
                updatedAt: serverTimestamp()
            };

            if (editingId) {
                // Update existing
                await updateDoc(doc(db, 'instructors', editingId), instructorData);
                setEditingId(null);
            } else {
                // Add new
                await addDoc(collection(db, 'instructors'), {
                    ...instructorData,
                    createdAt: serverTimestamp()
                });
                setIsAdding(false);
            }

            // Reset form
            setFormData({ name: '', brief: '', skills: '', imageUrl: '', imageFile: null });
            fetchInstructors();
        } catch (error) {
            console.error('Error saving instructor:', error);
            alert('Failed to save instructor');
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = (instructor) => {
        setEditingId(instructor.id);
        setFormData({
            name: instructor.name,
            brief: instructor.brief,
            skills: instructor.skills.join(', '),
            imageUrl: instructor.imageUrl,
            imageFile: null
        });
        setIsAdding(true);
    };

    const handleDelete = async (instructor) => {
        if (!window.confirm(`Delete instructor "${instructor.name}"?`)) return;

        try {
            // Delete image from storage
            if (instructor.imageUrl) {
                await deleteInstructorImage(instructor.imageUrl);
            }

            // Delete document
            await deleteDoc(doc(db, 'instructors', instructor.id));
            fetchInstructors();
        } catch (error) {
            console.error('Error deleting instructor:', error);
            alert('Failed to delete instructor');
        }
    };

    const cancelEdit = () => {
        setIsAdding(false);
        setEditingId(null);
        setFormData({ name: '', brief: '', skills: '', imageUrl: '', imageFile: null });
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div>
                    <h2 style={{
                        fontSize: 'clamp(1.75rem, 3vw, 2rem)',
                        fontWeight: '700',
                        color: 'var(--color-text)',
                        marginBottom: '0.5rem'
                    }}>
                        Manage Instructors
                    </h2>
                    <p style={{
                        fontSize: '0.9375rem',
                        color: 'var(--color-text-secondary)'
                    }}>
                        {instructors.length} instructor{instructors.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {!isAdding && (
                    <Button
                        variant="primary"
                        onClick={() => setIsAdding(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Plus size={18} />
                        Add Instructor
                    </Button>
                )}
            </div>

            {/* Add/Edit Form */}
            {isAdding && (
                <Card style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: 'var(--color-text)',
                        marginBottom: '1.5rem'
                    }}>
                        {editingId ? 'Edit Instructor' : 'Add New Instructor'}
                    </h3>

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {/* Image Upload */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: 'var(--color-text)',
                                    marginBottom: '0.5rem'
                                }}>
                                    Profile Image
                                </label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    {formData.imageUrl && (
                                        <img
                                            src={formData.imageUrl}
                                            alt="Preview"
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                border: '2px solid var(--color-border)'
                                            }}
                                        />
                                    )}
                                    <label style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1.5rem',
                                        backgroundColor: 'var(--color-bg-secondary)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        color: 'var(--color-text)',
                                        transition: 'all 0.2s'
                                    }}>
                                        <Upload size={16} />
                                        Choose Image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Name */}
                            <Input
                                label="Name *"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                placeholder="e.g., John Doe"
                            />

                            {/* Brief */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: 'var(--color-text)',
                                    marginBottom: '0.5rem'
                                }}>
                                    Title/Brief *
                                </label>
                                <input
                                    type="text"
                                    value={formData.brief}
                                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                                    required
                                    placeholder="e.g., Programming Instructor & Software Developer"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        fontSize: '0.9375rem',
                                        color: 'var(--color-text)',
                                        backgroundColor: 'var(--color-bg)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: 'var(--radius-md)'
                                    }}
                                />
                            </div>

                            {/* Skills */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: 'var(--color-text)',
                                    marginBottom: '0.5rem'
                                }}>
                                    Skills (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={formData.skills}
                                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                    placeholder="e.g., Educator, Full Stack Developer, React Expert"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        fontSize: '0.9375rem',
                                        color: 'var(--color-text)',
                                        backgroundColor: 'var(--color-bg)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: 'var(--radius-md)'
                                    }}
                                />
                            </div>

                            {/* Buttons */}
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={uploading}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <Save size={16} />
                                    {uploading ? 'Saving...' : (editingId ? 'Update' : 'Add')} Instructor
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={cancelEdit}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <X size={16} />
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </form>
                </Card>
            )}

            {/* Instructors List */}
            {loading ? (
                <Card style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                    <div className="skeleton" style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        margin: '0 auto'
                    }} />
                </Card>
            ) : instructors.length === 0 ? (
                <Card style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                    <UserCircle size={48} style={{ color: 'var(--color-text-secondary)', margin: '0 auto 1rem' }} />
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        No instructors yet. Click "Add Instructor" to create one.
                    </p>
                </Card>
            ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {instructors.map(instructor => (
                        <Card key={instructor.id} className="card-hover">
                            <div style={{
                                display: 'flex',
                                gap: '1.5rem',
                                alignItems: 'flex-start'
                            }}>
                                {/* Image */}
                                {instructor.imageUrl ? (
                                    <img
                                        src={instructor.imageUrl}
                                        alt={instructor.name}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '3px solid var(--color-border)',
                                            flexShrink: 0
                                        }}
                                    />
                                ) : (
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--color-bg-secondary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <UserCircle size={48} style={{ color: 'var(--color-text-secondary)' }} />
                                    </div>
                                )}

                                {/* Info */}
                                <div style={{ flex: 1 }}>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: '700',
                                        color: 'var(--color-text)',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {instructor.name}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.9375rem',
                                        color: 'var(--color-text-secondary)',
                                        marginBottom: '1rem'
                                    }}>
                                        {instructor.brief}
                                    </p>

                                    {/* Skills */}
                                    {instructor.skills && instructor.skills.length > 0 && (
                                        <div style={{
                                            display: 'flex',
                                            gap: '0.5rem',
                                            flexWrap: 'wrap',
                                            marginBottom: '1rem'
                                        }}>
                                            {instructor.skills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    style={{
                                                        padding: '0.25rem 0.75rem',
                                                        backgroundColor: 'var(--color-bg-secondary)',
                                                        border: '1px solid var(--color-border)',
                                                        borderRadius: 'var(--radius-sm)',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '500',
                                                        color: 'var(--color-text-secondary)'
                                                    }}
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <Button
                                            variant="outline"
                                            onClick={() => handleEdit(instructor)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            <Edit2 size={14} />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => handleDelete(instructor)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                fontSize: '0.875rem',
                                                color: 'var(--color-danger)',
                                                borderColor: 'var(--color-danger)'
                                            }}
                                        >
                                            <Trash2 size={14} />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageInstructors;
