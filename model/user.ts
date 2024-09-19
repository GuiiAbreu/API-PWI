import technologies from './technologies';

type UserType={
    id:string,
    name:string,
    username:string,
    technologies:technologies[]
}
const user=[] as UserType[];
export  {UserType,user};