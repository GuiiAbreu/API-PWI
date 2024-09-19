import express from 'express';
import userRouters from './routers/userRouters'
import technolgiesRouter from './routers/technologiesRouters';
import { port } from './port';
const app =express();
app.use(express.json())
app.use('/Users',userRouters);
app.use('/Users/technologies',technolgiesRouter)

app.listen(port,()=>{
    console.log(`aplicação rodando na porta ${port}`);
})