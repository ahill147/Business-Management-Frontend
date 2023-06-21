import BasicUserDto from "./BasicUserDto";

export default interface TeamDto {
    id: number;
    name: string;
    description: string;
    teammates: BasicUserDto[]; 
    projects: any[];
}