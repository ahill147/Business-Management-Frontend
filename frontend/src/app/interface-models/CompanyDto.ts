import TeamDto from "./TeamDto";
import BasicUserDto from "./BasicUserDto";

export default interface CompanyDto {
  id: number;
  name: string;
  description: string;
  teams: TeamDto[];
  employees: BasicUserDto[];
}