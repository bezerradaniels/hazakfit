import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple mock authentication
        if (username === 'admin' && password === 'hazak123') {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/admin');
        } else {
            setError('Credenciais inválidas');
        }
    };

    return (
        <div className="min-h-screen bg-dark">
            <Header />
            <div className="flex items-center justify-center px-4 py-20 pt-32">
                <div className="bg-dark-lighter p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
                    >
                        <ArrowLeft size={20} />
                        Voltar para o site
                    </button>

                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="text-black w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Área Administrativa</h2>
                        <p className="text-gray-400 mt-2">Faça login para gerenciar os planos</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Usuário</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="Digite seu usuário"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Senha</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="Digite sua senha"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-hover text-black font-bold py-3 rounded-lg transition-colors"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
