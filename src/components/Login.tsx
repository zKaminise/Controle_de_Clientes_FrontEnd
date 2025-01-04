import React, { useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/home');
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(`${error.response?.data?.message || 'Usuário ou senha inválidos'}`);
            } else {
                toast.error('Erro ao fazer login. Verifique suas credenciais.');
            }
        }
    };

    const handleRegister = async () => {
        try {
            const response = await api.post('/auth/register', {
                username: registerUsername,
                password: registerPassword,
            });
            toast.success(response.data);
            setShowRegisterModal(false);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(`Erro ao cadastrar: ${error.response?.data || 'Verifique os campos se ambos estão preenchidos'}`);
            } else {
                toast.error('Erro ao cadastrar. Tente novamente.');
            }
        }
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light" style={{ backgroundImage: 'url(./src/assets/bkgLoginImage.jpg)', backgroundSize: 'cover' }}>
            <ToastContainer />
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
                    <Button variant="primary" className="w-100 mb-2" onClick={handleLogin}>
                        Entrar
                    </Button>
                    <Button variant="secondary" className="w-100 mb-2" onClick={() => setShowRegisterModal(true)}>
                        Cadastrar-se
                    </Button>
                </Form>
            </div>

            {/* Modal de Cadastro */}
            <Modal show={showRegisterModal} onHide={() => setShowRegisterModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar Novo Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu usuário"
                                value={registerUsername}
                                onChange={(e) => setRegisterUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Digite sua senha"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRegisterModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleRegister}>
                        Registrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Login;
