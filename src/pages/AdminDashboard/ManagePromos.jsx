import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import { Tag, Plus, Trash2, Percent, Ticket } from 'lucide-react';

const ManagePromos = () => {
    const [promos, setPromos] = useState([]);
    const [newPromo, setNewPromo] = useState({ code: '', discountPercent: '' });

    useEffect(() => {
        fetchPromos();
    }, []);

    const fetchPromos = async () => {
        const querySnapshot = await getDocs(collection(db, "promos"));
        setPromos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, "promos"), {
            ...newPromo,
            discountPercent: parseFloat(newPromo.discountPercent),
            active: true
        });
        setNewPromo({ code: '', discountPercent: '' });
        fetchPromos();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this promo code?")) {
            await deleteDoc(doc(db, "promos", id));
            fetchPromos();
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2rem)',
                    fontWeight: '700',
                    color: 'var(--color-text)',
                    marginBottom: '0.25rem'
                }}>
                    Promo Codes
                </h2>
                <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-secondary)'
                }}>
                    {promos.length} active promo code{promos.length !== 1 ? 's' : ''}
                </p>
            </div>

            <Card style={{ marginBottom: '2rem' }}>
                <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: 'var(--color-text)',
                    marginBottom: '1.5rem'
                }}>
                    Create New Promo Code
                </h3>
                <form onSubmit={handleCreate} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    alignItems: 'flex-end'
                }}>
                    <Input
                        label="Promo Code"
                        value={newPromo.code}
                        onChange={e => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })}
                        required
                        placeholder="SUMMER2024"
                    />
                    <Input
                        label="Discount Percentage"
                        type="number"
                        value={newPromo.discountPercent}
                        onChange={e => setNewPromo({ ...newPromo, discountPercent: e.target.value })}
                        required
                        placeholder="10"
                        min="1"
                        max="100"
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        style={{
                            marginBottom: '1.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Plus size={18} />
                        Add Promo
                    </Button>
                </form>
            </Card>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {promos.length === 0 ? (
                    <Card style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                        <Ticket size={48} style={{
                            color: 'var(--color-text-secondary)',
                            margin: '0 auto 1rem'
                        }} />
                        <p style={{
                            color: 'var(--color-text-secondary)',
                            fontSize: '1rem'
                        }}>
                            No promo codes yet. Create one to offer discounts.
                        </p>
                    </Card>
                ) : (
                    promos.map(promo => (
                        <Card key={promo.id} className="card-hover">
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
                                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                            borderRadius: 'var(--radius-md)',
                                            display: 'flex'
                                        }}>
                                            <Tag size={20} style={{ color: 'var(--color-secondary)' }} />
                                        </div>
                                        <div>
                                            <h3 style={{
                                                fontSize: '1.125rem',
                                                fontWeight: '600',
                                                color: 'var(--color-text)',
                                                fontFamily: 'monospace',
                                                letterSpacing: '1px'
                                            }}>
                                                {promo.code}
                                            </h3>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                color: 'var(--color-text-secondary)',
                                                fontSize: '0.9375rem',
                                                marginTop: '0.25rem'
                                            }}>
                                                <Percent size={16} />
                                                <span style={{ fontWeight: '600', color: 'var(--color-secondary)' }}>
                                                    {promo.discountPercent}% Off
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(promo.id)}
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
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default ManagePromos;
