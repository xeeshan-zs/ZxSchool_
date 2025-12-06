import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import { Plus, BookOpen, Trash2, Edit2, X, LogOut } from 'lucide-react';

const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [newCourse, setNewCourse] = useState({ title: '', description: '', fee: '', image: '' });
    const [editForm, setEditForm] = useState({ title: '', description: '', fee: '', image: '' });
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourses(list);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "courses"), {
                ...newCourse,
                fee: parseFloat(newCourse.fee),
                active: true
            });
            setIsCreating(false);
            setNewCourse({ title: '', description: '', fee: '', image: '' });
            fetchCourses();
        } catch (error) {
            console.error("Error adding course: ", error);
        }
    };

    const handleEdit = (course) => {
        setEditingCourse(course.id);
        setEditForm({
            title: course.title,
            description: course.description,
            fee: course.fee.toString(),
            image: course.image || ''
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, "courses", editingCourse), {
                ...editForm,
                fee: parseFloat(editForm.fee)
            });
            setEditingCourse(null);
            setEditForm({ title: '', description: '', fee: '', image: '' });
            fetchCourses();
        } catch (error) {
            console.error("Error updating course: ", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            await deleteDoc(doc(db, "courses", id));
            fetchCourses();
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div className="admin-header" style={{
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
                        marginBottom: '0.25rem'
                    }}>
                        All Courses
                    </h2>
                    <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text-secondary)'
                    }}>
                        {courses.length} course{courses.length !== 1 ? 's' : ''} available
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Button
                        variant="primary"
                        onClick={() => setIsCreating(true)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Plus size={18} />
                        Add Course
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleLogout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: 'var(--color-danger)',
                            borderColor: 'var(--color-danger)'
                        }}
                    >
                        <LogOut size={18} />
                        Logout
                    </Button>
                </div>
            </div>

            {isCreating && (
                <Card style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: 'var(--color-text)',
                        marginBottom: '1.5rem'
                    }}>
                        Create New Course
                    </h3>
                    <form onSubmit={handleCreate}>
                        <Input
                            label="Course Title"
                            value={newCourse.title}
                            onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
                            required
                            placeholder="e.g., Web Development Bootcamp"
                        />
                        <Input
                            label="Description"
                            value={newCourse.description}
                            onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
                            required
                            placeholder="Brief description of the course"
                        />
                        <Input
                            label="Fee (PKR)"
                            type="number"
                            value={newCourse.fee}
                            onChange={e => setNewCourse({ ...newCourse, fee: e.target.value })}
                            required
                            placeholder="15000"
                        />
                        <Input
                            label="Image URL (Optional)"
                            value={newCourse.image}
                            onChange={e => setNewCourse({ ...newCourse, image: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                        />
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <Button type="submit" variant="primary">Save Course</Button>
                            <Button type="button" variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
                        </div>
                    </form>
                </Card>
            )}

            {/* Edit Modal */}
            {editingCourse && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                }}>
                    <Card style={{
                        maxWidth: '600px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflow: 'auto'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1.5rem'
                        }}>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                color: 'var(--color-text)'
                            }}>
                                Edit Course
                            </h3>
                            <button
                                onClick={() => setEditingCourse(null)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0.5rem',
                                    color: 'var(--color-text-secondary)',
                                    display: 'flex'
                                }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate}>
                            <Input
                                label="Course Title"
                                value={editForm.title}
                                onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                required
                                placeholder="e.g., Web Development Bootcamp"
                            />
                            <Input
                                label="Description"
                                value={editForm.description}
                                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                required
                                placeholder="Brief description of the course"
                            />
                            <Input
                                label="Fee (PKR)"
                                type="number"
                                value={editForm.fee}
                                onChange={e => setEditForm({ ...editForm, fee: e.target.value })}
                                required
                                placeholder="15000"
                            />
                            <Input
                                label="Image URL (Optional)"
                                value={editForm.image}
                                onChange={e => setEditForm({ ...editForm, image: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                            />
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <Button type="submit" variant="primary" style={{ flex: 1 }}>
                                    Update Course
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setEditingCourse(null)}
                                    style={{ flex: 1 }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}

            <div style={{ display: 'grid', gap: '1rem' }}>
                {courses.length === 0 ? (
                    <Card style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                        <BookOpen size={48} style={{
                            color: 'var(--color-text-secondary)',
                            margin: '0 auto 1rem'
                        }} />
                        <p style={{
                            color: 'var(--color-text-secondary)',
                            fontSize: '1rem'
                        }}>
                            No courses yet. Click "Add Course" to create one.
                        </p>
                    </Card>
                ) : (
                    courses.map(course => (
                        <Card key={course.id} className="card-hover">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '1rem'
                            }}>
                                <div style={{ flex: 1, minWidth: '200px' }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <div style={{
                                            padding: '0.5rem',
                                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                            borderRadius: 'var(--radius-md)',
                                            display: 'flex'
                                        }}>
                                            <BookOpen size={20} style={{ color: 'var(--color-primary)' }} />
                                        </div>
                                        <h3 style={{
                                            fontSize: '1.125rem',
                                            fontWeight: '600',
                                            color: 'var(--color-text)'
                                        }}>
                                            {course.title}
                                        </h3>
                                    </div>
                                    <div style={{
                                        color: 'var(--color-text-secondary)',
                                        fontSize: '0.9375rem'
                                    }}>
                                        <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>
                                            {course.fee} PKR
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleEdit(course)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        <Edit2 size={16} />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(course.id)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default ManageCourses;
