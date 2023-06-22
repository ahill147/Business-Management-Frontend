import BasicUserDto from "./BasicUserDto";
import ProjectDto from "./ProjectDto";

export default interface TeamDto {
    id: number;
    name: string;
    description: string;
    teammates: BasicUserDto[]; 
    projects: ProjectDto[];
}