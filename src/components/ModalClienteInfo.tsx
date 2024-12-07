import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Client } from "../interfaces/Client";

interface ModalClienteInfoProps {
  show: boolean;
  handleClose: () => void;
  client: Client;
  onSave: (updatedClient: Client) => Promise<void>;
}

const ModalClienteInfo: React.FC<ModalClienteInfoProps> = ({
  show,
  handleClose,
  client,
  onSave,
}) => {
  const [updatedClient, setUpdatedClient] = useState<Client>({
    ...client,
  });

  // Inicializa o estado com os dados do cliente e formata a data
  useEffect(() => {
    setUpdatedClient({
      ...client,
      dataNascimento: client.dataNascimento.includes("/")
        ? client.dataNascimento.split("/").reverse().join("-")
        : client.dataNascimento,
    });
  }, [client]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setUpdatedClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(updatedClient);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={updatedClient.nome || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="text"
              name="cpf"
              value={updatedClient.cpf || ""}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={updatedClient.email || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="text"
              name="telefone"
              value={updatedClient.telefone || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              type="text"
              name="endereco"
              value={updatedClient.endereco || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control
              type="date"
              name="dataNascimento"
              value={updatedClient.dataNascimento || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gênero</Form.Label>
            <Form.Select
              name="generoEnum"
              value={updatedClient.generoEnum || ""}
              onChange={handleChange}
            >
              <option value="MASCULINO">Masculino</option>
              <option value="FEMININO">Feminino</option>
              <option value="OUTRO">Outro</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              name="estadosEnum"
              value={updatedClient.estadosEnum || ""}
              onChange={handleChange}
            >
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AM">AM</option>
              <option value="AP">AP</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MG">MG</option>
              <option value="MS">MS</option>
              <option value="MT">MT</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="PR">PR</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="RS">RS</option>
              <option value="SC">SC</option>
              <option value="SE">SE</option>
              <option value="SP">SP</option>
              <option value="TO">TO</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Religião</Form.Label>
            <Form.Control
              type="text"
              name="religiao"
              value={updatedClient.religiao || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Medicamentos</Form.Label>
            <Form.Control
              type="text"
              name="medicamentos"
              value={updatedClient.medicamentos || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Queixa Principal</Form.Label>
            <Form.Control
              as="textarea"
              name="queixaPrincipal"
              value={updatedClient.queixaPrincipal || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Recebeu Alta</Form.Label>
            <Form.Select
              name="recebeuAltaEnum"
              value={updatedClient.recebeuAltaEnum || ""}
              onChange={handleChange}
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

export default ModalClienteInfo;
