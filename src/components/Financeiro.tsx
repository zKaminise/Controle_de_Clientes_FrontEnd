import React, { useState, useEffect } from "react";
import { Container, Button, Table, Modal, Form } from "react-bootstrap";
import Header from "./Header";
import api from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';

interface Client {
  nome: string;
  cpf: string;
}

interface Payment {
  id: number;
  valorPago: string;
  diaDoPagamento: string;
  referencia: string;
  metodoPagamentoEnum: string;
}

const Financeiro: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const [showPaymentsModal, setShowPaymentsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const [paymentData, setPaymentData] = useState({
    id: null as number | null,
    valorPago: "",
    diaDoPagamento: "",
    referencia: "",
    metodoPagamentoEnum: "",
  });

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get<Client[]>("/clients/home-info");
        setClients(response.data);
        setFilteredClients(response.data);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      }
    };
    fetchClients();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = clients.filter((client) =>
      client.nome.toLowerCase().includes(value)
    );
    setFilteredClients(filtered);
  };

  const handleShowPayments = async (client: Client) => {
    setSelectedClient(client);
    try {
      const response = await api.get<Payment[]>(
        `/financeiro/${client.cpf}/pagamentos`
      );
      setPayments(response.data);
      setShowPaymentsModal(true);
    } catch (error) {
      console.error("Erro ao carregar pagamentos:", error);
      alert("Erro ao carregar pagamentos do cliente.");
    }
  };

  const handleAddPayment = (client: Client) => {
    setSelectedClient(client);
    setShowPaymentModal(true);
  };

  // const handleGenerateReceipt = (client: Client) => {
  //   setSelectedClient(client);
  //   setShowReceiptModal(true);
  // };

//   const handlePaymentSubmit = async () => {
//     try {
//       await api.post("/financeiro", {
//         cpf: selectedClient?.cpf,
//         ...paymentData,
//       });
//       alert("Pagamento cadastrado com sucesso!");
//       setShowPaymentModal(false);
//       setPaymentData({
//         id: null,
//         valorPago: "",
//         diaDoPagamento: "",
//         referencia: "",
//         metodoPagamentoEnum: "PIX",
//       });
//     } catch (error) {
//       console.error("Erro ao cadastrar pagamento:", error);
//       alert("Erro ao cadastrar pagamento.");
//     }
//   };

  const handleReceiptSubmit = async () => {
    try {
      const response = await api.get(
        `/financeiro/receipt/${selectedClient?.cpf}/${month}/${year}`,
        {
          responseType: "blob",
        }
      );

      const fileURL = URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      toast.success("Recibo gerado com sucesso!");
      window.open(fileURL, "_blank");
      setShowReceiptModal(false);
      setMonth("");
      setYear("");
    } catch (error) {
      console.error("Erro ao gerar recibo:", error);
      alert("Erro ao gerar recibo. Verifique os dados selecionados.");
    }
  };

  const handleGenerateReport = async () => {
    try {
      const response = await api.get("/financeiro/report", {
        params: { startDate, endDate },
        responseType: "blob",
      });

      const fileURL = URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      toast.success("Relatório gerado com sucesso!");
      window.open(fileURL, "_blank");
      setShowReportModal(false);
      setStartDate("");
      setEndDate("");
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      alert("Erro ao gerar relatório. Verifique as datas.");
    }
  };

  const convertDateToISO = (date: string): string => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };
  

  const handleEditPayment = (payment: Payment) => {
    const formattedDate = payment.diaDoPagamento
      ? convertDateToISO(payment.diaDoPagamento)
      : "";
  
    setPaymentData({
      id: payment.id,
      valorPago: payment.valorPago,
      diaDoPagamento: formattedDate,
      referencia: payment.referencia,
      metodoPagamentoEnum: payment.metodoPagamentoEnum,
    });
    setShowPaymentModal(true);
  };  

  const fetchPayments = async () => {
    if (!selectedClient) return;

    try {
      const response = await api.get<Payment[]>(
        `/financeiro/${selectedClient.cpf}/pagamentos`
      );
      setPayments(response.data);
    } catch (error) {
      console.error("Erro ao carregar pagamentos:", error);
      alert("Erro ao carregar pagamentos.");
    }
  };

  const resetForm = () => {
    setPaymentData({
      id: null,
      valorPago: "",
      diaDoPagamento: "",
      referencia: "",
      metodoPagamentoEnum: "PIX",
    });
  };

  const handleSavePayment = async () => {
    try {
      const paymentDataRequest = {
        cpf: selectedClient?.cpf,
        valorPago: paymentData.valorPago,
        diaDoPagamento: paymentData.diaDoPagamento,
        referencia: paymentData.referencia,
        metodoPagamentoEnum: paymentData.metodoPagamentoEnum,
      };
  
      if (paymentData.id) {

        await api.put(`/financeiro/${paymentData.id}`, paymentDataRequest);
        toast.success("Pagamento atualizado com sucesso!");
      } else {
        await api.post("/financeiro", paymentDataRequest);
        toast.success("Pagamento cadastrado com sucesso!");
      }
  
      fetchPayments();
      setShowPaymentModal(false);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar pagamento:", error);
      alert("Erro ao salvar pagamento.");
    }
  };
  

  const handleDeletePayment = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este pagamento?")) {
      try {
        await api.delete(`/financeiro/${id}`);
        toast.success("Pagamento excluído com sucesso!");
        setPayments(payments.filter((payment) => payment.id !== id));
      } catch (error) {
        console.error("Erro ao excluir pagamento:", error);
        alert("Erro ao excluir pagamento.");
      }
    }
  };

  return (
    <>
      <Header currentPage="financeiro" />
      <Container>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <h2>Financeiro</h2>
          <Form.Control
            type="search"
            placeholder="Pesquisar Cliente pelo Nome"
            value={search}
            onChange={handleSearch}
            style={{ width: "300px" }}
          />
        </div>
        <Button
          variant="success"
          className="mt-3"
          onClick={() => setShowReportModal(true)}
        >
          Gerar Relatório
        </Button>
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.cpf}>
                <td
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleShowPayments(client)}
                >
                  {client.nome}
                </td>
                <td>{client.cpf}</td>
                <td>
                  {/* <Button
                    variant="info"
                    className="me-2"
                    onClick={() => handleGenerateReceipt(client)}
                  >
                    Gerar Recibo
                  </Button> */}
                  <Button
                    variant="primary"
                    onClick={() => handleAddPayment(client)}
                  >
                    Cadastrar Pagamento
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal para exibir pagamentos */}
        <Modal
          show={showPaymentsModal}
          onHide={() => setShowPaymentsModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Pagamentos de {selectedClient?.nome}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Valor Pago</th>
                  <th>Data do Pagamento</th>
                  <th>Referência</th>
                  <th>Método de Pagamento</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>R$ {payment.valorPago}</td>
                    <td>{payment.diaDoPagamento}</td>
                    <td>{payment.referencia}</td>
                    <td>{payment.metodoPagamentoEnum}</td>
                    <td>
                      {/* Botão de Editar */}
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => handleEditPayment(payment)}
                      >
                        <FaEdit />
                      </Button>
                      {/* Botão de Deletar */}
                      <Button
                        variant="danger"
                        onClick={() => handleDeletePayment(payment.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowPaymentsModal(false)}
            >
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal para cadastrar pagamento */}
        <Modal
          show={showPaymentModal}
          onHide={() => setShowPaymentModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {paymentData.id
                ? `Editar Pagamento para ${selectedClient?.nome}`
                : `Cadastrar Pagamento para ${selectedClient?.nome}`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Valor Pago</Form.Label>
                <Form.Control
                  type="number"
                  value={paymentData.valorPago}
                  onChange={(e) =>
                    setPaymentData((prev) => ({
                      ...prev,
                      valorPago: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data do Pagamento</Form.Label>
                <Form.Control
                  type="date"
                  value={paymentData.diaDoPagamento}
                  onChange={(e) =>
                    setPaymentData((prev) => ({
                      ...prev,
                      diaDoPagamento: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mês de Referência</Form.Label>
                <Form.Control
                  type="text"
                  value={paymentData.referencia}
                  onChange={(e) =>
                    setPaymentData((prev) => ({
                      ...prev,
                      referencia: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Método de Pagamento</Form.Label>
                <Form.Select
                  value={paymentData.metodoPagamentoEnum}
                  onChange={(e) =>
                    setPaymentData((prev) => ({
                      ...prev,
                      metodoPagamentoEnum: e.target.value,
                    }))
                  }
                >
                  <option value="">Selecione</option>
                  <option value="PIX">PIX</option>
                  <option value="CARTAO">Cartão</option>
                  <option value="DINHEIRO">Dinheiro</option>
                  <option value="BOLETO">Boleto</option>
                  <option value="OUTRO">Outro</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowPaymentModal(false);
                resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSavePayment}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal para gerar recibo */}
        <Modal
          show={showReceiptModal}
          onHide={() => setShowReceiptModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Gerar Recibo para {selectedClient?.nome}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Mês</Form.Label>
                <Form.Select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="">Selecione o mês</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(0, i).toLocaleString("pt-BR", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ano</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Digite o ano"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowReceiptModal(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleReceiptSubmit}>
              Gerar Recibo
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal para gerar relatório */}
        <Modal show={showReportModal} onHide={() => setShowReportModal(false)}>
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
            <Button
              variant="secondary"
              onClick={() => setShowReportModal(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleGenerateReport}>
              Gerar Relatório
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Financeiro;
