export interface ICidade{
    id: number;
    nome: string;
}

export interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}

export interface IParamProps {
    id?: number;
}