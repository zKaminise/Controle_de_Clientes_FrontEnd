import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/home');
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                alert(`Erro ao fazer login: ${error.response?.data?.message || 'Erro desconhecido'}`);
            } else {
                alert('Erro ao fazer login. Verifique suas credenciais.');
            }
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: 'url(/path/to/background.jpg)', backgroundSize: 'cover' }}>
            <div className="p-4 bg-white rounded shadow">
                <h2 className="mb-4">Login</h2>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite seu usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" className="w-100 mb-2" onClick={handleLogin}>Entrar</Button>
                    <Button variant="secondary" className="w-100 mb-2" onClick={() => navigate('/register')}>Cadastrar-se</Button>
                    <Button variant="link" className="w-100" onClick={() => navigate('/forgot-password')}>Esqueci a senha</Button>
                </Form>
            </div>
        </Container>
    );
};

export default Login;