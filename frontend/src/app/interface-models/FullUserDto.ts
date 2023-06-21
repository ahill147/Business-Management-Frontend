import CompanyDto from "./CompanyDto";
import ProfileDto from "./ProfileDto";
import TeamDto from "./TeamDto";


export default interface FullUserDto {
    id: number;
    profile: ProfileDto;
    admin: boolean;
    active: boolean;
    status: string;
    companies: CompanyDto[];
    teams: TeamDto[];
}