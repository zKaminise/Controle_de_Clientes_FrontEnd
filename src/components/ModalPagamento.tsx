import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../services/api';
import axios from 'axios';
import { toast } from 'react-toastify';

interface ModalPagamentoProps {
    show: boolean;
    handleClose: () => void;
    clientCpf: string;
}

const ModalPagamento: React.FC<ModalPagamentoProps> = ({ show, handleClose, clientCpf }) => {
    const [valorPago, setValorPago] = useState('');
    const [dataPagamento, setDataPagamento] = useState('');
    const [referencia, setReferencia] = useState('');
    const [metodoPagamento, setMetodoPagamento] = useState('');

    const handleSave = async () => {
        try {
            await api.post('/financeiro', {
                cpf: clientCpf,
                valorPago,
                diaDoPagamento: dataPagamento,
                referencia,
                metodoPagamentoEnum: metodoPagamento,
            });
            toast.success('Pagamento cadastrado com sucesso!');
            handleClose();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(`Erro ao cadastrar pagamento: ${error.response?.data?.message || 'Erro desconhecido'}`);
            } else {
                toast.error('Erro ao cadastrar pagamento.');
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastrar Pagamento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Valor Pago</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o valor pago"
                            value={valorPago}
                            onChange={(e) => setValorPago(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Data do Pagamento</Form.Label>
                        <Form.Control
                            type="date"
                            value={dataPagamento}
                            onChange={(e) => setDataPagamento(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mês de Referência</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a qual/quais meses esse pagamento é referente"
                            value={referencia}
                            onChange={(e) => setReferencia(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Método de Pagamento</Form.Label>
                        <Form.Control
                            as="select"
                            value={metodoPagamento}
                            onChange={(e) => setMetodoPagamento(e.target.value)}
                        >
                            <option value="PIX">PIX</option>
                            <option value="CARTAO">Cartão</option>
                            <option value="DINHEIRO">Dinheiro</option>
                            <option value="BOLETO">Boleto</option>
                            <option value="OUTRO">Outro</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalPagamento;