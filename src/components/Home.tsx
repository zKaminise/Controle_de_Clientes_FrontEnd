import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Row, Col } from "react-bootstrap";
import Header from "./Header";
import api from "../services/api";
import ModalClienteInfo from "./ModalClienteInfo";
import ModalCadastroCliente from "./ModalCadastroCliente";
import { Client } from "../interfaces/Client";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Home: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCadastroModal, setShowCadastroModal] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get("/clients/home-info");
        setClients(response.data);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      }
    };
    fetchClients();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleRowClick = async (client: Client) => {
    try {
      const response = await api.get<Client>(`/clients/${client.cpf}`);
      setSelectedClient(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao carregar cliente:", error);
      toast.error("Erro ao carregar informações do cliente.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedClient(null);
  };

  const handleCadastroModalClose = () => {
    setShowCadastroModal(false);
  };

  const handleClientSave = async (updatedClient: Client) => {
    try {
      const formattedClient = {
        ...updatedClient,
        dataNascimento: updatedClient.dataNascimento.includes("/")
          ? updatedClient.dataNascimento.split("/").reverse().join("-")
          : updatedClient.dataNascimento,
      };

      await api.put(`/clients/${updatedClient.cpf}`, formattedClient);
      toast.success("Cliente atualizado com sucesso!");

      const updatedClients = clients.map((client) =>
        client.cpf === updatedClient.cpf ? updatedClient : client
      );
      setClients(updatedClients);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      toast.error("Erro ao atualizar cliente.");
    }
    handleModalClose();
  };

  const handleClientCadastro = async () => {
    setShowCadastroModal(true);
  };

  const refreshClients = async () => {
    try {
      const response = await api.get("/clients/home-info");
      setClients(response.data);
    } catch (error) {
      console.error("Erro ao atualizar lista de clientes:", error);
    }
  };

  const handleDelete = async (cpf: string) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este cliente?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/clients/${cpf}`);
      setClients((prev) => prev.filter((client) => client.cpf !== cpf));
      toast.success("Cliente excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      toast.error("Erro ao excluir cliente.");
    }
  };

  const filteredClients = clients.filter((client) =>
    client.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header currentPage="home" />
      <Container className="mt-4">
        <Row className="align-items-center mb-3">
          <Col xs={12} md={6}>
            <Button
              variant="primary"
              onClick={handleClientCadastro}
              className="w-100"
            >
              Cadastrar Cliente
            </Button>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="searchBar">
              <Form.Control
                type="text"
                placeholder="Pesquisar Cliente pelo Nome"
                value={search}
                onChange={handleSearch}
                className="w-100"
              />
            </Form.Group>
          </Col>
        </Row>
        <Table responsive striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Email</th>
              <th>Data de Nascimento</th>
              <th>Data de Inicio do Tratamento</th>
              <th>Data de Fim do Tratamento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.cpf}>
                <td
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRowClick(client)}
                >
                  {client.nome}
                </td>
                <td>{client.cpf}</td>
                <td>{client.email}</td>
                <td>{client.dataNascimento}</td>
                <td>{client.dataInicioTratamento}</td>
                <td>{client.dataFimTratamento}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(client.cpf)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {selectedClient && (
        <ModalClienteInfo
          show={showModal}
          handleClose={handleModalClose}
          client={selectedClient}
          onSave={handleClientSave}
        />
      )}

      {showCadastroModal && (
        <ModalCadastroCliente
          show={showCadastroModal}
          handleClose={handleCadastroModalClose}
          refreshClients={refreshClients}
        />
      )}
    </>
  );
};

export default Home;
