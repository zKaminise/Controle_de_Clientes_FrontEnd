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
  const [generoEnum, setGeneroEnum] = useState<
    "MASCULINO" | "FEMININO" | "OUTRO" | ""
  >("");
  const [estadosEnum, setEstadosEnum] = useState<
    | ""
    | "AC"
    | "AL"
    | "AM"
    | "AP"
    | "BA"
    | "CE"
    | "DF"
    | "ES"
    | "GO"
    | "MA"
    | "MG"
    | "MS"
    | "MT"
    | "PA"
    | "PB"
    | "PE"
    | "PI"
    | "PR"
    | "RJ"
    | "RN"
    | "RO"
    | "RR"
    | "RS"
    | "SC"
    | "SE"
    | "SP"
    | "TO"
  >("");
  const [religiao, setReligiao] = useState("");
  const [tratamento, setTratamento] = useState("");
  const [medicamentos, setMedicamentos] = useState("");
  const [queixaPrincipal, setQueixaPrincipal] = useState("");
  const [frequencia, setFrequencia] = useState("");
  const [escolaridadeEnum, setEscolaridadeEnum] = useState<
    "" | "ensinoFundamentalIncompleto" | "ensinoFundamentalCompleto" | "ensinoMedioIncompleto" | "ensinoMedioCompleto" | "ensinoSuperiorIncompleto" | 
    "ensinoSuperiorCompleto" | "posGraduacaoIncompleta" | "posGraduacaoCompleta" | "mestradoIncompleto" | "mestradoCompleto" | "doutoradoIncompleto" | "doutoradoCompleto" |
    "posDoutoradoIncompleto" | "posDoutoradoCompleto"
  >(""); 
  const [dataInicioTratamento, setDataInicioTratamento] = useState("");
  const [dataFimTratamento, setDataFimTratamento] = useState("");

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
        tratamento,
        medicamentos,
        queixaPrincipal,
        frequencia,
        escolaridadeEnum,
        dataInicioTratamento,
        dataFimTratamento,
      };

      await api.post("/clients", payload);
      refreshClients();
      handleClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(
          `Erro ao cadastrar cliente: ${
            error.response?.data?.message || "Erro desconhecido"
          }`
        );
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
              onChange={(e) =>
                setGeneroEnum(
                  e.target.value as "MASCULINO" | "FEMININO" | "OUTRO"
                )
              }
            >
              <option value="">Selecione</option>
              <option value="MASCULINO">Masculino</option>
              <option value="FEMININO">Feminino</option>
              <option value="OUTRO">Outro</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              value={estadosEnum}
              onChange={(e) =>
                setEstadosEnum(e.target.value as typeof estadosEnum)
              }
            >
              <option value="">Selecione</option>
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
              placeholder="Digite a religião"
              value={religiao}
              onChange={(e) => setReligiao(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tratamento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o tratamento"
              value={tratamento}
              onChange={(e) => setTratamento(e.target.value)}
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
            <Form.Group className="mb-3">
              <Form.Label>Frequencia</Form.Label>
              <Form.Control
                type="text"
                placeholder="Informe a Frequencia do Tratamento"
                value={frequencia}
                onChange={(e) => setFrequencia(e.target.value)}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Escolaridade</Form.Label>
            <Form.Select
              value={escolaridadeEnum}
              onChange={(e) =>
                setEscolaridadeEnum(
                  e.target.value as "ensinoFundamentalIncompleto" | "ensinoFundamentalCompleto" | "ensinoMedioIncompleto" | "ensinoMedioCompleto" | "ensinoSuperiorIncompleto" | 
                  "ensinoSuperiorCompleto" | "posGraduacaoIncompleta" | "posGraduacaoCompleta" | "mestradoIncompleto" | "mestradoCompleto" | "doutoradoIncompleto" | "doutoradoCompleto" |
                  "posDoutoradoIncompleto" | "posDoutoradoCompleto"
                )
              }
            >
              <option value="">Selecione</option>
              <option value="ensinoFundamentalIncompleto">Ensino Fundamental Incompleto</option>
              <option value="ensinoFundamentalCompleto">Ensino Fundamental Completo</option>
              <option value="ensinoMedioIncompleto">Ensino Médio Incompleto</option>
              <option value="ensinoMedioCompleto">Ensino Médio Completo</option>
              <option value="ensinoSuperiorIncompleto">Ensino Superior Incompleto</option>
              <option value="ensinoSuperiorCompleto">Ensino Superior Completo</option>
              <option value="posGraduacaoIncompleta">Pós Graduação Incompleta</option>
              <option value="posGraduacaoCompleta">Pós Graduação Completa</option>
              <option value="mestradoIncompleto">Mestrado Incompleto</option>
              <option value="mestradoCompleto">Mestrado Completo</option>
              <option value="doutoradoIncompleto">Doutorado Incompleto</option>
              <option value="doutoradoCompleto">Doutorado Completo</option>
              <option value="posDoutoradoIncompleto">Pós Doutorado Incompleto</option>
              <option value="posDoutoradoCompleto">Pós Doutorado Completo</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data Inicio do Tratamento</Form.Label>
            <Form.Control
              type="date"
              value={dataInicioTratamento}
              onChange={(e) => setDataInicioTratamento(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data Final do Tratamento</Form.Label>
            <Form.Control
              type="date"
              value={dataFimTratamento}
              onChange={(e) => setDataFimTratamento(e.target.value)}
            />
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
