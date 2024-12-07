import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../services/api";
import axios from "axios";

interface ModalCadastroClienteProps {
    show: boolean;
    handleClose: () => void;
    refreshClients: () => void;
}

const ModalCadastroCliente: React.FC<ModalCadastroClienteProps> = ({
    show,
    handleClose,
    refreshClients,
}) => {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [generoEnum, setGeneroEnum] = useState<"MASCULINO" | "FEMININO" | "OUTRO">("MASCULINO");
    const [estadosEnum, setEstadosEnum] = useState<"AC" | "AL" | "AM" | "AP" | "BA" | "CE" | "DF" | "ES" | "GO" | "MA" | "MG" | "MS" | "MT" | "PA" | "PB" | "PE" | "PI" | "PR" | "RJ" | "RN" | "RO" | "RR" | "RS" | "SC" | "SE" | "SP" | "TO">("MG");
    const [religiao, setReligiao] = useState("");
    const [medicamentos, setMedicamentos] = useState("");
    const [queixaPrincipal, setQueixaPrincipal] = useState("");
    const [recebeuAltaEnum, setRecebeuAltaEnum] = useState<"SIM" | "NAO">("NAO");

    const handleSave = async () => {
        try {
            const payload = {
                nome,
                cpf,
                email,
                telefone,
                endereco,
                dataNascimento,
                generoEnum,
                estadosEnum,
                religiao,
                medicamentos,
                queixaPrincipal,
                recebeuAltaEnum,
            };

            await api.post("/clients", payload);
            refreshClients();
            handleClose();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                alert(`Erro ao cadastrar cliente: ${error.response?.data?.message || "Erro desconhecido"}`);
            } else {
                alert("Erro ao cadastrar cliente.");
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastrar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Digite o email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o endereço"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Data de Nascimento</Form.Label>
                        <Form.Control
                            type="date"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Gênero</Form.Label>
                        <Form.Select
                            value={generoEnum}
                            onChange={(e) => setGeneroEnum(e.target.value as "MASCULINO" | "FEMININO" | "OUTRO")}
                        >
                            <option value="MASCULINO">Masculino</option>
                            <option value="FEMININO">Feminino</option>
                            <option value="OUTRO">Outro</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select
                            value={estadosEnum}
                            onChange={(e) => setEstadosEnum(e.target.value as typeof estadosEnum)}
                        >
                            <option value="MG">MG</option>
                            {/* Adicione os demais estados aqui */}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Religião</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a religião"
                            value={religiao}
                            onChange={(e) => setReligiao(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Medicamentos</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite os medicamentos"
                            value={medicamentos}
                            onChange={(e) => setMedicamentos(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Queixa Principal</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Digite a queixa principal"
                            value={queixaPrincipal}
                            onChange={(e) => setQueixaPrincipal(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Recebeu Alta</Form.Label>
                        <Form.Select
                            value={recebeuAltaEnum}
                            onChange={(e) => setRecebeuAltaEnum(e.target.value as "SIM" | "NAO")}
                        >
                            <option value="SIM">Sim</option>
                            <option value="NAO">Não</option>
                        </Form.Select>
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

export default ModalCadastroCliente;
