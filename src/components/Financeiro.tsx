import React, { useState, useEffect } from 'react';
import { Container, Button, Table, Modal, Form } from 'react-bootstrap';
import api from '../services/api';
import axios from 'axios';

interface Client {
    nome: string;
    cpf: string;
}

const Financeiro: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await api.get<Client[]>('/clients/home-info');
                setClients(response.data);
            } catch (error: unknown) {
                console.error('Erro ao carregar clientes:', error);
            }
        };
        fetchClients();
    }, []);

    const handleGenerateReport = () => {
        setShowModal(true);
    };

    const handleReportSubmit = async () => {
        try {
            await api.get(`/financeiro/report?startDate=${startDate}&endDate=${endDate}`);
            alert('Relatório gerado com sucesso!');
            setShowModal(false);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                alert(`Erro ao gerar relatório: ${error.response?.data?.message || 'Erro desconhecido'}`);
            } else {
                alert('Erro ao gerar relatório.');
            }
        }
    };

    return (
        <Container>
            <h2 className="mt-4">Financeiro</h2>
            <Button className="mb-4" onClick={handleGenerateReport}>Gerar Relatório</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.cpf}>
                            <td>{client.nome}</td>
                            <td>{client.cpf}</td>
                            <td>
                                <Button variant="success" className="me-2">Cadastrar Pagamento</Button>
                                <Button variant="info">Gerar Recibo</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Gerar Relatório</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Data de Início</Form.Label>
                            <Form.Control
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Data de Fim</Form.Label>
                            <Form.Control
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleReportSubmit}>
                        Gerar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Financeiro;
