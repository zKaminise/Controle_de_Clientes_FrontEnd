export interface Client {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  endereco: string;
  dataNascimento: string;
  generoEnum: "MASCULINO" | "FEMININO" | "OUTRO"; // Enum de gêneros
  estadosEnum: "AC" | "AL" | "AM" | "AP" | "BA" | "CE" | "DF" | "ES" | "GO" | "MA" | "MG" | "MS" | "MT" | "PA" | "PB" | "PE" | "PI" | "PR" | "RJ" | "RN" | "RO" | "RR" | "RS" | "SC" | "SE" | "SP" | "TO"; // Estado (UF)
  religiao: string;
  tratamento: string;
  medicamentos: string;
  frequencia: string;
  queixaPrincipal: string;
  escolaridadeEnum: "ensinoSuperior" | "ensinoMedio";
  dataInicioTratamento: string;
  dataFimTratamento: string;
}
