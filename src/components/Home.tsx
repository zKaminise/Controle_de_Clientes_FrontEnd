import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Form, Button, Table } from "react-bootstrap";
import api from "../services/api";
import ModalClienteInfo from "./ModalClienteInfo";
import ModalCadastroCliente from "./ModalCadastroCliente";
import { Client } from "../interfaces/Client";
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';

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
      alert("Erro ao carregar informações do cliente.");
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
      alert("Cliente atualizado com sucesso!");

      const updatedClients = clients.map((client) =>
        client.cpf === updatedClient.cpf ? updatedClient : client
      );
      setClients(updatedClients);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      alert("Erro ao atualizar cliente.");
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
      alert("Cliente excluído com sucesso!");
      setClients((prev) => prev.filter((client) => client.cpf !== cpf));
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      alert("Erro ao excluir cliente.");
    }
  };

  const filteredClients = clients.filter((client) =>
    client.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Client Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/financeiro">
                Financeiro
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Pesquisar"
                className="me-2"
                aria-label="Search"
                value={search}
                onChange={handleSearch}
              />
              <Button variant="outline-success">Buscar</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Button
          variant="primary"
          className="mb-4"
          onClick={handleClientCadastro}
        >
          Cadastrar Cliente
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Email</th>
              <th>Data de Nascimento</th>
              <th>Recebeu Alta</th>
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
                <td>{client.recebeuAltaEnum === "SIM" ? "Sim" : "Não"}</td>
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
