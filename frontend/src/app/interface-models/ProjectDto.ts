import TeamDto from "./TeamDto"

export default interface ProjectDto {
  id: number,
  name: string,
  description: string,
  active: boolean,
  team: TeamDto
}