import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlans, type PlanDuration } from '../context/PlansContext';
import { useTeam, type TeamMember } from '../context/TeamContext';
import { useGallery } from '../context/GalleryContext';
import { Save, LogOut, ArrowLeft, Plus, X, ChevronDown, ChevronUp, Upload, Image as ImageIcon, Users, DollarSign } from 'lucide-react';
import { Header } from '../components/Header';
import { Toast } from '../components/Toast';

type Tab = 'plans' | 'gallery' | 'team';

export const Dashboard = () => {
    const { plans, updatePlanPrice, updatePlanFeatures } = usePlans();
    const { team, addTeamMember, updateTeamMember, removeTeamMember } = useTeam();
    const { images, addImage, removeImage } = useGallery();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('plans');
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    // Plans state
    const [localPrices, setLocalPrices] = useState<{ [key in PlanDuration]: string }>({
        monthly: '',
        quarterly: '',
        yearly: ''
    });
    const [localFeatures, setLocalFeatures] = useState<{ [key in PlanDuration]: string[] }>({
        monthly: [],
        quarterly: [],
        yearly: []
    });
    const [expandedPlan, setExpandedPlan] = useState<PlanDuration | null>(null);
    const [newFeature, setNewFeature] = useState<{ [key in PlanDuration]: string }>({
        monthly: '',
        quarterly: '',
        yearly: ''
    });

    // Team state
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [newMember, setNewMember] = useState({ name: '', role: '', photo: '' });
    const teamFileInputRef = useRef<HTMLInputElement>(null);
    const galleryFileInputRef = useRef<HTMLInputElement>(null);

    // Pending uploads
    const [pendingGalleryImage, setPendingGalleryImage] = useState<File | null>(null);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            navigate('/login');
        }

        const initialPrices = {
            monthly: plans.find(p => p.id === 'monthly')?.price || '',
            quarterly: plans.find(p => p.id === 'quarterly')?.price || '',
            yearly: plans.find(p => p.id === 'yearly')?.price || ''
        };
        const initialFeatures = {
            monthly: plans.find(p => p.id === 'monthly')?.features || [],
            quarterly: plans.find(p => p.id === 'quarterly')?.features || [],
            yearly: plans.find(p => p.id === 'yearly')?.features || []
        };
        setLocalPrices(initialPrices);
        setLocalFeatures(initialFeatures);
    }, [navigate, plans]);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    const showSuccessToast = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
    };

    // Plans handlers
    const handleSavePrice = async (id: PlanDuration) => {
        try {
            await updatePlanPrice(id, localPrices[id]);
            showSuccessToast('Preço atualizado com sucesso!');
        } catch (e) {
            showSuccessToast('Erro ao atualizar preço!');
        }
    };

    const handleSaveFeatures = async (id: PlanDuration) => {
        try {
            await updatePlanFeatures(id, localFeatures[id]);
            showSuccessToast('Benefícios atualizados com sucesso!');
        } catch (e) {
            showSuccessToast('Erro ao atualizar benefícios!');
        }
    };

    const handleAddFeature = (id: PlanDuration) => {
        if (newFeature[id].trim()) {
            setLocalFeatures(prev => ({
                ...prev,
                [id]: [...prev[id], newFeature[id].trim()]
            }));
            setNewFeature(prev => ({ ...prev, [id]: '' }));
        }
    };

    const handleRemoveFeature = (id: PlanDuration, index: number) => {
        setLocalFeatures(prev => ({
            ...prev,
            [id]: prev[id].filter((_, i) => i !== index)
        }));
    };

    // Gallery handlers
    const handleGalleryImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && images.length < 10) {
            setPendingGalleryImage(file);
        }
        if (galleryFileInputRef.current) {
            galleryFileInputRef.current.value = '';
        }
    };

    const confirmGalleryUpload = () => {
        if (pendingGalleryImage) {
            addImage(pendingGalleryImage)
                .then(() => {
                    setPendingGalleryImage(null);
                    showSuccessToast('Imagem adicionada com sucesso!');
                })
                .catch(() => showSuccessToast('Erro ao adicionar imagem!'));
        }
    };

    const cancelGalleryUpload = () => {
        setPendingGalleryImage(null);
    };

    // Team handlers
    const [newMemberPhotoFile, setNewMemberPhotoFile] = useState<File | null>(null);
    const [editingMemberPhotoFile, setEditingMemberPhotoFile] = useState<File | null>(null);
    const handleTeamPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
        const file = e.target.files?.[0];
        if (file) {
            if (isEdit && editingMember) {
                setEditingMemberPhotoFile(file);
                setEditingMember({ ...editingMember, photo: URL.createObjectURL(file) });
            } else {
                setNewMemberPhotoFile(file);
                setNewMember({ ...newMember, photo: URL.createObjectURL(file) });
            }
        }
    };

    const handleAddTeamMember = () => {
        if (newMember.name && newMember.role && newMemberPhotoFile) {
            addTeamMember(newMember.name, newMember.role, newMemberPhotoFile)
                .then(() => {
                    setNewMember({ name: '', role: '', photo: '' });
                    setNewMemberPhotoFile(null);
                    showSuccessToast('Membro adicionado com sucesso!');
                })
                .catch(() => showSuccessToast('Erro ao adicionar membro!'));
        }
    };

    const handleUpdateTeamMember = () => {
        if (editingMember) {
            updateTeamMember(
                editingMember.id,
                editingMember.name,
                editingMember.role,
                editingMemberPhotoFile || undefined
            )
                .then(() => {
                    setEditingMember(null);
                    setEditingMemberPhotoFile(null);
                    showSuccessToast('Membro atualizado com sucesso!');
                })
                .catch(() => showSuccessToast('Erro ao atualizar membro!'));
        }
    };

    return (
        <div className="min-h-screen bg-dark text-white">
            <Header />
            <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
            <div className="pt-24 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-12">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <ArrowLeft />
                            </button>
                            <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <LogOut size={20} />
                            Sair
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4 mb-8 border-b border-gray-800">
                        <button
                            onClick={() => setActiveTab('plans')}
                            className={`flex items-center gap-2 px-6 py-3 font-bold transition-colors ${activeTab === 'plans'
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <DollarSign size={20} />
                            Planos
                        </button>
                        <button
                            onClick={() => setActiveTab('gallery')}
                            className={`flex items-center gap-2 px-6 py-3 font-bold transition-colors ${activeTab === 'gallery'
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <ImageIcon size={20} />
                            Galeria ({images.length}/10)
                        </button>
                        <button
                            onClick={() => setActiveTab('team')}
                            className={`flex items-center gap-2 px-6 py-3 font-bold transition-colors ${activeTab === 'team'
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <Users size={20} />
                            Equipe ({team.length})
                        </button>
                    </div>

                    {/* Plans Tab */}
                    {activeTab === 'plans' && (
                        <div className="grid gap-6">
                            {plans.map((plan) => (
                                <div key={plan.id} className="bg-dark-lighter rounded-xl border border-gray-800">
                                    <div className="p-6 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${plan.highlight ? 'bg-primary text-black' : 'bg-gray-800 text-white'}`}>
                                                <plan.icon size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">{plan.name}</h3>
                                                <p className="text-gray-400 text-sm">{localFeatures[plan.id].length} benefícios</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                                                <input
                                                    type="text"
                                                    value={localPrices[plan.id]}
                                                    onChange={(e) => setLocalPrices(prev => ({ ...prev, [plan.id]: e.target.value }))}
                                                    className="bg-dark border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary w-32"
                                                />
                                            </div>
                                            <button
                                                onClick={() => handleSavePrice(plan.id)}
                                                className="bg-primary hover:bg-primary-hover text-black px-4 py-2 rounded-lg transition-colors font-bold"
                                            >
                                                Salvar Preço
                                            </button>
                                            <button
                                                onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                                                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                                            >
                                                {expandedPlan === plan.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    {expandedPlan === plan.id && (
                                        <div className="border-t border-gray-800 p-6">
                                            <h4 className="text-lg font-bold mb-4">Benefícios</h4>
                                            <div className="space-y-3 mb-4">
                                                {localFeatures[plan.id].map((feature, index) => (
                                                    <div key={index} className="flex items-center gap-3 bg-dark p-3 rounded-lg">
                                                        <span className="flex-1 text-gray-300">{feature}</span>
                                                        <button
                                                            onClick={() => handleRemoveFeature(plan.id, index)}
                                                            className="text-red-500 hover:text-red-400 transition-colors"
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex gap-3">
                                                <input
                                                    type="text"
                                                    value={newFeature[plan.id]}
                                                    onChange={(e) => setNewFeature(prev => ({ ...prev, [plan.id]: e.target.value }))}
                                                    onKeyPress={(e) => e.key === 'Enter' && handleAddFeature(plan.id)}
                                                    placeholder="Adicionar novo benefício..."
                                                    className="flex-1 bg-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                                />
                                                <button
                                                    onClick={() => handleAddFeature(plan.id)}
                                                    className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                                                >
                                                    <Plus size={18} />
                                                    Adicionar
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => handleSaveFeatures(plan.id)}
                                                className="mt-4 w-full bg-primary hover:bg-primary-hover text-black py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Save size={18} />
                                                Salvar Benefícios
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Gallery Tab */}
                    {activeTab === 'gallery' && (
                        <div>
                            {/* Upload Section */}
                            <div className="mb-6">
                                <input
                                    ref={galleryFileInputRef}
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    onChange={handleGalleryImageSelect}
                                    className="hidden"
                                />

                                {pendingGalleryImage ? (
                                    <div className="bg-dark-lighter p-6 rounded-xl border border-gray-800">
                                        <h3 className="text-lg font-bold mb-4">Pré-visualização da Imagem</h3>
                                        <div className="aspect-video rounded-lg overflow-hidden bg-gray-800 mb-4 max-w-md">
                                            <img src={URL.createObjectURL(pendingGalleryImage)} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={confirmGalleryUpload}
                                                className="flex-1 bg-primary hover:bg-primary-hover text-black px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Upload size={20} />
                                                Confirmar Upload
                                            </button>
                                            <button
                                                onClick={cancelGalleryUpload}
                                                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => galleryFileInputRef.current?.click()}
                                        disabled={images.length >= 10}
                                        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-black px-6 py-3 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Upload size={20} />
                                        Selecionar Imagem ({images.length}/10)
                                    </button>
                                )}
                            </div>

                            {/* Gallery Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {images.map((img, index) => (
                                    <div key={index} className="relative group aspect-video rounded-lg overflow-hidden bg-gray-800">
                                        <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => removeImage(img)}
                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Team Tab */}
                    {activeTab === 'team' && (
                        <div>
                            {/* Add New Member */}
                            <div className="bg-dark-lighter p-6 rounded-xl border border-gray-800 mb-6">
                                <h3 className="text-xl font-bold mb-4">Adicionar Membro da Equipe</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Nome"
                                        value={newMember.name}
                                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                        className="bg-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Função"
                                        value={newMember.role}
                                        onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                                        className="bg-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                    />
                                    <div>
                                        <input
                                            ref={teamFileInputRef}
                                            type="file"
                                            accept="image/png,image/jpeg,image/jpg,image/webp"
                                            onChange={(e) => handleTeamPhotoUpload(e, false)}
                                            className="hidden"
                                        />
                                        <button
                                            onClick={() => teamFileInputRef.current?.click()}
                                            className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            {newMember.photo ? 'Foto Selecionada ✓' : 'Selecionar Foto'}
                                        </button>
                                    </div>
                                </div>

                                {/* Photo Preview */}
                                {newMember.photo && (
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-400 mb-2">Pré-visualização:</p>
                                        <div className="aspect-square w-32 rounded-lg overflow-hidden bg-gray-800">
                                            <img src={newMember.photo} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={handleAddTeamMember}
                                    disabled={!newMember.name || !newMember.role || !newMember.photo}
                                    className="w-full bg-primary hover:bg-primary-hover text-black py-3 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <Plus size={18} />
                                    Adicionar Membro
                                </button>
                            </div>

                            {/* Team Members List */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {team.map((member) => (
                                    <div key={member.id} className="bg-dark-lighter rounded-xl overflow-hidden border border-gray-800">
                                        {editingMember?.id === member.id ? (
                                            <div className="p-4">
                                                <div className="aspect-square bg-gray-800 rounded-lg mb-4 overflow-hidden">
                                                    <img src={editingMember.photo} alt={editingMember.name} className="w-full h-full object-cover" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={editingMember.name}
                                                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                                                    className="w-full bg-dark border border-gray-700 rounded-lg px-3 py-2 text-white mb-2 focus:outline-none focus:border-primary"
                                                />
                                                <input
                                                    type="text"
                                                    value={editingMember.role}
                                                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                                                    className="w-full bg-dark border border-gray-700 rounded-lg px-3 py-2 text-white mb-2 focus:outline-none focus:border-primary"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleUpdateTeamMember}
                                                        className="flex-1 bg-primary hover:bg-primary-hover text-black py-2 rounded-lg font-bold transition-colors"
                                                    >
                                                        Salvar
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingMember(null)}
                                                        className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg font-bold transition-colors"
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="aspect-square bg-gray-800">
                                                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                                                    <p className="text-primary text-sm mb-4">{member.role}</p>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setEditingMember(member)}
                                                            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg font-bold transition-colors"
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            onClick={() => removeTeamMember(member.id)}
                                                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-bold transition-colors"
                                                        >
                                                            Remover
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
